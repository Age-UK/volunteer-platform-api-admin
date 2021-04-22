/** @class Repository for User actions */
'use strict';
import jwt from "jsonwebtoken";
var moment = require('moment');
import { UserExists } from '../interfaces/types/iUserExists';
import { PlatformUser } from '../interfaces/types/iPlatformUser';
import { PasswordResetResponse } from '../interfaces/types/iPasswordResetResponse';
import { ResetPasswordRequest } from '../interfaces/extended/iResetPasswordRequest';
import { DecodedToken } from '../interfaces/types/iDecodedToken';
import { TokenResponse } from '../interfaces/types/iTokenResponse';
import { UpdatePasswordResponse } from '../interfaces/types/iUpdatePasswordResponse';
import { NewUserResponse } from '../interfaces/types/iNewUserResponse';
import { NewUser } from '../interfaces/types/iNewUser';
import { UserUtil } from '../modules/user-util';
var ForbiddenError = require('../../exceptions/ForbiddenError'),
    ValidationError = require('../../exceptions/ValidationError')

export class UserRepository {
    entities: any;
    userUtil: UserUtil;
    events: any;

    constructor(entities: any, events:any) {
        this.entities = entities;
        this.userUtil = new UserUtil();
        this.events = events;
    }

    /**
     * Checks whether a user exists based on their email address
     * @param {string} email - email address to check agains the DB
     * @return {object} returns boolean indicating if a user exists, the user type volunteer/staff and unique id of the user
     */
    userExists = async (email: string): Promise<UserExists> => {
        var userExists: UserExists = { exists: false };
        let user = await this.entities.user.table.findOne({ where: { email: email } });

        if (user) {
            let staff = await this.entities.staff.table.findOne({ where: { userId: user.id } });

            if (staff) {
                userExists = ({ exists: true, userType: 'staff', id: user.id });
            } else {
                let volunteer = await this.entities.volunteer.table.findOne({ where: { userId: user.id } });

                if (volunteer) {
                    userExists = ({ exists: true, userType: 'volunteer', id: user.id });
                }
            }
        }
        return userExists;
    }

    /**
     * If a user with a speicfied email address exists - return a PlatformUser object
     * @param {string} email - email address to check agains the DB
     * @return {object} returns PlatformUser
     */
    getUserByEmail = async (email: string): Promise<PlatformUser> => {
        var pUser: PlatformUser;
        let user = await this.entities.user.table.findOne({ where: { email: email } });
        if (user) {
            let divisions = await this.entities.division.table.findAll();
            let staff = await this.entities.staff.table.findOne({ where: { userId: user.id } })

            if (staff) {
                pUser = this.userUtil.convertStaffToPlatformUser(staff, user, divisions);
            } else {
                let volunteer = await this.entities.volunteer.table.findOne({ where: { userId: user.id } })

                if (volunteer) {
                    pUser = this.userUtil.convertVolunteerToPlatformUser(volunteer, user);
                }
            }
            return pUser;
        }

        return null;
    };

    /**
     * If a user with a speicfied ID exists - return a PlatformUser object
     * @param {string} id - unique identifer of a known user
     * @return {object} returns PlatformUser
     */
    getUserById = async (id: string): Promise<PlatformUser> => {
        var pUser: PlatformUser;
        let user = await this.entities.user.table.findOne({ where: { id: id } });
        if (user) {
            let divisions = await this.entities.division.table.findAll();
            let staff = await this.entities.staff.table.findOne({
                    where: { userId: user.id }, include: [{ model: this.entities.staffDivision.table, as: 'divisions' }] });

            if (staff) {
                pUser = this.userUtil.convertStaffToPlatformUser(staff, user, divisions);
            } else {
                let volunteer = await this.entities.volunteer.table.findOne({ where: { userId: user.id }, include: [{ model: this.entities.volunteerDivisionInterest.table, as: 'interests' }] });

                if (volunteer) {
                    pUser = this.userUtil.convertVolunteerToPlatformUser(volunteer, user);
                }
            }
            return pUser;
        }

        return null;
    };

    /**
     * Initiates password reset request process - triggers email via SNS
     * @param {object} req - expressJS request object
     * @return {object} returns status code and success boolean
     */
    requestResetPassword = async (req: any): Promise<PasswordResetResponse> => {
        var passwordResetResponse:PasswordResetResponse = { success: false, statusCode: 200 };
        var rPq:ResetPasswordRequest;
        const { body: { user } } = req;

        var errors = [];

        if (!user) {
            passwordResetResponse = ({ success: false, statusCode: 422, errors: [{ user: 'is required' }] });
        }

        if (!user.email) {
            errors.push({ 'email': 'required' });
        } else {
            if (user.email.length < 2) {
                errors.push({ 'email': 'invalid' });
            }
        }

        if (errors.length > 0) {
            passwordResetResponse = ({ success: false, statusCode: 422, errors: errors });
        }

        var now = new Date();
        var expires = moment(now).add(1, 'h');

        rPq = { expiresAt: expires, email: user.email };

        let result = await this.userExists(user.email);

        if (result && result.id) {
            console.log('user exists');
            if (result.exists == true) {
                rPq.userId = result.id;

                let rpass = await this.entities.resetPasswordRequest.table.create(rPq);
                let mergeVars = [
                    {
                        name: 'RP_ID',
                        content: rpass.id
                    }
                ];
                let em = await this.events.publishSnsEvent('Send Password Reset', user.email, mergeVars);

                passwordResetResponse = ({ success: true, statusCode: 200 });
                
            }
        }
        return passwordResetResponse;
    };

    /**
     * Resets a users password following a successful password success request
     * @param {object} req - expressJS request object
     * @return {object} returns status code and success boolean
     */
    resetPassword = async (req: any): Promise<PasswordResetResponse> => {
        var passwordResetResponse: PasswordResetResponse = { success: false, statusCode: 200 };
        const { body: { resetPasswordRequest } } = req;

        var errors = [];

        if (!resetPasswordRequest) {
            throw new ValidationError({ resetPasswordRequest: 'is required' });
        }

        if (!resetPasswordRequest.id) {
            errors.push({ 'id': 'required' });
        }

        if (!resetPasswordRequest.password) {
            errors.push({ 'password': 'required' });
        } else {
            if (resetPasswordRequest.password.length < 2) {
                errors.push({ 'password': 'invalid' });
            }
        }

        if (errors.length > 0) {
            throw new ValidationError(errors);
        }

        var now = new Date();
        
        let dbRpr = await this.entities.resetPasswordRequest.table.findByPk(resetPasswordRequest.id);
        if (!dbRpr) {
            throw new ForbiddenError();
        }

        if (!dbRpr.expiresAt || dbRpr.expiresAt < now) {
            throw new ForbiddenError('Password reset token expired');
        }

        let existinguser = await this.entities.user.table.findOne({ where: { id: dbRpr.userId } })

        if (!existinguser) {
            throw new ForbiddenError();
        }

        let saltHash = this.userUtil.getSaltHash(resetPasswordRequest.password);

        let uResult = await this.entities.user.table.update({
            salt: saltHash.salt,
            hash: saltHash.hash
        }, {
            where: {
                id: existinguser.id
            }
        });

        if (uResult) {
            await this.entities.resetPasswordRequest.table.destroy({ where: { id: dbRpr.id } });
            passwordResetResponse = ({ success: true, statusCode: 200 });
        }

        return passwordResetResponse;
    }

    /**
     * Verifies a supplied JWT token is valid
     * @param {object} token - encoded token
     */
    verifyJWTToken = async (token: any): Promise<DecodedToken> => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.jwtSecret, (err, decodedToken:DecodedToken) => {
                if (err || !decodedToken) {
                    return reject(err);
                }

                resolve(decodedToken);
            });
        });
    }

    /**
     * Gets the current user based on a supplied token
     * @param {object} req - expressJS request object
     * @return {object} returns TokenResponse decoded token describing the current user
     */
    getCurrentUser = async (req: any): Promise<TokenResponse> => {
        let tokenResponse = { success: false, token: null };
        const { headers: { authorization } } = req;
        var token = null;

        if (authorization && authorization.split(' ')[0] === 'Token') {
            token = authorization.split(' ')[1];
        }

        let decodedUserToken = await this.verifyJWTToken(token);

        if (decodedUserToken) {
            tokenResponse.token = decodedUserToken;
        }

        return tokenResponse;
    }

    updatePassword = async (req: any, password: string): Promise<UpdatePasswordResponse> => {
        let updatePasswordResponse = { success: false, statusCode: 401, error: 'Unauthorized' };

        if (!password) {
            return ({ statusCode: 422, errors: { password: 'is required' }, success: false });
        }

        let currentUser = await this.getCurrentUser(req);
        if (currentUser && currentUser.token) {
            let saltHash = this.userUtil.getSaltHash(password);
            let existinguser = await this.entities.user.table.findOne({ where: { id: currentUser.token.id } });

            if (existinguser) {
                await this.entities.user.table.update({ salt: saltHash.salt, hash: saltHash.hash }, { where: { id: currentUser.token.id } });
                updatePasswordResponse = { success: true, statusCode: 200, error: null };
            }
        }

        return updatePasswordResponse;
    }

    /**
     * Creates a user
     * @param {object} req - expressJS request object
     * @return {object} returns NewUserResponse that includes new user id
     */
    createUser = async (req: any): Promise<NewUserResponse> => {
        let user: NewUser = { isActive: true, email: req.body.email };

        let password = process.env.systemUserPassword ? process.env.systemUserPassword : 'volunteer77!';

        let saltHash = this.userUtil.getSaltHash(password);
        console.log(JSON.stringify(saltHash));

        user.salt = saltHash.salt;
        user.hash = saltHash.hash;

        let su = await this.entities.user.table.findOne({ where: { email: user.email } });

        if (!su) {
            let usr = await this.entities.user.table.create(user);
            if (usr) {
                let staff = await this.entities.staff.table.create({
                    forenames: req.body.forename,
                    surname: req.body.surname,
                    email: user.email,
                    role: req.body.role,
                    userId: usr.id
                });

                if (req.body.role == 'DivisionManager' && req.body.division) {
                    await this.entities.staffDivision.table.create({
                        staffId: staff.id,
                        divisionId: req.body.division
                    });
                }

                if (staff) {
                    return ({ statusCode: 200, id: usr.id });
                }
            }

        }

        return ({ id: '0', statusCode: 409, error: 'User already exists ' });
    }
}

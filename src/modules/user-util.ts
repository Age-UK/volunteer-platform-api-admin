/** @class Utlility class for user and authentication */
'use strict';
import crypto from "crypto";
import jwt from "jsonwebtoken";
import moment from "moment";
import { DecodedToken } from "../interfaces/types/iDecodedToken";
import { PlatformUser } from '../interfaces/types/iPlatformUser';

export class UserUtil {

    /**
     * Return a salt hash based on sha512
     * @param {string} password - initial plain text password for hashing.
     * @return {object} returns salt buffer and hashed password
     */
    getSaltHash(password:string) {
        let salt = crypto.randomBytes(16).toString('hex');
        let saltBuffer = new Buffer(salt, 'binary');
        return {
            salt: saltBuffer,
            hash: crypto.pbkdf2Sync(password, saltBuffer, 10000, 512, 'sha512').toString('hex')
        };
    };

    /**
     * Validates the password supplied by the against an existing salt/hash
     * @param {string} password - initial plain text password for hashing.
     * @return {object} returns salt buffer and hashed password
     */
    validatePassword(userSalt: string, userHash: string, password: string) {
        let saltBuffer = new Buffer(userSalt, 'binary');
        console.log(saltBuffer);
        const hash = crypto.pbkdf2Sync(password, saltBuffer, 10000, 512, 'sha512').toString('hex');
        console.log(hash);
        return userHash === hash;
    };

    /**
     * Generates a JWT token to authenticate API requests following successful login
     * @param {string} userId - unique identifier for the user
     * @param {string} userEmail - users email address
     * @param {string} targetRole - users role i.e. Master Admin, Division Manger etc
     * @param {string} fnames - forename(s)
     * @param {string} sname - surname
     * @return {string} signed JWT token
     */
    generateJWT(userId: string, userEmail: string, targetRole: string, fnames: string, sname: string) {
        var now = new Date();
        let expiryHours = parseInt(process.env.tokenExpiryHours);

        if (!expiryHours) {
            expiryHours = 3;
        }

        var expiresAt = moment(now).add(expiryHours, 'h').unix();

        let jwtToken:DecodedToken = {
            email: userEmail,
            id: userId,
            exp: expiresAt,
            role: targetRole,
            forenames: fnames,
            surname: sname
        };

        return jwt.sign(jwtToken, process.env.jwtSecret);
    };

    toAuthJSON(userId, userEmail, targetRole, fnames, sname) {
        return {
            _id: userId,
            email: userEmail,
            token: this.generateJWT(userId, userEmail, targetRole, fnames, sname),
            forenames: fnames,
            surname: sname,
            role: targetRole
        };
    };

    /**
     * Creates a PlatformUser object based on a staff user
     * @param {object} staff - staff database record
     * @param {object} user - user database record
     * @param {object} divisions - array of divisions that the staff user is assigned to
     * @return {string} PlatformUser object
     */
    convertStaffToPlatformUser(staff: any, user: any, divisions:any): PlatformUser {
        var pUser:PlatformUser;
        pUser = {
            userId: user.id,
            email: user.email,
            isActive: user.isActive,
            userType: 'staff',
            role: staff.role,
            forenames: staff.forenames,
            surname: staff.surname
        }
        var staffDivisions = [];

        if (staff.role == 'Master Admin') {
            divisions.map(function (div) {
                staffDivisions.push(div.id);
            });
        } else {
            if (staff.divisions) {
                staff.divisions.map(function (div) {
                    staffDivisions.push(div.divisionId);
                });
            }
        }

        pUser.divisions = staffDivisions;
        return pUser;
    };

    /**
     * Creates a PlatformUser object based on a volunteer user
     * @param {object} volunteer - volunteer database record (including divisions)
     * @param {object} user - user database record
     * @return {string} PlatformUser object
     */
    convertVolunteerToPlatformUser(volunteer: any, user: any): PlatformUser {
        var pUser: PlatformUser;
        pUser = {
            userId: user.id,
            email: user.email,
            isActive: user.isActive,
            userType: 'volunteer',
            role: 'volunteer',
            forenames: volunteer.forenames,
            surname: volunteer.surname
        }

        var divisions = [];

        if (volunteer.interests) {
            volunteer.interests.map(function (div) {
                divisions.push(div.divisionId);
            });
        }
        pUser.divisions = divisions;
        return pUser;
    }
}
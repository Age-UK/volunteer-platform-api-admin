/** @class Authentication helper class */
import jwt from "jsonwebtoken";
import { DecodedToken } from './interfaces/types/iDecodedToken';

export default class Auth {

    private getTokenFromHeaders = (req) => {
        const { headers: { authorization } } = req;

        if (authorization && authorization.split(' ')[0] === 'Token') {
            return authorization.split(' ')[1];
        }
        return null;
    };

    private verifyJWTToken = async (token: any): Promise<DecodedToken> => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, process.env.jwtSecret, (err, decodedToken: DecodedToken) => {
                if (err || !decodedToken) {
                    return reject(err);
                }

                resolve(decodedToken);
            });
        });
    }

    /**
     * Verifies that the supplied token is valid - if true the user can progress
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     * @param {object} next - expressJS next object
     */
    verifyJWT = async (req, res, next) => {
        let token = this.getTokenFromHeaders(req);
        return this.verifyJWTToken(token)
            .then((decodedToken: DecodedToken) => {
                req.user = decodedToken;
                next();
            })
            .catch((err) => {
                res.status(401)
                    .json({ message: 'Invalid auth token provided.', error: err });
            });
    };

    /**
     * Verifies that the supplied token is valid - and that the token corresponds with the user id passed in the request body
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     * @param {object} next - expressJS next object
     */
    verifyJWTIsCurrentUser = async (req, res, next) => {
        let paramId = '0';

        if (req.params.id) {
            paramId = req.params.id;
        }

        let token = this.getTokenFromHeaders(req);

        try {
            let decodedToken: DecodedToken = await this.verifyJWTToken(token);

            if (decodedToken) {
                req.user = decodedToken;

                if (decodedToken.id == paramId) {
                    next();
                } else {
                    res.status(403)
                        .json({ message: 'Unauthorized' });
                }
            }
        } catch (err) {
            res.status(401)
                .json({ message: 'Invalid auth token provided.', error: err });
        }
    };

    /**
     * Verifies that the supplied token is valid - and that the user is a volunteer user
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     * @param {object} next - expressJS next object
     */
    verifyJWTIsVolunteerUser = async (req, res, next) => {
        let token = this.getTokenFromHeaders(req);

        try {
            let decodedToken: DecodedToken = await this.verifyJWTToken(token);

            if (decodedToken) {
                req.user = decodedToken;

                if (req.user.role == 'volunteer') {
                    next();
                } else {
                    res.status(403)
                        .json({ message: 'Invalid role for access.', error: 'Forbidden' });
                }
            }

        } catch (err) {
            res.status(401)
                .json({ message: 'Invalid auth token provided.', error: err });
        }
    };

    /**
     * Verifies that the supplied token is valid - and that the user is a staff user
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     * @param {object} next - expressJS next object
     */
    verifyJWTIsStaff = async (req, res, next) => {
        let token = this.getTokenFromHeaders(req);

        try {
            let decodedToken: DecodedToken = await this.verifyJWTToken(token);

            if (decodedToken) {
                req.user = decodedToken;

                if (req.user.role !== 'volunteer') {
                    next();
                } else {
                    res.status(403)
                        .json({ message: 'Invalid role for access.', error: 'Unauthorized' });
                }
            }

        } catch (err) {
            res.status(401)
                .json({ message: 'Invalid auth token provided.', error: err });
        }
    };

    /**
     * Verifies that the supplied token is valid - and that the user is a master admin user
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     * @param {object} next - expressJS next object
     */
    verifyJWTIsMasterAdmin = async (req, res, next) => {
        let token = this.getTokenFromHeaders(req);

        try {
            let decodedToken: DecodedToken = await this.verifyJWTToken(token);

            if (decodedToken) {
                req.user = decodedToken;

                if (req.user.role == 'Master Admin') {
                    next();
                } else {
                    res.status(403)
                        .json({ message: 'Invalid role for access.', error: 'Unauthorized' });
                }
            }

        } catch (err) {
            res.status(401)
                .json({ message: 'Invalid auth token provided.', error: err });
        }
    };

    getActiveUser = async (req, res): Promise<DecodedToken> => {
        let token = this.getTokenFromHeaders(req);

        try {
            let decodedToken: DecodedToken = await this.verifyJWTToken(token);

            if (decodedToken) {
                req.user = decodedToken;

                return Promise.resolve(decodedToken);
            }

        } catch (err) {
            return res.status(401)
                .json({ message: 'Invalid auth token provided.', error: err });
        }
    };
}
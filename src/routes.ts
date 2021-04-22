// src/routes.ts
import * as Express from "express";
const router = Express.Router();
import { UserUtil } from "./modules/user-util";
import { UserRepository } from "./repositories/user";
import { VolunteerRepository } from "./repositories/volunteer";
import Auth from "./auth"
import passport from "passport"
import { DecodedToken } from "./interfaces/types/iDecodedToken";

export default function Routes(entities, sequelize, events) {

    var userUtil = new UserUtil();
    var userRepository = new UserRepository(entities, events);
    var volunteerRepository = new VolunteerRepository(entities, events, sequelize);
    var auth = new Auth();

    /**
     * Lambda root/default event handler
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.get('/', function (req:any, res:any) {
        console.log('root event handler');
        if (req.apiGateway && req.apiGateway.event) {
            if (req.apiGateway.event.Records) {
                console.log('req.apiGateway.event.Records ' + JSON.stringify(req.apiGateway.event.Records));
            }
        }
        if (req.apiGateway) {
            if (req.apiGateway.event.Records == undefined) {
                return res.send('VOLPLAT');
            } else {
                return events.handleEvent(req.apiGateway.event).then(() => {
                    return res.status(200).send('Event handled');
                });
            }
        }

        return res.send('root');
    });

    /**
     * Returns an array of all divisions
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.get("/divisions", async (req, res) => {
        var divisions = await entities.division.table.findAll();
        res.json(divisions);
    });

    /**
     * Returns an array of all active divisions
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.get("/activeDivisions", auth.verifyJWT, async (req, res) => {
        var divisions = await entities.division.table.findAll({
            where: {
                isInactive: false
            }
        });
        res.json(divisions);
    });
    
    /**
     * Returns an array of volunteers based on search term, filters and permissions - used for volunteer index
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.post("/volunteers/search", auth.verifyJWTIsStaff, async (req, res) => {
        var activeUser: DecodedToken = await auth.getActiveUser(req, res);
        var limitStart:number = 0;
        var sPage;
        var iPage;
        var sSearchTerm = '';
        var divisionFilter: string[] = [];
        var statusFilter: string[] = [];

        if (activeUser.id) {
            var PlatformUser = await userRepository.getUserById(activeUser.id);

            if (PlatformUser) {

                if (req.body.page) {
                    sPage = req.body.page;
                    iPage = parseInt(sPage);
                    limitStart = (iPage * 10) - 10;
                }

                if (req.body.searchTerm) {
                    if (req.body.searchTerm.length >= 2) {
                        sSearchTerm = req.body.searchTerm.toString().trim();
                    }
                }

                if (PlatformUser.role == 'Master Admin') {
                    if (req.body.divisions) {
                        divisionFilter = req.body.divisions;
                    }
                }
                
                if (req.body.statuses) {
                    statusFilter = req.body.statuses;
                }

                var volunteers = await volunteerRepository.getAuthorizedVolunteers(PlatformUser, 10, limitStart, sSearchTerm, divisionFilter, statusFilter, sequelize);
                return res.json(volunteers);
            }
        }

        return res.status(401).json({ error: 'Unauthorized' });
    });

    /**
     * Returns an aggregate count of volunteers based on search term, filters and permissions - used for volunteer index
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.post("/volunteers/search/total", auth.verifyJWTIsStaff, async (req, res) => {
        var activeUser: DecodedToken = await auth.getActiveUser(req, res);
        var sSearchTerm = '';
        var divisionFilter: string[] = [];
        var statusFilter: string[] = [];

        if (activeUser.id) {
            var PlatformUser = await userRepository.getUserById(activeUser.id);

            if (PlatformUser) {

                if (req.body.searchTerm) {
                    if (req.body.searchTerm.length >= 2) {
                        sSearchTerm = req.body.searchTerm.toString().trim();
                    }
                }

                if (PlatformUser.role == 'Master Admin') {
                    if (req.body.divisions) {
                        divisionFilter = req.body.divisions;
                    }
                }

                if (req.body.statuses) {
                    statusFilter = req.body.statuses;
                }

                var volunteers = await volunteerRepository.getAuthorizedVolunteersTotal(PlatformUser, sSearchTerm, divisionFilter, statusFilter, sequelize);
                return res.json(volunteers);
            }
        }

        return res.status(401).json({ error: 'Unauthorized' });
    });

    /**
     * Returns all data held on a single volunteer - used for volunteer profile
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.get("/volunteers/:id", auth.verifyJWT, async (req, res) => {
        var activeUser: DecodedToken = await auth.getActiveUser(req, res);

        if (activeUser.id) {
            var PlatformUser = await userRepository.getUserById(activeUser.id);

            if (PlatformUser) {
                if (await volunteerRepository.userCanViewVolunteer(PlatformUser, req.params.id) == true) {
                    let volunteer = await volunteerRepository.getVolunteerById(req.params.id);
                    if (volunteer) {
                        return res.json(volunteer);
                    }
                }
                return res.status(403).json({ error: 'Unauthorized' });
            }
        }

        return res.status(401).json({ error: 'Unauthorized' });
    });

    /**
     * Creates a user - password is based on env var
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.get('/createUser', auth.verifyJWTIsMasterAdmin, async (req, res, next) => {
        let result = await userRepository.createUser(req);

        if (result) {
            return res.status(result.statusCode).json(result);
        }
    });

    /**
     * Login route
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.post('/login', (req, res, next) => {
        const { body: { user } } = req;

        if (!user.email) {
            return res.status(422).json({
                errors: {
                    email: 'is required',
                },
            });
        }

        if (!user.password) {
            return res.status(422).json({
                errors: {
                    password: 'is required',
                },
            });
        }

        return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
            if (err) {
                return next(err);
            }

            if (passportUser) {

                const user = passportUser;
                user.token = userUtil.generateJWT(passportUser.id, passportUser.email, passportUser.role, passportUser.forenames, passportUser.surname);

                let userResponse = userUtil.toAuthJSON(passportUser.id, passportUser.email, passportUser.role, passportUser.forenames, passportUser.surname);

                return res.status(200).json({ user: userResponse });

            } else {
                if (info) {
                    console.log(JSON.stringify(info));

                    if (info.error) {
                        if (info.error == 'UserInvalid') {
                            return res.status(401).json({ error: 'Unauthorized' });
                        }

                        if (info.error == 'PasswordInvalid') {
                            return res.status(401).json({ error: 'Unauthorized' });
                        }
                    }
                }
            }
            return res.status(401).json({ error: 'Unauthorized' });
        })(req, res, next);
    });

    router.post('/updatePassword/:id', auth.verifyJWTIsCurrentUser, (req, res, next) => {
        console.log('app.post(/updatePassword/: id');
        return userRepository.updatePassword(req, req.body.password).then(user => {
            console.log('updated password');
            return res.status(200).json(user);
        }).catch(next);
    });

    /**
     * Initiates request to reset password
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.post('/resetPasswordRequest', async (req, res, next) => {
        let result = await userRepository.requestResetPassword(req);
        if (result) {
            return res.json(result);
        }
    });

    /**
     * Resets a users password (following successful reset password request)
     * @param {object} req - expressJS request object
     * @param {object} res - expressJS response object
     */
    router.post('/resetPassword', async (req, res, next) => {
        try {
            let result = await userRepository.resetPassword(req);

            if (result) {
                return res.status(200).json({ 'message': 'Password reset' });
            }
        } catch (error) {
            console.log(error);
            return res.status(401).json({ error: 'Unauthorized' });
        }
    });

    return router;
}



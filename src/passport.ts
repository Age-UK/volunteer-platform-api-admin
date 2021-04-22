/** @class PassportJS local strategy */
const passport = require('passport');
const Op = require('sequelize').Op;
const LocalStrategy = require('passport-local');
import { UserUtil } from "./modules/user-util";

export default function Passport(entities, sequelize) {

    let userUtil = new UserUtil();

    passport.use(new LocalStrategy({
        usernameField: 'user[email]',
        passwordField: 'user[password]',
    }, (email, password, done) => {
        return entities.user.table.findOne({
            where: {
                email: email,
                isActive: {
                    [Op.ne]: false
                }
            }
        }).then(user => {
            console.log('passport auth');
            if (!user) {
                console.log('no user');
                return done(null, false, { error: 'UserInvalid' });
            }

            if (!userUtil.validatePassword(user.salt, user.hash, password)) {
                console.log('not valid password');
                return done(null, false, { error: 'PasswordInvalid' });
            }

            return entities.volunteer.table.findOne({
                where: {
                    userId: user.id
                }
            }).then(vuser => {

                if (!vuser) {
                    return entities.staff.table.findOne({
                        where: {
                            userId: user.id
                        }
                    }).then(suser => {

                        if (!suser) {
                            return done(null, false, { error: 'UserInvalid' });
                        }

                        user.role = suser.role;
                        
                        console.log('return done');
                        return done(null, user);
                    });
                }

                user.role = 'volunteer';
                user.divisionId = 0;
                console.log('return done');
                return done(null, user);
            });
        }).catch(done);
    }));
}

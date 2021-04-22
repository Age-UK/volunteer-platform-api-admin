/** @class Class/function that initialises and exports sequelize objects enabling DB read/writes application-wide. */
'use strict';
var Division = require('../entities/division'),
    Service = require('../entities/service'),
    ServiceApplication = require('../entities/serviceApplication'),
    ServiceProvider = require('../entities/serviceProvider'),
    Staff = require('../entities/staff'),
    User = require('../entities/user'),
    Volunteer = require('../entities/volunteer'),
    VolunteerDivisionInterest = require('../entities/volunteerDivisionInterest'),
    StaffDivision = require('../entities/staffDivision'),
    ResetPasswordRequest = require('../entities/resetPasswordRequest')

module.exports = (sequelize) => {
    
    var user = new User(sequelize);
    var staffDivision = new StaffDivision(sequelize);
    var staff = new Staff(sequelize, staffDivision);
    var serviceApplication = new ServiceApplication(sequelize);
    var service = new Service(sequelize, staff);
    var serviceProvider = new ServiceProvider(sequelize, service, staff);
    var volunteerDivisionInterest = new VolunteerDivisionInterest(sequelize);
    var volunteer = new Volunteer(sequelize, serviceApplication, volunteerDivisionInterest);
    var division = new Division(sequelize, serviceProvider, staff, volunteer);
    var resetPasswordRequest = new ResetPasswordRequest(sequelize);

    serviceProvider.belongsTo(division.table, 'division');
    service.belongsTo(serviceProvider.table, 'serviceProvider');
    serviceApplication.belongsTo(volunteer.table, 'volunteer');
    serviceApplication.belongsTo(service.table, 'service');
    staff.belongsTo(user.table, 'user');
    volunteer.belongsTo(user.table, 'user');

    return {
        user: user,
        staff: staff,
        staffDivision: staffDivision,
        serviceApplication: serviceApplication,
        service: service,
        serviceProvider: serviceProvider,
        volunteer: volunteer,
        division: division,
        resetPasswordRequest: resetPasswordRequest,
        volunteerDivisionInterest: volunteerDivisionInterest
    }
};

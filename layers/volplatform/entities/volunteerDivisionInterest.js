/** @class Sequelize class/function representing a VolunteerDivisionInterest object. */
'use strict';
var Joi = require('joi'),
    Sequelize = require('sequelize');

/**
* Represents a VolunteerDivisionInterest (link table)
* @constructor
* @param {object} sequelize - sequelize object.
* @return {object} The sequelize object used to read/write ServiceProvider data.
*/
function VolunteerDivisionInterest(sequelize) {
    this.name = 'VolunteerDivisionInterest';

    this.table = sequelize.define(
        'volunteerDivisionInterest',
        {
            volunteerId: {
                type: Sequelize.CHAR(36),
                allowNull: false,
                primaryKey: true
            },
            divisionId: {
                type: Sequelize.CHAR(36),
                allowNull: false,
                primaryKey: true
            }
        },
        {
            freezeTableName: true
        }
    );


    //Validate incoming data with Joi
    this.schema = Joi.object().keys({
        volunteerId: Joi.string().length(36).required(),
        divisionId: Joi.string().length(36).required()
    });

    //Establish relationships
    this.hasMany = {

    };

    this.hasOne = {};

    this.belongsTo = function (entity, as) {
        this.table.belongsTo(entity);

        this.hasOne[as] = entity;
    };

    this.filters = [
    ];

    this.publicProperties = [
    ];
}

module.exports = VolunteerDivisionInterest;
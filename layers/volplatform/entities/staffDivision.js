/** @class Sequelize class/function representing a StaffDivision object. */
'use strict';
var Joi = require('joi'),
    Sequelize = require('sequelize');

/**
* Represents a StaffDivision (link table)
* @constructor
* @param {object} sequelize - sequelize object.
* @return {object} The sequelize object used to read/write StaffDivision data.
*/
function StaffDivision(sequelize) {
    this.name = 'StaffDivision';

    this.table = sequelize.define(
        'staffDivision',
        {
            staffId: {
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
        staffId: Joi.string().length(36).required(),
        divisionId: Joi.string().length(36).required()
    });

    //Establish relationships
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

module.exports = StaffDivision;
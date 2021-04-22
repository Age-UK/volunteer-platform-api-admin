/** @class Sequelize class/function representing a Staff object. */
'use strict';

var Joi = require('joi'),
	Sequelize = require('sequelize');

/**
* Represents a Staff.
* @constructor
* @param {object} sequelize - sequelize object.
* @param {object} StaffDivision - StaffDivision object used to establish relationship between StaffDivision and Staff.
* @return {object} The sequelize object used to read/write Staff data.
*/
function Staff(sequelize, StaffDivision) {
	this.name = 'Staff';

	this.Roles = [
		'Master Admin','DivisionManager', 'ServiceProviderManager', 'ServiceManager'
	];

	this.table = sequelize.define(
		'staff',
		{
			id: {
				type: Sequelize.CHAR(36),
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			forenames: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			surname: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			role: {
				type: Sequelize.ENUM(this.Roles),
				defaultValue: 'ServiceManager',
				allowNull: false
			}
		},
		{
			freezeTableName: true,
			tableName: 'staff'
		}
	);

	//Validate incoming data with Joi
	this.schema = Joi.object().keys({
		forenames: Joi.string().min(1).max(100).required(),
		surname: Joi.string().min(1).max(100).required(),
		email: Joi.string().email().max(255).required(),
		role: Joi.string().required()
	});

	//Establish relationships
	this.hasMany = {
		divisions: StaffDivision.table
	};

	this.table.hasMany(StaffDivision.table, {
		as: 'divisions',
		foreignKey: 'staffId',
	});

	this.hasOne = {};

	this.belongsTo = function (entity, as) {
		this.table.belongsTo(entity);

		this.hasOne[as] = entity;
	};

	this.filters = [
	];

	this.publicProperties = [
		'id'
	];
}

module.exports = Staff;

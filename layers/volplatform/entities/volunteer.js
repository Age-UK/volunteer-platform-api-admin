/** @class Sequelize class/function representing a Volunteer object. */
'use strict';

var Joi = require('joi'),
	Sequelize = require('sequelize');

/**
* Represents a Volunteer.
* @constructor
* @param {object} sequelize - sequelize object.
* @param {object} ServiceApplication - ServiceApplication object used to establish relationship between ServiceApplication and Volunteer.
* @param {object} VolunteerDivisionInterest - VolunteerDivisionInterest object used to establish relationship between VolunteerDivisionInterest and Volunteer.
* @return {object} The sequelize object used to read/write ServiceProvider data.
*/
function Volunteer(sequelize, ServiceApplication, VolunteerDivisionInterest) {
	this.name = 'Volunteer';

	this.YesNo = [
		'Yes', 'No'
	];

	this.statuses = [
		'Registered', 'Applied','Active','Inactive'
	];

	this.table = sequelize.define(
		'volunteer',
		{
			id: {
				type: Sequelize.CHAR(36),
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			status: {
				type: Sequelize.STRING(100),
				defaultValue: 'Registered',
				allowNull: false
			},
			statusChangedAt: {
				type: Sequelize.DATE(),
				defaultValue: Sequelize.NOW ,
				allowNull: false
			},
			title: {
				type: Sequelize.ENUM('Mrs', 'Mr', 'Miss', 'Ms', 'Dr', 'Rev', 'Unknown'),
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
			telephone: {
				type: Sequelize.STRING(16),
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			addressLine1: {
				type: Sequelize.STRING(500),
				allowNull: false
			},
			addressLine2: {
				type: Sequelize.STRING(500),
				allowNull: true
			},
			town: {
				type: Sequelize.STRING(500),
				allowNull: true
			},
			county: {
				type: Sequelize.STRING(500),
				allowNull: true
			},
			postcode: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			country: {
				type: Sequelize.STRING(500),
				allowNull: true
			},
			stayingInTouch: {
				type: Sequelize.STRING(500),
				defaultValue: true,
				allowNull: false
			},
			dateOfBirth: {
				type: Sequelize.DATEONLY(),
				allowNull: false
			},
			CommsSMSEnabled: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			},
			CommsPostEnabled: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			},
			CommsPhoneEnabled: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			},
			CommsEmailEnabled: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			}
		},
		{
			freezeTableName: true,
			tableName: 'volunteer'
		}
	);

	//Validate incoming data with Joi
	this.schema = Joi.object().keys({
		status: Joi.string().required(),
		forenames: Joi.string().min(1).max(100).required(),
		surname: Joi.string().min(1).max(100).required(),
		telephone: Joi.string().regex(/^\+[1-9]\d{10,14}$/).min(10).max(16).allow(null, ''),
		email: Joi.string().email().max(255).required(),
		addressLine1: Joi.string().min(1).max(500).required(),
		addressLine2: Joi.string().min(1).max(500).allow(null),
		town: Joi.string().min(1).max(500).allow(null),
		county: Joi.string().min(1).max(500).allow(null),
		country: Joi.string().min(1).max(500).allow(null),
		postcode: Joi.string().max(100).required(),
		//dateOfBirth: Joi.date().iso().required().max('now'),
		stayingInTouch: Joi.string().max(500).required(),
		CommsSMSEnabled: Joi.boolean().valid(true, false).required(),
		CommsPostEnabled: Joi.boolean().valid(true, false).required(),
		CommsPhoneEnabled: Joi.boolean().valid(true, false).required(),
		CommsEmailEnabled: Joi.boolean().valid(true, false).required()
	});

	//Establish relationships
	this.hasMany = {
		serviceApplications: ServiceApplication.table,
		interests: VolunteerDivisionInterest.table
	};

	this.table.hasMany(ServiceApplication.table, {
		as: 'serviceApplications',
		foreignKey: 'volunteerId',
	});

	this.table.hasMany(VolunteerDivisionInterest.table, {
		as: 'interests',
		foreignKey: 'volunteerId',
	});

	this.hasOne = {};

	this.belongsTo = function (entity, as) {
		this.table.belongsTo(entity);

		this.hasOne[as] = entity;
	};

	this.filters = [
		'status'
	];

	this.publicProperties = [
		'id',
		'status'
	];
}

module.exports = Volunteer;

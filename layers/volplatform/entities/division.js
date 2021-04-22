/** @class Sequelize class/function representing a division object. */
'use strict';

var Joi = require('joi'),
	Sequelize = require('sequelize');

/**
 * Represents a division.
 * @constructor
 * @param {object} sequelize - sequelize object.
 * @param {object} ServiceProvider - ServiceProvider object used to establish relationship between divsion and service provider.
 * @param {object} Staff - Staff object used to establish relationship between divsion and staff.
 * @param {object} Volunteer - Volunteer object used to establish relationship between divsion and volunteer.
 * @return {object} The sequelize object used to read/write division data.
 */
function Division(sequelize, ServiceProvider, Staff, Volunteer) {
	this.name = 'Division';

	this.table = sequelize.define(
		'division',
		{
			id: {
				type: Sequelize.CHAR(36),
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false
			},
			description: {
				type: Sequelize.STRING(1000),
				allowNull: true
			},
			url: {
				type: Sequelize.STRING(1000),
				allowNull: true
			},
			isInactive: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			}
		},
		{
			freezeTableName: true,
			tableName: 'division'
		}
	);

	//Validate incoming data with Joi
	this.schema = Joi.object().keys({
		name: Joi.string().email().max(255).required(),
		description: Joi.string().email().max(1000).allow(null),
		url: Joi.string().email().max(1000).allow(null),
		isInactive: Joi.boolean().valid(true, false).required()
	});

	//Establish relationships
	this.hasMany = {
		serviceProviders: ServiceProvider.table
	};

	this.table.hasMany(ServiceProvider.table, {
		as: 'serviceProviders',
		foreignKey: 'divisionId',
	});

	this.table.belongsToMany(Staff.table, { through: 'staffDivision', as: 'staffInDivision' });
	this.table.belongsToMany(Volunteer.table, { through: 'volunteerDivisionInterest', as: 'volunteersInDivision' });

	this.hasOne = {};

	this.belongsTo = function (entity, as) {
		this.table.belongsTo(entity);

		this.hasOne[as] = entity;
	};

	this.filters = [
	];

	this.publicProperties = [
		'id',
		'name'
	];
}

module.exports = Division;

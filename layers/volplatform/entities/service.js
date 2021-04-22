/** @class Sequelize class/function representing a Service object. */
'use strict';

var Joi = require('joi'),
	Sequelize = require('sequelize');

/**
 * Represents a Service.
 * @constructor
 * @param {object} sequelize - sequelize object.
 * @param {object} Staff - Staff object used to establish relationship between service and staff.
 * @return {object} The sequelize object used to read/write Service data.
 */
function Service(sequelize, Staff) {
	this.name = 'Service';

	this.table = sequelize.define(
		'service',
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
			ageUkDirectoryId: {
				type: Sequelize.STRING(255),
				allowNull: true
			}
		},
		{
			freezeTableName: true,
			tableName: 'service'
		}
	);

	//Validate incoming data with Joi
	this.schema = Joi.object().keys({
		name: Joi.string().email().max(255).required(),
		ageUkDirectoryId: Joi.string().email().max(255).required()
	});

	//Establish relationships
	this.hasMany = {
	};

	this.table.belongsToMany(Staff.table, { through: 'staffService', as: 'staffInService' });


	this.hasOne = {};

	this.belongsTo = function (entity, as) {
		this.table.belongsTo(entity);

		this.hasOne[as] = entity;
	};

	this.filters = [
	];

	this.publicProperties = [
		'id',
		'name',
		'ageUkDirectoryId'
	];
}

module.exports = Service;

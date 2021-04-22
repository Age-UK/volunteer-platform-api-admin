/** @class Sequelize class/function representing a ServiceProvider object. */
'use strict';

var Joi = require('joi'),
	Sequelize = require('sequelize');

/**
* Represents a ServiceProvider.
* @constructor
* @param {object} sequelize - sequelize object.
* @param {object} Service - Service object used to establish relationship between ServiceProvider and Service.
* @param {object} Staff - Staff object used to establish relationship between ServiceProvider and Staff.
* @return {object} The sequelize object used to read/write ServiceProvider data.
*/
function ServiceProvider(sequelize, Service, Staff) {
	this.name = 'ServiceProvider';

	this.table = sequelize.define(
		'serviceProvider',
		{
			id: {
				type: Sequelize.CHAR(36),
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			name: {
				type: Sequelize.STRING(255),
				allowNull: false
			}
		},
		{
			freezeTableName: true,
			tableName: 'serviceProvider'
		}
	);

	//Validate incoming data with Joi
	this.schema = Joi.object().keys({
		name: Joi.string().email().max(255).required()
	});

	//Establish relationships
	this.hasMany = {
		services: Service.table
	};

	this.table.hasMany(Service.table, {
		as: 'services',
		foreignKey: 'serviceProviderId',
	});

	this.table.belongsToMany(Staff.table, { through: 'staffServiceProvider', as: 'staffInServiceProvider' });


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

module.exports = ServiceProvider;

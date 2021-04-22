/** @class Sequelize class/function representing a ServiceApplication object. */
'use strict';

var Joi = require('joi'),
	Sequelize = require('sequelize');

/**
 * Represents a ServiceApplication.
 * @constructor
 * @param {object} sequelize - sequelize object.
 * @return {string} The sequelize object used to read/write ServiceApplication data.
 */
function ServiceApplication(sequelize) {
	this.name = 'ServiceApplication';

	this.table = sequelize.define(
		'serviceApplication',
		{
			id: {
				type: Sequelize.CHAR(36),
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			status: {
				type: Sequelize.STRING(255),
				allowNull: false
			}
		},
		{
			freezeTableName: true,
			tableName: 'serviceApplication'
		}
	);

	//Validate incoming data with Joi
	this.schema = Joi.object().keys({
		status: Joi.string().email().max(255).required()
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
		'id',
		'status'
	];
}

module.exports = ServiceApplication;

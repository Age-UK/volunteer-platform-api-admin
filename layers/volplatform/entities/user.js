/** @class Sequelize class/function representing a User object. */
'use strict';

var Joi = require('joi'),
	Sequelize = require('sequelize');

/**
* Represents a User.
* @constructor
* @param {object} sequelize - sequelize object.
* @return {object} The sequelize object used to read/write User data.
*/
function User(sequelize) {
	this.name = 'User';

	this.table = sequelize.define(
		'user',
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
			salt: {
				type: Sequelize.STRING(500),
				allowNull: true
			},
			hash: {
				type: Sequelize.STRING(2500),
				allowNull: true
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				defaultValue: true
			}
		},
		{
			freezeTableName: true,
			tableName: 'user'
		}
	);

	//Validate incoming data with Joi
	this.schema = Joi.object().keys({
		email: Joi.string().email().max(255).required(),
		isActive: Joi.boolean().valid(true, false).required()
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
		'id'
	];
}

module.exports = User;

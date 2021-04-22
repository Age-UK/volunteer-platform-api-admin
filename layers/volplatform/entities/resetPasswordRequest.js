/** @class Sequelize class/function representing a ResetPasswordRequest object. */
'use strict';

var Joi = require('joi'),
	Sequelize = require('sequelize');
/**
 * Represents a ResetPasswordRequest.
 * @constructor
 * @param {object} sequelize - sequelize object.
 * @return {object} The sequelize object used to read/write ResetPasswordRequest data.
 */
function ResetPasswordRequest(sequelize) {
	this.name = 'ResetPasswordRequest';

	this.table = sequelize.define(
		'resetPasswordRequest',
		{
			id: {
				type: Sequelize.CHAR(36),
				defaultValue: Sequelize.UUIDV4,
				primaryKey: true
			},
			expiresAt: {
				type: Sequelize.DATE(),
				allowNull: false
			},
			userId: {
				type: Sequelize.CHAR(36),
				allowNull: true
			}
		},
		{
			freezeTableName: true
		}
	);

	//Validate incoming data with Joi
	this.schema = Joi.object().keys({
		email: Joi.string().email().max(255).required()
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

module.exports = ResetPasswordRequest;

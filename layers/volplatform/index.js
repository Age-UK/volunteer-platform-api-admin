'use strict';
var Sequelize = require('sequelize');
var entities = require('./lib/entities');

//Initialise sequelize DB connection
var sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        logging: console.log,
        timezone: 'Europe/London',
        dialect: 'mysql',
        dialectOptions: {
            // Set so can use local database
            ssl: process.env.databaseSSL === 'local' ? null : 'Amazon RDS'
        },
        pool: {
            max: 1, // https://github.com/sequelize/sequelize/issues/4938
            min: 0,
            idle: 20000,
            acquire: 20000
        },
        operatorsAliases: 0, // https://github.com/sequelize/sequelize/issues/8417
    }
);

var _entities = entities(sequelize);

module.exports.layer = () => {
    return {
        msg: 'Layer initialised',
        entities: _entities,
        sequelize: sequelize
    }
};
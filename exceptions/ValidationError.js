var HttpError = require('./HttpError');

let ValidationError = function (errors) {
	HttpError.apply(this, [422, 'Validation errors occurred', errors]);
};

// Set up inheritance
ValidationError.prototype = Object.create(HttpError.prototype);
ValidationError.prototype.constructor = ValidationError;

module.exports = ValidationError;
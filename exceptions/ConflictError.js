var HttpError = require('./HttpError');

let ConflictError = function (error) {
	HttpError.apply(this, [409, error || 'Conflict']);
};

// Set up inheritance
ConflictError.prototype = Object.create(HttpError.prototype);
ConflictError.prototype.constructor = ConflictError;

module.exports = ConflictError;
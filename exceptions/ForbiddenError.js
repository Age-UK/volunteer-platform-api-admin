var HttpError = require('./HttpError');

let ForbiddenError = function (message) {
	HttpError.apply(this, [403, message || 'Unauthorized']);
};

// Set up inheritance
ForbiddenError.prototype = Object.create(HttpError.prototype);
ForbiddenError.prototype.constructor = ForbiddenError;

module.exports = ForbiddenError;
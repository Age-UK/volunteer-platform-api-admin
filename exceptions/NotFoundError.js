var HttpError = require('./HttpError');

let NotFoundError = function (entityName, id) {
	let message = entityName + (id ? ' with id: ' + id : '') + ' not found.';
	HttpError.apply(this, [404, message]);
};

// Set up inheritance
NotFoundError.prototype = Object.create(HttpError.prototype);
NotFoundError.prototype.constructor = NotFoundError;

module.exports = NotFoundError;
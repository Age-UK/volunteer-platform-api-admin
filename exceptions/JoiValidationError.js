var ValidationError = require('./ValidationError');

let JoiValidationError = function (error) {
	// Process joi error
	// Converts to format: errors: [ { key: 'error string' }, { anotherKey: 'another error string' } ]
	let processedErrors = [];
	error.details.forEach(errorDetail => {
		let newError = {};
		newError[errorDetail.context.key] = errorDetail.message;
		processedErrors.push(newError);
	});

	ValidationError.apply(this, [processedErrors]);
};

// Set up inheritance
JoiValidationError.prototype = Object.create(ValidationError.prototype);
JoiValidationError.prototype.constructor = JoiValidationError;

module.exports = JoiValidationError;
let HttpError = function (status, error, errors) {
	if (!status) {
        status = 500;
    }
    if (!error) {
        error = 'An internal error occurred';
    }

    this.status = status;
    this.error = error;
    this.errors = errors || null;
};

module.exports = HttpError;
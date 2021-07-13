class ResponseBuilder {
	static build(success = true, message = 'no message defined', data = null) {
		return {success, message, data}
	}

	static ok(data = null, message = 'ok') {
		return this.build(true, message, data);
	}

	static notFound(message = 'Not Found') {
		return this.build(false, message);
	}
	static validationError(errors = []) {
		return {
			success: false,
			message: 'Validation Error',
			errors
		}
	}
}

module.exports = ResponseBuilder;

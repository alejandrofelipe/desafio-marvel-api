const ResponseBuilder = require('./response-builder');

module.exports = class Errors {
	static notFound(req, res) {
		res.status(404)
			.send(ResponseBuilder.notFound());
	}
}

const ResponseBuilder = require('./response-builder');

module.exports = class IndexService {
	static index(req, res) {
		res.send(ResponseBuilder.ok(null, 'Server Running'))
	}
}

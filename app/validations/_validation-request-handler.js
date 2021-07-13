const {validationResult} = require('express-validator');
const ResponseBuilder = require('../services/response-builder');

module.exports = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).send(ResponseBuilder.validationError(errors.array()));
	} else next();
}

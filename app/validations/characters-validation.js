const {query, param} = require('express-validator');

const messages = require('../messages');
const {name, modified, limit, orderBy} = require('./general-validation');
const validationHandler = require('./_validation-request-handler');

module.exports = {
	list: [
		query(['comics', 'series', 'events', 'stories', 'offset'])
			.optional()
			.notEmpty().bail()
			.isInt().withMessage(messages.INVALIDO).bail(),
		name,
		modified,
		limit,
		orderBy,
		validationHandler
	],
	get: [
		param(['characterId'])
			.notEmpty()
			.isInt().withMessage(messages.INVALIDO).bail(),
		validationHandler
	]
}

const {query, param} = require('express-validator');

const messages = require('../messages');
const {name, modified, limit, orderBy, offset} = require('./general-validation');
const validationHandler = require('./_validation-request-handler');

module.exports = {
	list: [
		query(['comics', 'series', 'events', 'stories'])
			.optional()
			.notEmpty().bail()
			.isInt().withMessage(messages.INVALIDO).bail()
			.matches(/[0-9]+((;[0-9]+)?)+/gm).bail(),
		name,
		modified,
		limit,
		offset,
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

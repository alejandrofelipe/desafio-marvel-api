const {check, query} = require('express-validator');
const messages = require('../messages');
const {intLte, intGte} = require('./customValidation')
const validationHandler = require('../validations/validationRequestHandler');

module.exports = {
	list: [
		query(['name', 'nameStartsWith'])
			.optional({nullable: false})
			.isString().withMessage(messages.INVALIDO).bail(),
		query('modifiedSince')
			.optional({nullable: false})
			.isISO8601().bail(),
		query(['comics', 'series', 'events', 'stories', 'offset'])
			.optional()
			.isInt().withMessage(messages.INVALIDO).bail(),
		query('limit')
			.optional()
			.isInt().withMessage(messages.INVALIDO).bail()
			.custom(intGte(1)).bail()
			.custom(intLte(100)).bail(),
		query('orderBy')
			.optional()
			.isIn(['name', 'modified', '-name', '-modified']).withMessage(messages.ORD_INVALIDO).bail(),
		validationHandler
	]
}

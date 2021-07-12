const {query} = require('express-validator');

const messages = require('../messages');
const {intLte, intGte} = require('./_properties-validation');

module.exports = {
	name: query(['name', 'nameStartsWith'])
		.optional({nullable: false})
		.notEmpty().bail()
		.isString().withMessage(messages.INVALIDO).bail(),
	modified: query('modifiedSince')
		.optional({nullable: false})
		.isISO8601().bail(),
	limit: query('limit')
		.optional()
		.notEmpty().bail()
		.isInt().withMessage(messages.INVALIDO).bail()
		.custom(intGte(1)).bail()
		.custom(intLte(100)).bail(),
	offset: query('offset')
		.optional()
		.notEmpty().bail()
		.isInt().withMessage(messages.INVALIDO).bail(),
	orderBy: query('orderBy')
		.optional()
		.notEmpty().bail()
		.isIn(['name', 'modified', '-name', '-modified']).withMessage(messages.ORD_INVALIDO).bail(),
}

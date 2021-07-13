const {query} = require('express-validator');

const {intLte, intGte} = require('./_properties-custom-validation');

module.exports = {
	name: query(['name', 'nameStartsWith'])
		.optional({nullable: false})
		.notEmpty().bail()
		.isString().bail(),
	title: query(['title', 'titleStartsWith'])
		.optional({nullable: false})
		.notEmpty().bail()
		.isString().bail(),
	modified: query('modifiedSince')
		.optional({nullable: false})
		.isISO8601().bail(),
	limit: query('limit')
		.optional()
		.notEmpty().bail()
		.isInt().bail()
		.custom(intGte(1)).bail()
		.custom(intLte(100)).bail(),
	offset: query('offset')
		.optional()
		.notEmpty().bail()
		.isInt().bail(),
	buildOrderBy(fields = ['modified']) {
		let descFields = fields.map(f => `-${f}`);
		return query('orderBy')
			.optional()
			.notEmpty().bail()
			.isIn([...fields, ...descFields]).bail()
	},
}

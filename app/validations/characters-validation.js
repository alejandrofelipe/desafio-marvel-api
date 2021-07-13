const {query, param} = require('express-validator');

const {name, title, modified, limit, buildOrderBy, offset} = require('./_general-validation');
const validationHandler = require('./_validation-request-handler');

const paramCharacterId = param(['characterId'])
	.notEmpty()
	.isInt().bail()
	.toInt();

module.exports = {
	list: [
		query(['comics', 'series', 'events', 'stories'])
			.optional()
			.notEmpty().bail()
			.trim().isString().bail()
			.matches(/^[0-9]+(;[0-9]+)*$/is).bail(),
		name,
		modified,
		limit,
		offset,
		buildOrderBy(['name', 'modified']),
		validationHandler
	],
	get: [
		paramCharacterId,
		validationHandler
	],
	getComics: [
		paramCharacterId,
		query('issueNumber')
			.optional()
			.notEmpty().bail()
			.isInt().bail().toInt(),
		title,
		modified,
		limit,
		offset,
		buildOrderBy(['title', 'issueNumber', 'modified']),
		validationHandler
	],
	getEvents: [
		paramCharacterId,
		title,
		modified,
		limit,
		offset,
		buildOrderBy(['title', 'modified']),
		validationHandler
	],
	getSeries: [
		paramCharacterId,
		query(['startYear', 'endYear'])
			.optional()
			.notEmpty().bail()
			.isInt().bail().toInt(),
		title,
		modified,
		limit,
		offset,
		buildOrderBy(['title', 'modified', 'startYear']),
		validationHandler
	],
	getStories: [
		paramCharacterId,
		title,
		modified,
		limit,
		offset,
		buildOrderBy(['title', 'modified']),
		validationHandler
	]
}

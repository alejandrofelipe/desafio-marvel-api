const ResponseBuilder = require('./response-builder');

const Character = require('../models/Character');
const Comic = require('../models/Comic');
const Event = require('../models/Event');
const Serie = require('../models/Serie');
const Story = require('../models/Story');

module.exports = class CharacterService {
	static async list(req, res) {
		const {query: filter} = req;
		let sqlQuery = Character.query()
			.select('characters.*');

		if (filter?.comics) {
			sqlQuery
				.distinct('characters.id')
				.joinRelated('comics')
				.where('comics.id', 'in', filter.comics.split(';'));
		}
		if (filter?.series) {
			sqlQuery
				.distinct('characters.id')
				.joinRelated('series')
				.where('series.id', 'in', filter.series.split(';'));
		}
		if (filter?.stories) {
			sqlQuery
				.distinct('characters.id')
				.joinRelated('stories')
				.where('stories.id', 'in', filter.stories.split(';'));
		}
		if (filter?.events) {
			sqlQuery
				.distinct('characters.id')
				.joinRelated('events')
				.where('events.id', 'in', filter.events.split(';'));
		}

		if (filter?.name)
			sqlQuery.where({name: filter.name});
		if (filter?.nameStartsWith)
			sqlQuery.where('name', 'like', `${filter.nameStartsWith}%`);
		if (filter?.modifiedSince)
			sqlQuery.where('modified', '>', filter?.modifiedSince);

		if (filter?.limit)
			sqlQuery.limit(filter.limit);
		if (filter?.offset)
			sqlQuery.offset(filter.offset);

		if (filter?.orderBy && filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy.slice(1), 'desc');
		if (filter?.orderBy && !filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy);

		res.send(await sqlQuery);
	}

	static async get(req, res) {
		const {params: {characterId}} = req;
		const char = await Character.query().findById(characterId);
		if (char)
			res.send(char);
		else res.status(404)
			.send(ResponseBuilder.notFound())
	}

	static async getComics(req, res) {
		const {params: {characterId}, query: filter} = req;

		const char = await Character.query().findById(characterId);
		if (!char)
			res.status(404).send(ResponseBuilder.notFound())

		let sqlQuery = Comic.query().select('comics.*');

		if (filter?.title)
			sqlQuery.where('title', filter.title);
		if (filter?.titleStartsWith)
			sqlQuery.where('title', 'like', `${filter.titleStartsWith}%`);
		if (filter?.issueNumber)
			sqlQuery.where('issueNumber', filter.issueNumber);

		if (filter?.modifiedSince)
			sqlQuery.where('comics.modified', '>', filter?.modifiedSince);

		if (filter?.limit)
			sqlQuery.limit(filter.limit);
		if (filter?.offset)
			sqlQuery.offset(filter.offset);

		if (filter?.orderBy && filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy.slice(1), 'desc');
		if (filter?.orderBy && !filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy);

		sqlQuery
			.distinct('comics.id')
			.joinRelated('characters')
			.where('characters.id', characterId);

		res.send(await sqlQuery);
	}

	static async getEvents(req, res) {
		const {params: {characterId}, query: filter} = req;

		const char = await Character.query().findById(characterId);
		if (!char)
			res.status(404).send(ResponseBuilder.notFound())

		const sqlQuery = Event.query().select('events.*');

		if (filter?.title)
			sqlQuery.where('title', filter.title);
		if (filter?.titleStartsWith)
			sqlQuery.where('title', 'like', `${filter.titleStartsWith}%`);

		if (filter?.modifiedSince)
			sqlQuery.where('events.modified', '>', filter?.modifiedSince);

		if (filter?.limit)
			sqlQuery.limit(filter.limit);
		if (filter?.offset)
			sqlQuery.offset(filter.offset);

		if (filter?.orderBy && filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy.slice(1), 'desc');
		if (filter?.orderBy && !filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy);

		sqlQuery
			.distinct('events.id')
			.joinRelated('characters')
			.where('characters.id', characterId);

		res.send(await sqlQuery);
	}

	static async getSeries(req, res) {
		const {params: {characterId}, query: filter} = req;

		const char = await Character.query().findById(characterId);
		if (!char)
			res.status(404).send(ResponseBuilder.notFound())

		const sqlQuery = Serie.query().select('series.*');

		if (filter?.title)
			sqlQuery.where('title', filter.title);
		if (filter?.titleStartsWith)
			sqlQuery.where('title', 'like', `${filter.titleStartsWith}%`);

		if (filter?.modifiedSince)
			sqlQuery.where('series.modified', '>', filter?.modifiedSince);

		if (filter?.startYear)
			sqlQuery.where('startYear', filter.startYear);
		if (filter?.endYear)
			sqlQuery.where('endYear', filter.endYear);

		if (filter?.limit)
			sqlQuery.limit(filter.limit);
		if (filter?.offset)
			sqlQuery.offset(filter.offset);

		if (filter?.orderBy && filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy.slice(1), 'desc');
		if (filter?.orderBy && !filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy);

		sqlQuery
			.distinct('series.id')
			.joinRelated('characters')
			.where('characters.id', characterId);

		res.send(await sqlQuery);
	}

	static async getStories(req, res) {
		const {params: {characterId}, query: filter} = req;

		const char = await Character.query().findById(characterId);
		if (!char)
			res.status(404).send(ResponseBuilder.notFound())

		let sqlQuery = Story.query().select('stories.*');

		if (filter?.title)
			sqlQuery.where('title', filter.title);
		if (filter?.titleStartsWith)
			sqlQuery.where('title', 'like', `${filter.titleStartsWith}%`);

		if (filter?.modifiedSince)
			sqlQuery.where('stories.modified', '>', filter?.modifiedSince);

		if (filter?.limit)
			sqlQuery.limit(filter.limit);
		if (filter?.offset)
			sqlQuery.offset(filter.offset);

		if (filter?.orderBy && filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy.slice(1), 'desc');
		if (filter?.orderBy && !filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy);

		sqlQuery
			.distinct('stories.id')
			.joinRelated('characters')
			.where('characters.id', characterId);

		res.send(await sqlQuery);
	}
}

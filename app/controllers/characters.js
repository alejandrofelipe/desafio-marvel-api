const MemoryDatabase = require("../datasource/MemoryDatabase")
const Character = require('../models/Character');

module.exports = {
	async list(req, res) {
		const {query: filter} = req;
		const conn = MemoryDatabase.getConnection();
		const sqlQuery = Character.query();

		if (filter?.name)
			sqlQuery.where({name: filter.name});
		if (filter?.nameStartsWith)
			sqlQuery.where('name', 'like', `${filter.name}%`);
		if(filter?.modifiedSince)
			sqlQuery.where('modified', '>', filter?.modifiedSince);
		if (filter?.limit)
			sqlQuery.limit(filter.limit);
		if (filter?.offset)
			sqlQuery.offset(filter.offset);
		if (filter?.orderBy && filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy.slice(1), 'desc');
		if (filter?.orderBy && !filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy);

		// if(filter.comics)
		// 	sqlQuery
		// 		.innerJoin('characters')
		// 		.groupBy('characters.*')

		const chars = await sqlQuery;
		res.send(chars);
	},
	get(req, res) {
		const conn = MemoryDatabase.getConnection();
	},
	getComics() {

	},
	getEvents() {

	},
	getSeries() {

	},
	getStories() {

	}
}

const MemoryDatabase = require("../datasource/MemoryDatabase")

module.exports = {
	async list(req, res) {
		const {query: filter} = req;
		const conn = MemoryDatabase.getConnection();
		const sqlQuery = conn.select('*').from('characters');

		if (filter?.name)
			sqlQuery.where({name: filter.name});
		if (filter?.nameStartsWith)
			sqlQuery.where('name', 'like', `${filter.name}%`);
		if (filter?.limit)
			sqlQuery.limit(filter.limit);
		if (filter?.offset)
			sqlQuery.offset(filter.offset);
		if (filter?.orderBy && filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy.slice(1), 'desc');
		if (filter?.orderBy && !filter.orderBy.startsWith('-'))
			sqlQuery.orderBy(filter.orderBy);

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

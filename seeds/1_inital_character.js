exports.seed = async function (knex) {
	// await knex('characters_comics').del();
	// await knex('characters_stories').del();
	// await knex('characters_series').del();
	// await knex('characters_events').del();
	// await knex('series').del();
	// await knex('comics').del();
	// await knex('events').del();
	// await knex('stories').del();
	// await knex('stories').del();

	return  knex('characters').del()
		.insert([
			{id: 1, name: 'Super', description: 'S', modified: '2021-03-01'},
			{id: 2, name: 'Ultra', description: 'SS', modified: '2021-05-01'},
			{id: 3, name: 'Mega', description: 'SSS', modified: '2021-01-01'}
		]);
	//

	//

	//

	//

	//

};

exports.seed = async function (knex) {
	return  knex('characters').del()
		.insert([
			{id: 1, name: 'Super', description: 'S', modified: '2021-03-01'},
			{id: 2, name: 'Ultra', description: 'SS', modified: '2021-05-01'},
			{id: 3, name: 'Mega', description: 'SSS', modified: '2021-01-01'},
			{id: 4, name: 'Megamanthus', description: 'M', modified: '2021-04-01'},
		]);
};

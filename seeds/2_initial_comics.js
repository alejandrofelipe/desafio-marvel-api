exports.seed = async function (knex) {
	return knex('comics').del()
		.insert([
			{id: 1, title: 'Comic Super', description: 'Comic S', modified: '2021-03-01'},
			{id: 2, title: 'Comic Ultra', description: 'Comic SS', modified: '2021-05-01'},
			{id: 3, title: 'Comic Mega', description: 'Comic SSS', modified: '2021-01-01'},
			{id: 4, title: 'Comic Reunion', description: 'Comic S+SS+SSS', modified: '2022-06-01'},
		]);
}

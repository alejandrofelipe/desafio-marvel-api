exports.seed = async function (knex) {
	return knex('series').del()
		.insert([
			{id: 1, title: 'Introduction', description: 'Series I', startYear: 2021, endYear: 2022, modified: '2021-03-01'},
			{id: 2, title: 'Meeting', description: 'Series M', startYear: 2022, endYear: 2023, modified: '2021-06-01'},
		]);
}

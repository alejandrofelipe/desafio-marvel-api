exports.seed = async function (knex) {
	return knex('series').del()
		.insert([
			{
				id: 1,
				title: 'Introduction',
				description: 'Series I',
				startYear: 2015,
				endYear: 2017,
				modified: '2017-03-01'
			},
			{
				id: 2,
				title: 'Meeting',
				description: 'Series M',
				startYear: 2018,
				endYear: 2020,
				modified: '2021-06-01'
			},
		]);
}

exports.seed = async function (knex) {
	return knex('events').del()
		.insert([
			{
				id: 1,
				title: 'Great Explosion',
				description: 'A Great Explosion',
				modified: '2021-03-01'
			},
			{
				id: 2,
				title: 'Calamity',
				description: 'The Calamity',
				modified: '2021-05-01'
			},
			{
				id: 3,
				title: 'Cataclism',
				description: 'The Cataclism',
				modified: '2020-01-01'
			},
			{
				id: 4,
				title: 'Gathering',
				description: 'Gathering',
				modified: '2018-01-01'
			},
		]);
}

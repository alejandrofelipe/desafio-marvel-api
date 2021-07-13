exports.seed = async function (knex) {
	return knex('comics').del()
		.insert([
			{
				id: 1,
				title: 'Comic Super',
				description: 'Comic S',
				issueNumber: 10,
				modified: '2021-03-01'
			},
			{
				id: 2,
				title: 'Comic Ultra',
				description: 'Comic SS',
				issueNumber: 9,
				modified: '2021-05-01'
			},
			{
				id: 3,
				title: 'Comic Mega',
				description: 'Comic SSS',
				issueNumber: 99,
				modified: '2021-01-01'
			},
			{
				id: 4,
				title: 'Comic Reunion',
				description: 'Comic S+SS+SSS',
				issueNumber: 7,
				modified: '2022-06-01'
			},
		]);
}

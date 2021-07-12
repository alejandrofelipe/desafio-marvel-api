exports.seed = async function (knex) {
	return knex('stories').del()
		.insert([
		{id: 1, title: 'Avoid The Great Explosion', description: 'A Great Explosion', modified: '2021-03-01'},
		{id: 2, title: 'Survive The Calamity', description: 'The Calamity', modified: '2021-05-01'},
		{id: 3, title: 'Death Wing\'s Ascent', description: 'The Cataclism', modified: '2021-01-01'},
		{id: 4, title: 'Multiple Disaster', description: 'Disaster', modified: '2021-01-01'}
	]);
}

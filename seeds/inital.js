exports.seed = async function (knex) {
	await knex('characters_comics').del();
	await knex('characters_stories').del();
	await knex('characters_series').del();
	await knex('characters_events').del();
	await knex('characters').del()
	await knex('series').del();
	await knex('comics').del();
	await knex('events').del();
	await knex('stories').del();
	await knex('stories').del();

	knex('characters').insert([
		{id: 1, name: 'Super', description: 'S', modified: '2021-03-01'},
		{id: 2, name: 'Ultra', description: 'SS', modified: '2021-05-01'},
		{id: 3, name: 'Mega', description: 'SSS', modified: '2021-01-01'}
	]);

	knex('series').insert([
		{id: 1, name: 'Introduction', description: 'Series I', startYear: 2021, endYear: 2022, modified: '2021-03-01'},
		{id: 2, name: 'Meeting', description: 'Series M', startYear: 2022, endYear: 2023, modified: '2021-06-01'
		},
	]);

	knex('comics').insert([
		{id: 1, name: 'Comic Super', description: 'Comic S', modified: '2021-03-01'},
		{id: 2, name: 'Comic Ultra', description: 'Comic SS', modified: '2021-05-01'},
		{id: 3, name: 'Comic Mega', description: 'Comic SSS', modified: '2021-01-01'},
		{id: 4, name: 'Comic Reunion', description: 'Comic S+SS+SSS', modified: '2022-06-01'},
	]);

	knex('events').insert([
		{id: 1, name: 'Great Explosion', description: 'A Great Explosion', modified: '2021-03-01'},
		{id: 2, name: 'Calamity', description: 'The Calamity', modified: '2021-05-01'},
		{id: 3, name: 'Cataclism', description: 'The Cataclism', modified: '2021-01-01'},
		{id: 4, name: 'Gathering', description: 'Gathering', modified: '2021-01-01'},
	]);

	knex('stories').insert([
		{id: 1, name: 'Avoid The Great Explosion', description: 'A Great Explosion', modified: '2021-03-01'},
		{id: 2, name: 'Survive The Calamity', description: 'The Calamity', modified: '2021-05-01'},
		{id: 3, name: 'Death Wing\'s Ascent', description: 'The Cataclism', modified: '2021-01-01'},
		{id: 4, name: 'Multiple Disaster', description: 'Disaster', modified: '2021-01-01'}
	]);

	knex('characters_comics').insert([
		{character_id: 1, comic_id: 1},
		{character_id: 2, comic_id: 2},
		{character_id: 3, comic_id: 3},
		{character_id: 1, comic_id: 4},
		{character_id: 2, comic_id: 4},
		{character_id: 3, comic_id: 4},
	]);

	knex('characters_stories').insert([
		{character_id: 1, story_id: 1},
		{character_id: 2, story_id: 2},
		{character_id: 3, story_id: 3},
		{character_id: 1, story_id: 4},
		{character_id: 2, story_id: 4},
		{character_id: 3, story_id: 4},
	]);

	knex('characters_series').insert([
		{character_id: 1, serie_id: 1},
		{character_id: 2, serie_id: 1},
		{character_id: 3, serie_id: 1},
		{character_id: 1, serie_id: 2},
		{character_id: 2, serie_id: 2},
		{character_id: 3, serie_id: 2},
	]);

	knex('characters_events').insert([
		{character_id: 1, event_id: 1},
		{character_id: 2, event_id: 2},
		{character_id: 3, event_id: 3},
		{character_id: 1, event_id: 4},
		{character_id: 2, event_id: 4},
		{character_id: 3, event_id: 4},
	]);
};

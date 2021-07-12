exports.seed = async function (knex) {
	return knex('characters_stories').del()
		.insert([
			{character_id: 1, story_id: 1},
			{character_id: 2, story_id: 2},
			{character_id: 3, story_id: 3},
			{character_id: 1, story_id: 4},
			{character_id: 2, story_id: 4},
			{character_id: 3, story_id: 4},
		]);
}

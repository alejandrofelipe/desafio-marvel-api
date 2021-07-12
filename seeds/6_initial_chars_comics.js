exports.seed = async function (knex) {
	return  knex('characters_comics').del()
			.insert([
				{character_id: 1, comic_id: 1},
				{character_id: 2, comic_id: 2},
				{character_id: 3, comic_id: 3},
				{character_id: 1, comic_id: 4},
				{character_id: 2, comic_id: 4},
				{character_id: 3, comic_id: 4},
			]);
}

exports.seed = async function (knex) {
	return  knex('characters_series').del()
			.insert([
				{character_id: 1, serie_id: 1},
				{character_id: 2, serie_id: 1},
				{character_id: 3, serie_id: 1},
				{character_id: 1, serie_id: 2},
				{character_id: 2, serie_id: 2},
				{character_id: 3, serie_id: 2},
			]);
}

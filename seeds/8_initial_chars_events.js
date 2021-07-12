exports.seed = async function (knex) {
	return  knex('characters_events').del()
		.insert([
			{character_id: 1, event_id: 1},
			{character_id: 2, event_id: 2},
			{character_id: 3, event_id: 3},
			{character_id: 1, event_id: 4},
			{character_id: 2, event_id: 4},
			{character_id: 3, event_id: 4},
		]);
}

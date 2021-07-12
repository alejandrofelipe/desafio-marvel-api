exports.up = knex => {
	return knex.schema
		.createTable('characters', table => {
			table.increments('id');
			table.string('name').notNullable();
			table.string('description').notNullable();
			table.date('modified').defaultTo(knex.fn.now());
		})
		.createTable('comics', table => {
			table.increments('id');
			table.string('title');
			table.string('description');
			table.integer('issueNumber');
			table.timestamp('modified');
		})
		.createTable('events', table => {
			table.increments('id');
			table.string('title');
			table.string('description');
			table.timestamp('modified');
		})
		.createTable('series', table => {
			table.increments('id');
			table.string('title');
			table.string('description');
			table.integer('startYear');
			table.integer('endYear');
			table.timestamp('modified');
		})
		.createTable('stories', table => {
			table.increments('id');
			table.string('title');
			table.string('description');
			table.timestamp('modified');
		})
		.createTable('characters_comics', table => {
			table.increments('id');
			table.integer('character_id');
			table.integer('comic_id');

			table.foreign('character_id')
				.references('id')
				.inTable('characters');

			table.foreign('comic_id')
				.references('id')
				.inTable('comics');
		})
		.createTable('characters_stories', table => {
			table.increments('id');
			table.integer('character_id');
			table.integer('story_id');
		})
		.createTable('characters_series', table => {
			table.increments('id');
			table.integer('character_id');
			table.integer('serie_id');
		})
		.createTable('characters_events', table => {
			table.increments('id');
			table.integer('character_id');
			table.integer('event_id');
		})
};

exports.down = knex => {
	return knex.schema
		.dropTable('characters')
		.dropTable('comics')
		.dropTable('events')
		.dropTable('series')
		.dropTable('stories')
		.dropTable('characters_comics')
		.dropTable('characters_stories')
		.dropTable('characters_series')
		.dropTable('characters_events');
};

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
		});
};

exports.down = knex => {
	return knex.schema
		.dropTable('characters')
		.dropTable('comics')
		.dropTable('events')
		.dropTable('series')
		.dropTable('stories');
};

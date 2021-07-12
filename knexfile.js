// Update with your config settings.

module.exports = {
	development: {
		client: 'sqlite3',
		connection: ':memory:',
		useNullAsDefault: true,
		migrations: {directory: __dirname + '/migrations'},
		seeds: {
			directory: './seeds'
		},
		pool: {min: 1, max: 10}
	}
};

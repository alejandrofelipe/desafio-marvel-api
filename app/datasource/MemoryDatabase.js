const knex = require('knex');
const {development: devConfig} = require('../../knexfile');

module.exports = class MemoryDatabase {

	static getConnection() {
		if (!this.conn)
			this.conn = knex(devConfig);
		return this.conn;
	}

	static async init() {
		const conn = this.getConnection();
		await conn.migrate.latest();
		await conn.seed.run();
	}

	static async close() {
		if (this.conn) {
			await this.conn.destroy();
			this.conn = null;
		}
	}
}

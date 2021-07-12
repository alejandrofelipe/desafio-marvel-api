const http = require('http');
const express = require('express');
const {Model} = require('objection');

const routes = require('./routes')
const Database = require('./datasource/MemoryDatabase');

const host = 'localhost';
const port = 3000;

const app = express();
routes(app);

const server = http.createServer(app);

module.exports = {
	host,
	port,
	async start() {
		await Database.init();
		Model.knex(Database.getConnection());
		return server.listen(port, host, () =>
			console.log(`Servidor rodando em http://localhost:${port}`))
	},
	async close() {
		server.close()
		await Database.close();
	}
}

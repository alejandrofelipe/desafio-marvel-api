const express = require('express');

const routes = require('./routes')
const MemoryDatabase = require('./datasource/MemoryDatabase');

const app = express();
const host = 'localhost';
const port = 3000;

routes(app);

module.exports = {
	host,
	port,
	instance: null,
	async start() {
		await MemoryDatabase.init();
		this.instance = app.listen(port, host, () =>
			console.log(`Servidor rodando em http://localhost:${port}`));
		return app;
	},
	async close() {
		this.instance?.close()
		await MemoryDatabase.close();
	}
}

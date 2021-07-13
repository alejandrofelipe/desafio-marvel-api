const http = require('http');
const express = require('express');
const {Model} = require('objection');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const routes = require('./routes')
// const Database = require('./datasource/MemoryDatabase');

// const host = 'localhost';
// const port = 3000;

const app = express();
app.use(express.json());
app.use(methodOverride());

routes(app);

app.use(function (err, req, res, next) {
	res.status(500).send(err);
});
module.exports = app;

// module.exports = {
// 	host,
// 	port,
// 	async start() {
// 		await Database.init();
// 		Model.knex(Database.getConnection());
// 		return app.listen(port, host, () =>
// 			console.log(`Servidor rodando em http://localhost:${port}`))
// 	},
// 	async close() {
// 		app.close()
// 		await Database.close();
// 	}
// }

const app = require('./app');
const Database = require('./app/datasource/MemoryDatabase');

const port = 3000;
(async () => {
	await Database.init();
	app.listen(port, () => {
		console.log(`Running at port ${port}`)
	});
})();


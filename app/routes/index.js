const {index} = require('../services');
const {notFound} = require('../services/erros');
const routesCharacters = require('./characters');

module.exports = app => {
	app.get('/', index);
	routesCharacters(app);
	app.get('*', notFound);
}

const {index} = require('../controllers');
const {notFound} = require('../controllers/erros');
const routesCharacters = require('./characters');

module.exports = app => {
	app.get('/', index);
	routesCharacters(app);
	app.get('*', notFound);
}

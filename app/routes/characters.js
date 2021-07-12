const chararacters = require('../controllers/characters');
const charsValidation = require('../validations/characters-validation');

module.exports = app => {
	app.get('/v1/public/characters', charsValidation.list, chararacters.list);
}

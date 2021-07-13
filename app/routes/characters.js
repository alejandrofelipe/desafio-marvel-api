const chararacters = require('../services/characters');
const charsValidation = require('../validations/characters-validation');

module.exports = app => {
	app.get('/v1/public/characters',
		charsValidation.list, chararacters.list);

	app.get('/v1/public/characters/:characterId',
		charsValidation.get, chararacters.get);

	app.get('/v1/public/characters/:characterId/comics',
		charsValidation.getComics, chararacters.getComics);

	app.get('/v1/public/characters/:characterId/events',
		charsValidation.getEvents, chararacters.getEvents);

	app.get('/v1/public/characters/:characterId/series',
		charsValidation.getSeries, chararacters.getSeries);

	app.get('/v1/public/characters/:characterId/stories',
		charsValidation.getStories, chararacters.getStories);
}

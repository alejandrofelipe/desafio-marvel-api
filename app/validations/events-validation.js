const {name, modified, limit, orderBy} = require('./general-validation');
const validationHandler = require('./_validation-request-handler');

module.exports = {
	list: [
		name,
		modified,
		limit,
		orderBy,
		validationHandler
	]
}

const format = require('string-template');
const messages = require('../messages');


module.exports = {
	intLte(compValue) {
		return (value) => {
			if (value <= compValue)
				return true;
			throw new Error(format(messages.ACIMA, [compValue]))
		}
	},
	intGte(compValue) {
		return (value) => {
			if (value >= compValue)
				return true;
			throw new Error(format(messages.ABAIXO, [compValue]))
		}
	},
}

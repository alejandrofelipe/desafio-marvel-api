module.exports = {
	intLte(compValue) {
		return (value) => {
			if (value <= compValue)
				return true;
			throw new Error(`Value above ${compValue}.`)
		}
	},
	intGte(compValue) {
		return (value) => {
			if (value >= compValue)
				return true;
			throw new Error(`Value below ${compValue}.`)
		}
	},
}

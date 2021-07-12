const {Model} = require('objection');
const Database = require('../datasource/MemoryDatabase');

Model.knex(Database.getConnection());

class Serie extends Model {
	static get tableName() {
		return 'series';
	}

	static get jsonSchema() {
		return {
			type: "object",
			additionalProperties: false,
			properties: {
				id: {
					type: "integer"
				},
				name: {
					type: "string"
				},
				description: {
					type: "string"
				},
				startYear: {
					type: "integer"
				},
				endYear: {
					type: "integer"
				},
				modified: {
					type: "string",
					format: "date"
				}
			},
			required: [
				"id",
				"name",
				"description",
				"startYear",
				"endYear",
				"modified"
			]
		};
	}
}

module.exports = Serie;

const {Model} = require('objection');
const Database = require('../datasource/MemoryDatabase');

Model.knex(Database.getConnection());

class Event extends Model {
	static get tableName() {
		return 'events';
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
				modified: {
					type: "string",
					format: "date"
				}
			},
			required: [
				"id",
				"name",
				"description",
				"modified"
			]
		};
	}
}

module.exports = Event;

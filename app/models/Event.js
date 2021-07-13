const {Model} = require('objection');
const Database = require('../datasource/MemoryDatabase');

Model.knex(Database.getConnection());

class Event extends Model {
	static get tableName() {
		return 'events';
	}

	static get idColumn() {
		return 'id';
	}

	static get jsonSchema() {
		return {
			type: "object",
			additionalProperties: false,
			properties: {
				id: {
					type: "integer"
				},
				title: {
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
				"title",
				"description",
				"modified"
			]
		};
	}

	static relationMappings() {
		return {
			characters: {
				relation: Model.ManyToManyRelation,
				modelClass: `${__dirname}/Character`,
				join: {
					from: 'events.id',
					to: 'characters.id',
					through: {
						from: 'characters_events.event_id',
						to: 'characters_events.character_id'
					}
				}
			}
		}
	}
}

module.exports = Event;

const {Model} = require('objection');
const Database = require('../datasource/MemoryDatabase');

Model.knex(Database.getConnection());

class Story extends Model {
	static get tableName() {
		return 'stories';
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

	static get relationMappings() {
		return {
			characters: {
				relation: Model.ManyToManyRelation,
				modelClass: `${__dirname}/Character`,
				join: {
					from: 'stories.id',
					to: 'characters.id',
					through: {
						from: 'characters_stories.story_id',
						to: 'characters_stories.character_id'
					}
				}
			}
		}
	}
}

module.exports = Story;

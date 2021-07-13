const {Model} = require('objection');
const Database = require('../datasource/MemoryDatabase');

Model.knex(Database.getConnection());

class Comic extends Model {
	static tableName() {
		return 'comics';
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
				issueNumber: {
					type: "integer"
				},
				modified: {
					type: "string"
				}
			},
			"required": [
				"id",
				"title",
				"description",
				"issueNumber",
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
					from: 'comics.id',
					to: 'characters.id',
					through: {
						from: 'characters_comics.comic_id',
						to: 'characters_comics.character_id'
					}
				}
			}
		}
	}
}

module.exports = Comic;

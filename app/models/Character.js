const { Model } = require('objection');
const Database = require('../datasource/MemoryDatabase');

Model.knex(Database.getConnection());

class Character extends Model {
	static get tableName() {
		return 'characters';
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
		}
	}

	static get relationMapping() {
		const Comic = require('./Comic');
		return {
			comics: {
				relation: Model.ManyToManyRelation,
				modelClass: Comic,
				join: {
					from: 'characters.id',
					to: 'comics.id',
					through: {
						from: 'characters_comics.character_id',
						to: 'characters_comics.comic_id'
					}
				}
			}
		}
	}
}

module.exports = Character;

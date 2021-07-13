const { Model } = require('objection');
const Database = require('../datasource/MemoryDatabase');

Model.knex(Database.getConnection());

class Character extends Model {
	static tableName() {
		return 'characters';
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

	static relationMappings() {
		return {
			comics: {
				relation: Model.ManyToManyRelation,
				modelClass: `${__dirname}/Comic`,
				join: {
					from: 'characters.id',
					to: 'comics.id',
					through: {
						from: 'characters_comics.character_id',
						to: 'characters_comics.comic_id'
					}
				}
			},
			events: {
				relation: Model.ManyToManyRelation,
				modelClass: `${__dirname}/Event`,
				join: {
					from: 'characters.id',
					to: 'events.id',
					through: {
						from: 'characters_events.character_id',
						to: 'characters_events.event_id'
					}
				}
			},
			series: {
				relation: Model.ManyToManyRelation,
				modelClass: `${__dirname}/Serie`,
				join: {
					from: 'characters.id',
					to: 'series.id',
					through: {
						from: 'characters_series.character_id',
						to: 'characters_series.serie_id'
					}
				}
			},
			stories: {
				relation: Model.ManyToManyRelation,
				modelClass: `${__dirname}/Story`,
				join: {
					from: 'characters.id',
					to: 'stories.id',
					through: {
						from: 'characters_stories.character_id',
						to: 'characters_stories.story_id'
					}
				}
			}

		}
	}
}

module.exports = Character;

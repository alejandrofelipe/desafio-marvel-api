const {Model} = require('objection');
const Database = require('../datasource/MemoryDatabase');

Model.knex(Database.getConnection());

class Serie extends Model {
	static get tableName() {
		return 'series';
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
				"title",
				"description",
				"startYear",
				"endYear",
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
					from: 'series.id',
					to: 'characters.id',
					through: {
						from: 'characters_series.serie_id',
						to: 'characters_series.character_id'
					}
				}
			}
		}
	}
}

module.exports = Serie;

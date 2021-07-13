// const axios = require('axios');
const request = require('supertest');
const {matchers} = require('jest-json-schema');

const app = require('../app');
const Database = require('../app/datasource/MemoryDatabase');
const {jsonSchema: schemaCharacter} = require('../app/models/Character');
const schemaErrorValidation = require('./schema/validation-error.json');

expect.extend(matchers);

describe(`path => /v1/public/characters/{characterId}`, () => {
	const basePath = '/v1/public/characters';

	beforeAll(async () => {
		await Database.init();
	});

	afterAll(async () => {
		await Database.close();
	});

	it('should return a single character', async () => {
		const characterId = 2;
		const {status, body} = await request(app).get(`${basePath}/${characterId}`);
		expect(status).toBe(200);
		expect(body).toMatchSchema(schemaCharacter)
		expect(body.id).toBe(characterId);
	});

	it('should return a not found error', async () => {
		const characterId = 99999;
		const {status, body} = await request(app).get(`${basePath}/${characterId}`);
		console.log(body);
		expect(status).toBe(404);
		expect(body).toMatchSchema(schemaErrorValidation)
	});

	it('should return error', async () => {
		const characterId = 'ID';
		const {status, body} = await request(app).get(`${basePath}/${characterId}`);
		expect(status).toBe(400);
		expect(body).toMatchSchema(schemaErrorValidation);
	});
})

const request = require('supertest');
const {matchers} = require('jest-json-schema');

const app = require('../app');
const Database = require('../app/datasource/MemoryDatabase');
const {jsonSchema: schemaEvent} = require('../app/models/Event');
const schemaErrorValidation = require('./schema/validation-error.json');

expect.extend(matchers);

describe(`path => /v1/public/characters/{characterId}/events`, () => {
	const basePath = '/v1/public/characters';

	beforeAll(async () => {
		await Database.init();
	});

	afterAll(async () => {
		await Database.close();
	});

	it('should return a list of a character\'s events', async () => {
		const characterId = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/events`);
		expect(status).toEqual(200);
		expect(Array.isArray(body)).toBeTruthy();
		expect(body).toHaveLength(2);
		body.map(co => expect(co).toMatchSchema(schemaEvent));
		expect(body.map(co => co.id)).toEqual([1, 4]);
	});

	it('should return a list of a character\'s events filtered by title', async () => {
		const characterId = 1;
		const title = 'Great Explosion';
		const {status, body} = await request(app).get(`${basePath}/${characterId}/events?title=${title}`);
		expect(status).toEqual(200);
		body.map(c => expect(c.title).toEqual(title))
	});

	it('should return a list of a character\'s events filtered by titleStartsWith', async () => {
		const characterId = 1;
		const titleStartsWith = 'G';
		const {status, body} = await request(app).get(`${basePath}/${characterId}/events?titleStartsWith=${titleStartsWith}`);
		expect(status).toEqual(200);
		expect(body).toHaveLength(2);
		body.map(c => expect(c.title.startsWith(titleStartsWith)).toBeTruthy())
	});

	it('should return error when filtered by empty field', async () => {
		const characterId = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/events?title=&titleStartsWith=`);
		expect(status).toEqual(400);
		expect(body).toMatchSchema(schemaErrorValidation);
		expect(body.errors.map(e => e.param)).toEqual(['title', 'titleStartsWith']);
	});

	it('should return a list of a character\'s events filtered by modifiedSince', async () => {
		const characterId = 1;
		const modified = '2019-02-01';
		const {status, body} = await request(app).get(`${basePath}/${characterId}/events?modifiedSince=${modified}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(1);
		body.map(c => expect(c.modified >= modified).toBeTruthy())
	});

	it('should return a list of one event of a character', async () => {
		const characterId = 1;
		const limit = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/events?limit=${limit}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(limit);
	});

	it('should return a list of a character\'s events with one event skiped', async () => {
		const characterId = 1;
		const offset = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/events?offset=${offset}`);
		expect(status).toBe(200);
		expect(body[0]?.id).toBe(4);
	});
})

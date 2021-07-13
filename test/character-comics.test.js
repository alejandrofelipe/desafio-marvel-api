const request = require('supertest');
const {matchers} = require('jest-json-schema');

const app = require('../app');
const Database = require('../app/datasource/MemoryDatabase');
const {jsonSchema: schemaComic} = require('../app/models/Comic');
const schemaErrorValidation = require('./schema/validation-error.json');

expect.extend(matchers);

describe(`path => /v1/public/characters/{characterId}/comics`, () => {
	const basePath = '/v1/public/characters';

	beforeAll(async () => {
		await Database.init();
	});

	afterAll(async () => {
		await Database.close();
	});

	it('should return a list of a character\'s comics', async () => {
		const characterId = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/comics`);
		expect(status).toEqual(200);
		expect(Array.isArray(body)).toBeTruthy();
		expect(body).toHaveLength(2);
		body.map(co => expect(co).toMatchSchema(schemaComic));
		expect(body.map(co => co.id)).toEqual([1, 4]);
	});

	it('should return a list of a character\'s comics filtered by title', async () => {
		const characterId = 1;
		const title = 'Comic Reunion';
		const {status, body} = await request(app).get(`${basePath}/${characterId}/comics?title=${title}`);
		expect(status).toEqual(200);
		body.map(c => expect(c.title).toEqual(title))
	});

	it('should return a list of a character\'s comics filtered by titleStartsWith', async () => {
		const characterId = 1;
		const titleStartsWith = 'Comic';
		const {status, body} = await request(app).get(`${basePath}/${characterId}/comics?titleStartsWith=${titleStartsWith}`);
		expect(status).toEqual(200);
		body.map(c => expect(c.title.startsWith(titleStartsWith)).toBeTruthy())
	});

	it('should return error when filtered by empty field', async () => {
		const characterId = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/comics?title=&titleStartsWith=`);
		expect(status).toEqual(400);
		expect(body).toMatchSchema(schemaErrorValidation);
		expect(body.errors.map(e => e.param)).toEqual(['title', 'titleStartsWith']);
	});

	it('should return a list of a character\'s comics filtered by modifiedSince', async () => {
		const characterId = 1;
		const modified = '2021-04-01';
		const {status, body} = await request(app).get(`${basePath}/${characterId}/comics?modifiedSince=${modified}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(1);
		body.map(c => expect(c.modified >= modified).toBeTruthy())
	});

	it('should return a list of one comic of a character', async () => {
		const characterId = 1;
		const limit = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/comics?limit=${limit}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(limit);
	});

	it('should return a list of a character\'s comics with one comic skiped', async () => {
		const characterId = 1;
		const offset = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/comics?offset=${offset}`);
		expect(status).toBe(200);
		expect(body[0]?.id).toBe(4);
	});
})

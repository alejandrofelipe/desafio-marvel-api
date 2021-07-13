const request = require('supertest');
const {matchers} = require('jest-json-schema');

const app = require('../app');
const Database = require('../app/datasource/MemoryDatabase');
const {jsonSchema: schemaSerie} = require('../app/models/Serie');
const schemaErrorValidation = require('./schema/validation-error.json');

expect.extend(matchers);

describe(`path => /v1/public/characters/{characterId}/series`, () => {
	const basePath = '/v1/public/characters';

	beforeAll(async () => {
		await Database.init();
	});

	afterAll(async () => {
		await Database.close();
	});

	it('should return a list of a character\'s series', async () => {
		const characterId = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/series`);
		expect(status).toEqual(200);
		expect(Array.isArray(body)).toBeTruthy();
		expect(body).toHaveLength(2);
		body.map(co => expect(co).toMatchSchema(schemaSerie));
		expect(body.map(co => co.id)).toEqual([1, 2]);
	});

	it('should return a list of a character\'s series filtered by title', async () => {
		const characterId = 1;
		const title = 'Great Explosion';
		const {status, body} = await request(app).get(`${basePath}/${characterId}/series?title=${title}`);
		expect(status).toEqual(200);
		body.map(c => expect(c.title).toEqual(title))
	});

	it('should return a list of a character\'s series filtered by titleStartsWith', async () => {
		const characterId = 3;
		const titleStartsWith = 'I';
		const {status, body} = await request(app).get(`${basePath}/${characterId}/series?titleStartsWith=${titleStartsWith}`);
		expect(status).toEqual(200);
		expect(body).toHaveLength(1);
		body.map(c => expect(c.title.startsWith(titleStartsWith)).toBeTruthy())
	});

	it('should return a list of a character\'s series filtered by startYear', async () => {
		const characterId = 1;
		const startYear = 2015;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/series?startYear=${startYear}`);
		expect(status).toEqual(200);
		body.map(c => expect(c.startYear).toEqual(startYear))
	});

	it('should return a list of a character\'s series filtered by endYear', async () => {
		const characterId = 1;
		const endYear = 2020;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/series?endYear=${endYear}`);
		expect(status).toEqual(200);
		body.map(c => expect(c.endYear).toEqual(endYear))
	});

	it('should return error when filtered by empty field', async () => {
		const characterId = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/series?title=&titleStartsWith=`);
		expect(status).toEqual(400);
		expect(body).toMatchSchema(schemaErrorValidation);
		expect(body.errors).toHaveLength(2);
		expect(body.errors.map(e => e.param)).toEqual(['title', 'titleStartsWith']);
	});

	it('should return a list of a character\'s series filtered by modifiedSince', async () => {
		const characterId = 1;
		const modified = '2019-02-01';
		const {status, body} = await request(app).get(`${basePath}/${characterId}/series?modifiedSince=${modified}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(1);
		body.map(c => expect(c.modified >= modified).toBeTruthy())
	});

	it('should return a list of one serie of a character', async () => {
		const characterId = 1;
		const limit = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/series?limit=${limit}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(limit);
	});

	it('should return a list of a character\'s series with one serie skiped', async () => {
		const characterId = 1;
		const offset = 1;
		const {status, body} = await request(app).get(`${basePath}/${characterId}/series?offset=${offset}`);
		expect(status).toBe(200);
		expect(body[0]?.id).toBe(2);
	});
})

const request = require('supertest');
const {matchers} = require('jest-json-schema');

const app = require('../app');
const Database = require('../app/datasource/MemoryDatabase');
const {jsonSchema: schemaCharacter} = require('../app/models/Character');
const schemaErrorValidation = require('./schema/validation-error.json');

expect.extend(matchers);

describe(`path => /v1/public/characters`, () => {
	const basePath = '/v1/public/characters';

	beforeAll(async () => {
		await Database.init();
	});

	afterAll(async () => {
		await Database.close();
	});

	it('should return a list of characters', async () => {
		const {status, body} = await request(app).get(basePath);
		expect(status).toBe(200);
		expect(Array.isArray(body)).toBeTruthy();
		expect(body).toHaveLength(4);
		body.map(char => expect(char).toMatchSchema(schemaCharacter));
	});

	it('should return a list of characters filtered by name', async () => {
		const name = 'Mega';
		const {status, body} = await request(app).get(`${basePath}?name=${name}`);
		expect(status).toBe(200);
		expect(Array.isArray(body)).toBeTruthy();
		expect(body).toHaveLength(1);
		body.map(c => expect(c.name).toBe(name))
	});

	it('should return a list of characters filtered by nameStartsWith', async () => {
		const name = 'Meg';
		const {status, body} = await request(app).get(`${basePath}?nameStartsWith=${name}`);
		expect(status).toBe(200);
		expect(Array.isArray(body)).toBeTruthy();
		expect(body).toHaveLength(2);
		body.map(c => expect(c.name.startsWith(name)).toBeTruthy())
	});

	it('should return error when filtered by empty field', async () => {
		const {status, body} = await request(app).get(`${basePath}?name=&nameStartsWith=`);
		expect(status).toBe(400);
		expect(body).toMatchSchema(schemaErrorValidation);
		expect(body.errors.map(e => e.param)).toEqual(['name', 'nameStartsWith']);
	})

	it('should return a list of characters filtered by modifiedSince', async () => {
		const modified = '2021-04-01';
		const {status, body} = await request(app).get(`${basePath}?modifiedSince=${modified}`);
		expect(status).toBe(200);
		body.map(c => expect(c.modified >= modified).toBe(true))
	});

	it('should return a list of characters filtered by comics', async () => {
		const comicIds = '2';
		const {status, body} = await request(app).get(`${basePath}?comics=${comicIds}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(1);
		expect(body[0].id).toEqual(2);
	});

	it('should return a list of characters filtered by multiple comics', async () => {
		const comicIds = '2;1';
		const {status, body} = await request(app).get(`${basePath}?comics=${comicIds}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(2);
		expect(body.map(char => char.id)).toEqual([1, 2]);
	});

	it('should return a list of characters filtered by series', async () => {
		const seriesIds = '2';
		const {status, body} = await request(app).get(`${basePath}?series=${seriesIds}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(3);
		expect(body.map(char => char.id)).toEqual([1, 2, 3]);
	});

	it('should return a list of characters filtered by multiple series', async () => {
		const seriesIds = '2;1';
		const {status, body} = await request(app).get(`${basePath}?series=${seriesIds}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(3);
	});

	it('should return a list of characters filtered by events', async () => {
		const eventsIds = '2';
		const {status, body} = await request(app).get(`${basePath}?events=${eventsIds}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(1);
	});

	it('should return a list of characters filtered by multiple events', async () => {
		const eventsIds = '2;1';
		const {status, body} = await request(app).get(`${basePath}?events=${eventsIds}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(2);
	});

	it('should return a list of characters filtered by stories', async () => {
		const storiesIds = '2';
		const {status, body} = await request(app).get(`${basePath}?stories=${storiesIds}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(1);
	});

	it('should return a list of characters filtered by multiple stories', async () => {
		const storiesIds = '2;1';
		const {status, body} = await request(app).get(`${basePath}?stories=${storiesIds}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(2);
	});

	it('should return a list of characters ordered by name', async () => {
		const order = 'name';
		let res = await request(app).get(`${basePath}?orderBy=${order}`);
		expect(res.status).toBe(200);
		const orderedASC = res.body.slice(1)
			.every((char, idx) => res.body[idx].name <= char.name);
		expect(orderedASC).toBe(true);

		res = await request(app).get(`${basePath}?orderBy=-${order}`);
		expect(res.status).toBe(200);
		const orderedDESC = res.body.slice(1)
			.every((char, idx) => res.body[idx].name >= char.name);
		expect(orderedDESC).toBe(true);
	});

	it('should return a list of two characters', async () => {
		const limit = 2;
		let {body, status} = await request(app).get(`${basePath}?limit=${limit}`);
		expect(status).toBe(200);
		expect(body).toHaveLength(limit);
	});

	it('should return a list of characters with two characters skiped', async () => {
		const offset = 2;
		let {body, status} = await request(app).get(`${basePath}?offset=${offset}`);
		expect(status).toBe(200);
		expect(body[0]?.id).toBe(3);
	});
});

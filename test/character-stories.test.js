const axios = require('axios');
const {matchers} = require('jest-json-schema');

const server = require('../app/server');
const {jsonSchema: schemaStory} = require('../app/models/Story');
const schemaErrorValidation = require('./schema/validation-error.json');

expect.extend(matchers);

const apiPath = '/v1/public/characters';
const url_base = `http://${server.host}:${server.port}`;
const axiosInstance = axios.create({
	baseURL: `${url_base}${apiPath}`,
	validateStatus: null
})

describe(`path => /v1/public/characters/{characterId}/stories`, () => {
	beforeAll(async () => {
		return await server.start();
	});

	afterAll(() => {
		server.close();
	});

	it('should return a list of a character\'s stories', async () => {
		const {data, status} = await axiosInstance.get('/1/stories');
		expect(status).toBe(200);
		expect(Array.isArray(data)).toBe(true);
		data.map(c => expect(c).toMatchSchema(schemaStory));
	});

	it('should return a list of a character\'s stories filtered by name', async () => {
		const name = 'Mega';
		const {data, status} = await axiosInstance.get(`/1/stories?name=${name}`);
		expect(status).toBe(200);
		data.map(c => expect(c.name).toBe(name))
	});

	it('should return error when filtered by empty field', async () => {
		const {data, status} = await axiosInstance.get(`/1/stories?name=&nameStartsWith=`);
		expect(status).toBe(400);
		expect(data).toMatchSchema(schemaErrorValidation);
		expect(data.errors.map(e => e.param)).toEqual(['name', 'nameStartsWith']);
	});

	it('should return a list of a character\'s stories filtered by modifiedSince', async () => {
		const modified = '2021-04-01';
		const {data, status} = await axiosInstance.get(`/1/stories?modifiedSince=${modified}`);
		expect(status).toBe(200);
		data.map(c => expect(c.modified >= modified).toBe(true))
	});

	it('should return a list of one story of a character', async () => {
		const limit = 1;
		let {data, status} = await axiosInstance.get(`/1/stories?limit=${limit}`);
		expect(status).toBe(200);
		expect(data.length).toBe(limit);
	});

	it('should return a list of a character\'s stories with one story skiped', async () => {
		const offset = 1;
		let {data, status} = await axiosInstance.get(`/1/stories?offset=${offset}`);
		expect(status).toBe(200);
		expect(data[0]?.id).toBe(4);
	});
})

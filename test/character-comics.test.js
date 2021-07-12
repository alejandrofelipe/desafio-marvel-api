const axios = require('axios');
const {matchers} = require('jest-json-schema');

const server = require('../app/server');
const schemaComic = require('./schema/comic.json');
const schemaErrorValidation = require('./schema/validation-error.json');

expect.extend(matchers);

const apiPath = '/v1/public/characters';
const url_base = `http://${server.host}:${server.port}`;
const axiosInstance = axios.create({
	baseURL: `${url_base}${apiPath}`,
	validateStatus: null
})

describe(`path => /v1/public/characters/{characterId}/comics`, () => {
	beforeAll(async () => {
		return await server.start();
	});

	afterAll(() => {
		server.close();
	});

	it('should return a list of a character\'s comics', async () => {
		const {data, status} = await axiosInstance.get('/1/comics');
		expect(status).toBe(200);
		expect(Array.isArray(data)).toBe(true);
		data.map(c => expect(c).toMatchSchema(schemaComic));
	});

	it('should return a list of a character\'s comics filtered by name', async () => {
		const name = 'Mega';
		const {data, status} = await axiosInstance.get(`/1/comics?name=${name}`);
		expect(status).toBe(200);
		data.map(c => expect(c.name).toBe(name))
	});

	it('should return error when filtered by empty field', async () => {
		const {data, status} = await axiosInstance.get(`/1/comics?name=&nameStartsWith=`);
		expect(status).toBe(400);
		expect(data).toMatchSchema(schemaErrorValidation);
		expect(data.errors.map(e => e.param)).toEqual(['name', 'nameStartsWith']);
	});

	it('should return a list of a character\'s comics filtered by modifiedSince', async () => {
		const modified = '2021-04-01';
		const {data, status} = await axiosInstance.get(`/1/comics?modifiedSince=${modified}`);
		expect(status).toBe(200);
		data.map(c => expect(c.modified >= modified).toBe(true))
	});

	it('should return a list of one comic of a character', async () => {
		const limit = 1;
		let {data, status} = await axiosInstance.get(`/1/comics?limit=${limit}`);
		expect(status).toBe(200);
		expect(data.length).toBe(limit);
	});

	it('should return a list of a character\'s comics with one comic skiped', async () => {
		const offset = 1;
		let {data, status} = await axiosInstance.get(`/1/comics?offset=${offset}`);
		expect(status).toBe(200);
		expect(data[0]?.id).toBe(4);
	});
})

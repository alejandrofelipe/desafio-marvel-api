const axios = require('axios');
const {matchers} = require('jest-json-schema');

const server = require('../app/server');
const {jsonSchema: schemaSerie} = require('../app/models/Serie');
const schemaErrorValidation = require('./schema/validation-error.json');

expect.extend(matchers);

const apiPath = '/v1/public/characters';
const url_base = `http://${server.host}:${server.port}`;
const axiosInstance = axios.create({
	baseURL: `${url_base}${apiPath}`,
	validateStatus: null
})

describe(`path => /v1/public/characters/{characterId}/series`, () => {
	beforeAll(async () => {
		return await server.start();
	});

	afterAll(() => {
		server.close();
	});

	it('should return a list of a character\'s series', async () => {
		const {data, status} = await axiosInstance.get('/1/series');
		expect(status).toBe(200);
		expect(Array.isArray(data)).toBe(true);
		data.map(c => expect(c).toMatchSchema(schemaSerie));
	});

	it('should return a list of a character\'s series filtered by name', async () => {
		const name = 'Mega';
		const {data, status} = await axiosInstance.get(`/1/series?name=${name}`);
		expect(status).toBe(200);
		data.map(s => expect(s.name).toBe(name))
	});

	it('should return error when filtered by empty field', async () => {
		const {data, status} = await axiosInstance.get(`/1/series?name=&nameStartsWith=`);
		expect(status).toBe(400);
		expect(data).toMatchSchema(schemaErrorValidation);
		expect(data.errors.map(e => e.param)).toEqual(['name', 'nameStartsWith']);
	});

	it('should return a list of a character\'s series filtered by modifiedSince', async () => {
		const modified = '2021-04-01';
		const {data, status} = await axiosInstance.get(`/1/series?modifiedSince=${modified}`);
		expect(status).toBe(200);
		data.map(s => expect(s.modified >= modified).toBe(true))
	});

	it('should return a list of a character\'s series filtered by startYear', async () => {
		const startYear = 2022;
		const {data, status} = await axiosInstance.get(`/1/series?startYear=${startYear}`);
		expect(status).toBe(200);
		data.map(s => expect(s.startYear).toEqual(startYear))
	});

	it('should return a list of one serie of a character', async () => {
		const limit = 1;
		let {data, status} = await axiosInstance.get(`/1/series?limit=${limit}`);
		expect(status).toBe(200);
		expect(data.length).toBe(limit);
	});

	it('should return a list of a character\'s series with one serie skiped', async () => {
		const offset = 1;
		let {data, status} = await axiosInstance.get(`/1/series?offset=${offset}`);
		expect(status).toBe(200);
		expect(data[0]?.id).toBe(4);
	});
})

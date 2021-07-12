const axios = require('axios');
const {matchers} = require('jest-json-schema');

const server = require('../app/server');
const {jsonSchema: schemaCharacter} = require('../app/models/Character');
const schemaErrorValidation = require('./schema/validation-error.json');

expect.extend(matchers);

const apiPath = '/v1/public/characters';
const url_base = `http://${server.host}:${server.port}`;
const axiosInstance = axios.create({
	baseURL: `${url_base}${apiPath}`,
	validateStatus: null
})

describe(`path => /v1/public/characters/{characterId}`, () => {

	beforeAll(async () => {
		return await server.start();
	});

	afterAll(() => {
		server.close();
	});

	it('should return a single character', async () => {
		const id = 2;
		const {data, status} = await axiosInstance.get(`${url_base}${apiPath}/${id}`);
		expect(status).toBe(200);
		expect(data).toMatchSchema(schemaCharacter)
		expect(data.id).toBe(id);
	});

	it('should return error', async () => {
		const id = 'ID';
		const {data, status} = await axiosInstance.get(`${url_base}${apiPath}/${id}`);
		expect(status).toBe(400);
		expect(data).toMatchSchema(schemaErrorValidation);
	});
})

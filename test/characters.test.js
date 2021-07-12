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

describe(`path => /v1/public/characters`, () => {
	beforeAll(async () => {
		return await server.start();
	});

	afterAll(() => {
		server.close();
	});

	it('should return a list of characters', async () => {
		const {data, status} = await axiosInstance.get('');
		expect(status).toBe(200);
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBe(3);
		data.map(c => expect(c).toMatchSchema(schemaCharacter));
	});

	it('should return a list of characters filtered by name', async () => {
		const name = 'Mega';
		const {data, status} = await axiosInstance.get(`?name=${name}`);
		expect(status).toBe(200);
		data.map(c => expect(c.name).toBe(name))
	});

	it('should return error when filtered by empty field', async () => {
		const {data, status} = await axiosInstance.get(`?name=&nameStartsWith=`);
		expect(status).toBe(400);
		expect(data).toMatchSchema(schemaErrorValidation);
		expect(data.errors.map(e => e.param)).toEqual(['name', 'nameStartsWith']);
	})

	it('should return a list of characters filtered by nameStartsWith', async () => {
		const name = 'Meg';
		const {data, status} = await axiosInstance.get(`?nameStartsWith=${name}`);
		expect(status).toBe(200);
		data.map(c => expect(c.name.startsWith(name)).toBe(true))
	});

	it('should return a list of characters filtered by modifiedSince', async () => {
		const modified = '2021-04-01';
		const {data, status} = await axiosInstance.get(`?modifiedSince=${modified}`);
		expect(status).toBe(200);
		data.map(c => expect(c.modified >= modified).toBe(true))
	});

	it('should return a list of characters filtered by comics', async () => {
		const comics = '2';
		const {data, status} = await axiosInstance.get(`?comics=${comics}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.comics?.length > 0).toBe(true))
	});

	it('should return a list of characters filtered by multiple comics', async () => {
		const comics = '2;1';
		const {data, status} = await axiosInstance.get(`?comics=${comics}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.comics?.length > 0).toBe(true))
	});

	it('should return a list of characters filtered by series', async () => {
		const series = '2';
		const {data, status} = await axiosInstance.get(`?series=${series}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.series?.length > 0).toBe(true))
	});

	it('should return a list of characters filtered by multiple series', async () => {
		const series = '2;1';
		const {data, status} = await axiosInstance.get(`?series=${series}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.series?.length > 0).toBe(true))
	});

	it('should return a list of characters filtered by events', async () => {
		const events = '2';
		const {data, status} = await axiosInstance.get(`?events=${events}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.events?.length > 0).toBe(true))
	});

	it('should return a list of characters filtered by multiple events', async () => {
		const events = '2;1';
		const {data, status} = await axiosInstance.get(`?events=${events}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.events?.length > 0).toBe(true))
	});

	it('should return a list of characters filtered by stories', async () => {
		const stories = '2';
		const {data, status} = await axiosInstance.get(`?stories=${stories}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.stories?.length > 0).toBe(true))
	});

	it('should return a list of characters filtered by multiple stories', async () => {
		const stories = '2;1';
		const {data, status} = await axiosInstance.get(`?stories=${stories}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.stories?.length > 0).toBe(true))
	});

	it('should return a list of characters ordered by name', async () => {
		const order = 'name';
		let res = await axiosInstance.get(`?orderBy=${order}`);
		expect(res.status).toBe(200);
		const orderedASC = res.data.slice(1).every((char, idx) =>
			res.data[idx].name <= char.name);
		expect(orderedASC).toBe(true);

		res = await axiosInstance.get(`?orderBy=-${order}`);
		expect(res.status).toBe(200);
		const orderedDESC = res.data.slice(1).every((char, idx) =>
			res.data[idx].name >= char.name);
		expect(orderedDESC).toBe(true);
	});

	it('should return a list of two characters', async () => {
		const limit = 2;
		let {data, status} = await axiosInstance.get(`?limit=${limit}`);
		expect(status).toBe(200);
		expect(data.length).toBe(limit);
	});

	it('should return a list of characters with two characters skiped', async () => {
		const offset = 2;
		let {data, status} = await axiosInstance.get(`?offset=${offset}`);
		expect(status).toBe(200);
		expect(data[0]?.id).toBe(3);
	});
});

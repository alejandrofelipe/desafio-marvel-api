const axios = require('axios');
const {matchers} = require('jest-json-schema');

const server = require('../app/server');
const schemaCharacter = require('./schema/character.json');

expect.extend(matchers);

const apiPath = '/v1/public/characters';

describe(`path => ${apiPath}`, () => {
	const url_base = `http://${server.host}:${server.port}`;

	beforeAll(async () => {
		return await server.start();
	})

	it('Should return a list of characters', async () => {
		const {data, status} = await axios.get(`${url_base}/v1/public/characters`);
		expect(status).toBe(200);
		expect(Array.isArray(data)).toBe(true);
		data.map(c => expect(c).toMatchSchema(schemaCharacter));
	});

	it('Should return a list of characters filtered by name', async () => {
		const name = 'Mega';
		const {data, status} = await axios.get(`${url_base}${apiPath}?name=${name}`);
		expect(status).toBe(200);
		data.map(c => expect(c.name).toBe(name))
	});

	it('Should return a list of characters filtered by nameStartsWith', async () => {
		const name = 'Meg';
		const {data, status} = await axios.get(`${url_base}${apiPath}?nameStartsWith=${name}`);
		expect(status).toBe(200);
		data.map(c => expect(c.name.startsWith(name)).toBe(true))
	});

	it('Should return a list of characters filtered by modifiedSince', async () => {
		const modified = '2021-04-01';
		const {data, status} = await axios.get(`${url_base}${apiPath}?modifiedSince=${modified}`);
		expect(status).toBe(200);
		data.map(c => expect(c.modified >= modified).toBe(true))
	});

	it('Should return a list of characters filtered by comics', async () => {
		const comics = '2';
		const {data, status} = await axios.get(`${url_base}${apiPath}?comics=${comics}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.comics?.length > 0).toBe(true))
	});

	it('Should return a list of characters filtered by multiple comics', async () => {
		const comics = '2;1';
		const {data, status} = await axios.get(`${url_base}${apiPath}?comics=${comics}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.comics?.length > 0).toBe(true))
	});

	it('Should return a list of characters filtered by series', async () => {
		const series = '2';
		const {data, status} = await axios.get(`${url_base}${apiPath}?series=${series}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.series?.length > 0).toBe(true))
	});

	it('Should return a list of characters filtered by multiple series', async () => {
		const series = '2;1';
		const {data, status} = await axios.get(`${url_base}${apiPath}?series=${series}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.series?.length > 0).toBe(true))
	});

	it('Should return a list of characters filtered by events', async () => {
		const events = '2';
		const {data, status} = await axios.get(`${url_base}${apiPath}?events=${events}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.events?.length > 0).toBe(true))
	});

	it('Should return a list of characters filtered by multiple events', async () => {
		const events = '2;1';
		const {data, status} = await axios.get(`${url_base}${apiPath}?events=${events}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.events?.length > 0).toBe(true))
	});

	it('Should return a list of characters filtered by stories', async () => {
		const stories = '2';
		const {data, status} = await axios.get(`${url_base}${apiPath}?stories=${stories}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.stories?.length > 0).toBe(true))
	});

	it('Should return a list of characters filtered by multiple stories', async () => {
		const stories = '2;1';
		const {data, status} = await axios.get(`${url_base}${apiPath}?stories=${stories}`);
		expect(status).toBe(200);
		data.map(c => expect(c?.stories?.length > 0).toBe(true))
	});

	it('Should return a list of characters ordered by name', async () => {
		const order = 'name';
		let res = await axios.get(`${url_base}${apiPath}?orderBy=${order}`);
		expect(res.status).toBe(200);
		const orderedASC = res.data.slice(1).every((char, idx) => data[idx].name <= char.name);
		expect(orderedASC).toBe(true);

		res = await axios.get(`${url_base}${apiPath}?orderBy=-${order}`);
		expect(res.status).toBe(200);
		const orderedDESC = res.data.slice(1).every((char, idx) => data[idx].name >= char.name);
		expect(orderedDESC).toBe(true);
	});

	it('Should return a list of two characters', async () => {
		const limit = 2;
		let {data, status} = await axios.get(`${url_base}${apiPath}?limit=${limit}`);
		expect(status).toBe(200);
		expect(data.length).toBe(2);
	});

	it('Should return a list of characters with two characters skiped', async () => {
		const offset = 2;
		let {data, status} = await axios.get(`${url_base}${apiPath}?offset=${offset}`);
		expect(status).toBe(200);
		expect(data[0]?.id).toBe(3);
	});


	afterAll(() => {
		process.exit(0);
	});
});

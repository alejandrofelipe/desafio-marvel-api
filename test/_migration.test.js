const MemoryDatabase = require('../app/datasource/MemoryDatabase');

describe('Migração', () => {
	const conn = MemoryDatabase.getConnection();
	it('Incialmente não deve possuir tabelas', async () => {
		const tables = await conn.raw(`SELECT name FROM sqlite_master 
            WHERE type ='table' AND  name NOT LIKE 'sqlite_%';`);
		expect(tables?.length).toBe(0);
	});

	it('Deve criar todas as tabelas.', async () => {
		const expected = ['characters', 'comics', 'events', 'series', 'stories'];
		await conn.migrate.latest();
		const tables = await conn.raw(`SELECT name FROM sqlite_master 
            WHERE type ='table' AND  name NOT LIKE 'sqlite_%';`);

		expect(tables?.length).not.toBe(0);
		expect(tables.map(i => i.name))
			.toEqual(expect.arrayContaining(expected))
	});

	it('Deve inserir dados iniciais na tabela', async () => {
		await conn.seed.run();
		const chars = await conn.select('*').from('characters');
		expect(chars).not.toBe(0);
	})

	afterAll(() => {
		conn.destroy();
	});
});

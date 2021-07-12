const Database = require('../app/datasource/MemoryDatabase');
const Character = require('../app/models/Character');

describe('Migração', () => {
	it('Incialmente não deve possuir tabelas', async () => {
		const tables = await Database.getConnection().raw(`SELECT name FROM sqlite_master 
            WHERE type ='table' AND  name NOT LIKE 'sqlite_%';`);
		expect(tables?.length).toBe(0);
	});

	it('Deve criar todas as tabelas.', async () => {
		const expected = ['characters', 'comics', 'events', 'series', 'stories'];
		await Database.getConnection().migrate.latest();
		const tables = await Database.getConnection().raw(`SELECT name FROM sqlite_master 
            WHERE type ='table' AND  name NOT LIKE 'sqlite_%';`);

		expect(tables?.length).not.toBe(0);
		expect(tables.map(i => i.name))
			.toEqual(expect.arrayContaining(expected))
	});

	it('Deve inserir dados iniciais na tabela', async () => {
		await Database.getConnection().seed.run();
		const chars = await Character.query();
		expect(chars.length).toBe(3);

	})

	afterAll(() => {
		Database.getConnection().destroy();
	});
});

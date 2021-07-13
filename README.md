# Marvel - Backed (Desafio)

## Como Executar

- Baixe o repositório.
- Acesse a pasta deste repositório e execute ``npm i`` ou ``yarn``.
- Após todas as dependencias terem sido baixadas execute:
  - ``npm run start`` ou ``yarn run start`` para executar o servidor.
  - ``npm run test`` ou ``yarn run test`` para executar os testes.

## Especificações

- Banco de dados Sqlite3 + Knex (em memória).
  - Para este caso não será nescessário executar script de inicialização.
  - O esqueleto do banco está em ``./migrations`` e os dados iniciais estão em ``./seeds``.
    - Os modelos from criados com auxílio do ``Objection.js``.
- Testes em Jest
  - Com auxílio do módulo ``Supertest`` para fazer requisições na api.

## API

### Character

````json5
{
  id: 1,
  name: 'Super',
  description: 'S',
  modified: '2021-03-01'
}
````

- /v1/public/characters
  - Character[]
- /v1/public/characters/:characterId
  - Character

### Comic

````json5
{
  id: 1,
  title: 'Comic Super',
  description: 'Comic S',
  issueNumber: 10,
  modified: '2021-03-01'
}
````

- /v1/public/characters/:characterId/comics
  - Comic[]

### Serie

````json5
{
  id: 1,
  title: 'Introduction',
  description: 'Series I',
  startYear: 2015,
  endYear: 2017,
  modified: '2017-03-01'
}
````

- /v1/public/characters/:characterId/series
  - Serie[]

### Story

````json5
{
  id: 1,
  title: 'Great Explosion',
  description: 'A Great Explosion',
  modified: '2021-03-01'
}
````

- /v1/public/characters/:characterId/stories
  - Story[]

### Event -> /v1/public/characters/:characterId/

````json5
{
  id: 1,
  title: 'Avoid The Great Explosion',
  description: 'A Great Explosion',
  modified: '2015-03-01'
}
````

- /v1/public/characters/:characterId/events
  - Event[]

### Errors

````json5
{
  "success": false,
  "message": 'Error',
  "data": null,
  "errors": [
    {
      "value": "15",
      "msg": "Invalid value",
      "param": "name",
      "location": ""
    }
  ]
}
````

## Autor

Alejandro Felipe Silva

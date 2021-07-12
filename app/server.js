const http = require('http');
const express = require('express');

const routes = require('./routes')
const MemoryDatabase = require('./datasource/MemoryDatabase');

const host = 'localhost';
const port = 3000;

const app = express();
routes(app);

const server = http.createServer(app);

module.exports = {
    host,
    port,
    async start() {
        await MemoryDatabase.init();
        return server.listen(port, host, () =>
            console.log(`Servidor rodando em http://localhost:${port}`))
    },
    async close() {
        server.close()
        await MemoryDatabase.close();
    }
}

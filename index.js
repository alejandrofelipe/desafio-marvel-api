const server = require('./app/server');


server
    .start()
    .catch(e => console.log(`Erro: ${e?.message || e}`));

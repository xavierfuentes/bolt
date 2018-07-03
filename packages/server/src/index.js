const Hapi = require('hapi');

// const companiesApi = require('./modules/companies');

// Create a server with a host and port
const server = Hapi.server({
  host: '0.0.0.0',
  port: process.env.PORT || 3000,
});

// Start the server
const init = async () => {
  // await server.register(companiesApi);
  await server.start();
  return server;
};

init()
  .then(initialisedServer => {
    console.log('Server running at:', initialisedServer.info.uri);
  })
  .catch(err => {
    console.log(err);
  });

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

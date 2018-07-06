const Hapi = require('hapi');
const mongoose = require('mongoose');

// const companiesApi = require('./modules/companies');
const profileApi = require('./modules/profile');

// Start the server
const init = async () => {
  // Create a server with a host and port
  const server = Hapi.server({ host: '0.0.0.0', port: process.env.PORT || 3000 });

  await mongoose.connect('mongodb://tab:Sp1tf1r3!@tab-edr-mongo/edr');
  console.log('✔ Connected to DB');

  // await server.register(companiesApi);
  await server.register(profileApi);
  console.log('✔ APIs connected');

  await server.start();
  return server;
};

init()
  .then(initialisedServer => {
    console.log('✔ Server running at:', initialisedServer.info.uri);
  })
  .catch(err => {
    console.log(err);
  });

process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

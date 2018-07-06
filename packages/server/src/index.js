const Hapi = require('hapi');
const mongoose = require('mongoose');

const userModule = require('./modules/user');

// Start the server
const init = async () => {
  // Create a server with a host and port
  const server = Hapi.server({ host: '0.0.0.0', port: process.env.PORT || 3000 });

  await mongoose.connect(
    'mongodb://bolt:Fa5t35t!@bolt-mongo:27017/bolt',
    { useNewUrlParser: true }
  );
  console.log('✔ Connected to DB');

  await server.register(userModule);
  console.log('✔ Modules registered');

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

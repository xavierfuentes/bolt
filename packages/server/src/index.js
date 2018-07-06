const Hapi = require('hapi');
const mongoose = require('mongoose');

const businessProfileApi = require('./modules/businessProfile');
const userApi = require('./modules/user');

// Start the server
const init = async () => {
  // Create a server with a host and port
  const server = Hapi.server({ host: '0.0.0.0', port: process.env.PORT || 3000 });

  await mongoose.connect(
    'mongodb://tab:Sp1tf1r3!@tab-edr-mongo:27017/edr',
    { useNewUrlParser: true }
  );
  console.log('✔ Connected to DB');

  await server.register(businessProfileApi);
  await server.register(userApi);
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

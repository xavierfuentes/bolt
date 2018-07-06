const userController = require('./controller');

const userModule = {
  name: 'userModule',
  register: async server => {
    server.route([
      {
        method: 'POST',
        path: '/me',
        handler: userController.get,
      },
    ]);
  },
};

module.exports = userModule;

const UserController = require('./controller');

const userApi = {
  name: 'userApi',
  register: async server => {
    server.route([
      {
        method: 'POST',
        path: '/me',
        handler: UserController.get,
      },
    ]);
  },
};

module.exports = userApi;

const BusinessProfileController = require('./controller');

const businessProfileApi = {
  name: 'businessProfileApi',
  register: async server => {
    server.route([
      {
        method: 'GET',
        path: '/company/{registrationNumber}',
        handler: BusinessProfileController.get,
      },
    ]);
  },
};

module.exports = businessProfileApi;

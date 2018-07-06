const ProfileController = require('../controllers/profile');

const profileApi = {
  name: 'profileApi',
  register: async server => {
    server.route([
      {
        method: 'GET',
        path: '/company/{companyNumber}',
        handler: ProfileController.get,
      },
    ]);
  },
};

module.exports = profileApi;

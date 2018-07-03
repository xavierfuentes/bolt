const fetchCompanyHandler = require('./fetchCompany');
const searchCompaniesHandler = require('./searchCompanies');

const companiesApi = {
  name: 'CompaniesApi',
  register: async server => {
    server.route([
      {
        method: 'GET',
        path: '/company/{companyNumber}',
        handler: fetchCompanyHandler,
      },
      {
        method: 'GET',
        path: '/search/companies',
        handler: searchCompaniesHandler,
      },
    ]);
  },
};

module.exports = companiesApi;

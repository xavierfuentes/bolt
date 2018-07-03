const companiesHouseService = require('../../services/companiesHouse');

const searchCompaniesHandler = async request =>
  companiesHouseService.searchForCompanies({ query: request.query.query }).then(({ data }) => data);

module.exports = searchCompaniesHandler;

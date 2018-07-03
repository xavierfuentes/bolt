const axios = require('axios');

// todo move to .env file
const apiKey = 'Y38eajScB0cT55FlDo-9esuGLxnCYDGp1JtxtZ7l';
const baseUrl = 'https://api.companieshouse.gov.uk';

// TODO: move to a separate package
// TODO: document
const requiredParamAsync = paramName =>
  new Promise((resolve, reject) => {
    reject(new Error(`The parameter "${paramName}" is required and not empty nor null`));
  });

const get = ({ apiKey, url, query } = {}) => {
  if (!apiKey) {
    requiredParamAsync('apiKey');
  }

  if (!url) {
    requiredParamAsync('url');
  }

  let requestConfig = { auth: { username: apiKey, password: '' } };

  if (query) {
    requestConfig = { ...requestConfig, params: { q: query } };
  }

  return axios.get(`${baseUrl}${url}`, requestConfig).then(r => r.data);
};

// Profile
const fetchCompany = ({ companyNumber }) =>
  Promise.all([
    fetchCompanyProfile({ companyNumber }),
    fetchCompanyAddress({ companyNumber }),
    fetchCompanyOfficers({ companyNumber }),
  ]).then(([profile, address, officers]) => ({ profile, address, officers }));
const fetchCompanyProfile = ({ companyNumber } = {}) =>
  !companyNumber
    ? requiredParamAsync('companyNumber')
    : get({ apiKey, url: `/company/${companyNumber}` });
const fetchCompanyAddress = ({ companyNumber } = {}) =>
  !companyNumber
    ? requiredParamAsync('companyNumber')
    : get({ apiKey, url: `/company/${companyNumber}/registered-office-address` });
const fetchCompanyOfficers = ({ companyNumber } = {}) =>
  !companyNumber
    ? requiredParamAsync('companyNumber')
    : get({ apiKey, url: `/company/${companyNumber}/officers` }).then(r => r.items); // todo: check whether there are more items

// Search
const searchAll = ({ query } = {}) =>
  !query ? requiredParamAsync('companyNumber') : get({ apiKey, url: '/search', query });
const searchForCompanies = ({ query } = {}) =>
  !query ? requiredParamAsync('companyNumber') : get({ apiKey, url: '/search/companies', query });
const searchForOfficers = ({ query } = {}) =>
  !query ? requiredParamAsync('companyNumber') : get({ apiKey, url: '/search/officers', query });
const searchForDisqualifiedOfficers = ({ query } = {}) =>
  !query
    ? requiredParamAsync('companyNumber')
    : get({ apiKey, url: '/search/disqualified-officers', query });

module.exports = {
  fetchCompany,
  fetchCompanyProfile,
  fetchCompanyAddress,
  fetchCompanyOfficers,
  searchAll,
  searchForCompanies,
  searchForOfficers,
  searchForDisqualifiedOfficers,
};

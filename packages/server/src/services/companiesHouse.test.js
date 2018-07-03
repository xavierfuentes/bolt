const axios = require('axios');

const {
  fetchCompanyProfile,
  fetchCompanyAddress,
  fetchCompanyOfficers,
  searchAll,
  searchForCompanies,
  searchForOfficers,
  searchForDisqualifiedOfficers,
} = require('./companiesHouse');

// TODO: use env variables
const COMPANIES_HOUSE_API_KEY = 'Y38eajScB0cT55FlDo-9esuGLxnCYDGp1JtxtZ7l';
const baseUrl = 'https://api.companieshouse.gov.uk';
const responseSuccess = { data: {} };

jest.mock('axios');

describe('Companies House SDK', () => {
  const authConfig = { auth: { username: COMPANIES_HOUSE_API_KEY, password: '' } };
  const thenFn = jest.fn();
  const catchFn = jest.fn();

  beforeEach(() => {
    axios.get.mockResolvedValue(responseSuccess);
  });

  afterEach(() => {
    axios.mockClear();
  });

  describe('Company Profile', () => {
    const companyNumber = 1;

    test('api fails when companyNumber is null/undefined', async () => {
      expect.assertions(3);
      expect(fetchCompanyProfile({ companyNumber: null })).rejects.toBeInstanceOf(Error);
      expect(fetchCompanyAddress({ companyNumber: null })).rejects.toBeInstanceOf(Error);
      expect(fetchCompanyOfficers({ companyNumber: null })).rejects.toBeInstanceOf(Error);
    });

    test('fetches a company full profile', async () => {
      expect.assertions(3);
      await fetchCompanyProfile({ companyNumber })
        .then(thenFn)
        .catch(catchFn);
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/company/${companyNumber}`, authConfig);
      expect(thenFn).toHaveBeenCalledWith(responseSuccess);
      expect(catchFn).not.toHaveBeenCalled();
    });

    test('fetches a company address', async () => {
      expect.assertions(3);
      await fetchCompanyAddress({ companyNumber })
        .then(thenFn)
        .catch(catchFn);
      expect(axios.get).toHaveBeenCalledWith(
        `${baseUrl}/company/${companyNumber}/registered-office-address`,
        authConfig
      );
      expect(thenFn).toHaveBeenCalledWith(responseSuccess);
      expect(catchFn).not.toHaveBeenCalled();
    });

    test('fetches a company list of officers', async () => {
      expect.assertions(3);
      await fetchCompanyOfficers({ companyNumber })
        .then(thenFn)
        .catch(catchFn);
      expect(axios.get).toHaveBeenCalledWith(
        `${baseUrl}/company/${companyNumber}/officers`,
        authConfig
      );
      expect(thenFn).toHaveBeenCalledWith(responseSuccess);
      expect(catchFn).not.toHaveBeenCalled();
    });
  });

  describe('Search', () => {
    const query = 'TAB';
    const requestQuery = { params: { q: query } };

    test('api fails when query is null/undefined', async () => {
      expect.assertions(4);
      expect(searchAll({ query: null })).rejects.toBeInstanceOf(Error);
      expect(searchForCompanies({ query: null })).rejects.toBeInstanceOf(Error);
      expect(searchForOfficers({ query: null })).rejects.toBeInstanceOf(Error);
      expect(searchForDisqualifiedOfficers({ query: null })).rejects.toBeInstanceOf(Error);
    });

    test('Search across all indexed information', async () => {
      expect.assertions(3);
      await searchAll({ query })
        .then(thenFn)
        .catch(catchFn);
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/search`, {
        ...authConfig,
        ...requestQuery,
      });
      expect(thenFn).toHaveBeenCalledWith(responseSuccess);
      expect(catchFn).not.toHaveBeenCalled();
    });

    test('Search for companies', async () => {
      expect.assertions(3);
      await searchForCompanies({ query })
        .then(thenFn)
        .catch(catchFn);
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/search/companies`, {
        ...authConfig,
        ...requestQuery,
      });
      expect(thenFn).toHaveBeenCalledWith(responseSuccess);
      expect(catchFn).not.toHaveBeenCalled();
    });

    test('Search for company officers', async () => {
      expect.assertions(3);
      await searchForOfficers({ query })
        .then(thenFn)
        .catch(catchFn);
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/search/officers`, {
        ...authConfig,
        ...requestQuery,
      });
      expect(thenFn).toHaveBeenCalledWith(responseSuccess);
      expect(catchFn).not.toHaveBeenCalled();
    });

    test('Search for disqualified officers', async () => {
      expect.assertions(3);
      await searchForDisqualifiedOfficers({ query })
        .then(thenFn)
        .catch(catchFn);
      expect(axios.get).toHaveBeenCalledWith(`${baseUrl}/search/disqualified-officers`, {
        ...authConfig,
        ...requestQuery,
      });
      expect(thenFn).toHaveBeenCalledWith(responseSuccess);
      expect(catchFn).not.toHaveBeenCalled();
    });
  });
});

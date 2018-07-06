const axios = require('axios');

const API_BASE_URL = 'https://sandbox-uk-api.experian.com';
const TOKEN_URL = `${API_BASE_URL}/oauth2/v1/token`;
const PROFILE_URL = `${API_BASE_URL}/risk/business/v1/businesstargeter`;
const CLIENT_ID = 'LnSftXjmh9hNGtUKyS8JxbX9RluG2xb9';
const CLIENT_SECRET = 'jO3AuQtk6qjeFkpN';
const CLIENT_USERNAME = 'xavier.fuentes@theappbusiness.com';
const CLIENT_PASSWORD = '77p*OAk6Pomr';

let access_token = null;
let refresh_token = null;

const init = async () => {
  // get access token
  console.log('Logging in Experian...');
  const response = await axios({
    method: 'post',
    url: TOKEN_URL,
    data: { username: CLIENT_USERNAME, password: CLIENT_PASSWORD },
    headers: {
      'Cache-Control': 'no-cache',
      Client_id: CLIENT_ID,
      Client_secret: CLIENT_SECRET,
      'Content-Type': 'application/json',
    },
  })
    .then(r => r.data)
    .catch(error => {
      console.log(error);
    });
  access_token = response.access_token;
  refresh_token = response.refresh_token;
};

const fetchCompany = async ({ registrationNumber }) => {
  if (!access_token) {
    await init();
  }

  // validate expired token

  return axios({
    method: 'get',
    url: PROFILE_URL,
    params: { name: 'Test' },
    // params: { businessref: registrationNumber },
    headers: {
      'Cache-Control': 'no-cache',
      Authorization: `Bearer ${access_token}`,
    },
  })
    .then(r => r.data)
    .then(r => r.SearchResults[0]) // should be unique!
    .catch(error => {
      console.log(error);
    });
};

module.exports = {
  fetchCompany,
  init,
};

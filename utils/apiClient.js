const axios = require('axios');

const apiClient = axios.create({
  baseURL: 'https://auth.calendly.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

module.exports = apiClient;

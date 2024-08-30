const axios = require('axios');
const apiClient = require('../utils/apiClient');

class CalendlyService {
  static async exchangeCodeForToken(code) {
    const response = await apiClient.post('/oauth/token', {
      grant_type: 'authorization_code',
      client_id: process.env.CALENDLY_CLIENT_ID,
      client_secret: process.env.CALENDLY_CLIENT_SECRET,
      code,
      redirect_uri: process.env.CALENDLY_REDIRECT_URI,
    });

    return response.data;
  }

  static async getUserDetails(accessToken) {
    const response = await apiClient.get('/users/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  }
}

module.exports = CalendlyService;

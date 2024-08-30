const CalendlyService = require('../services/calendlyService');

class AuthController {
  static async initiateAuthFlow(req, res) {
    const clientId = process.env.CALENDLY_CLIENT_ID;
    const redirectUri = process.env.CALENDLY_REDIRECT_URI;
    const scopes = encodeURIComponent('users:read users:write');

    const authUrl = `https://auth.calendly.com/oauth/authorize?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=${scopes}`;
    res.redirect(authUrl);
  }

  static async handleAuthCallback(req, res) {
    const { code } = req.query;

    try {
      const tokens = await CalendlyService.exchangeCodeForToken(code);

      // Save tokens in session
      req.session.calendlyAccessToken = tokens.access_token;
      req.session.calendlyRefreshToken = tokens.refresh_token;

      console.log('Access Token:', tokens.access_token);
      res.send('Calendly authentication successful!');
    } catch (error) {
      console.error('Error exchanging code for token:', error.message);
      res.status(500).send('Calendly authentication failed.');
    }
  }
}

module.exports = AuthController;

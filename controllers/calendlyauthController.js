const CalendlyService = require('../services/calendlyService');

class OAuthController {
  static authorize(req, res) {
    const authUrl = CalendlyService.getAuthorizationUrl();
    res.redirect(authUrl);
  }

  static async callback(req, res) {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
      const accessToken = await CalendlyService.exchangeCodeForToken(code);
      req.session.calendlyAccessToken = accessToken
      res.status(200).json({ access_token: accessToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = OAuthController;

const CalendlyService = require('../services/calendlyService');

class UserController {
  static async getAuthenticatedUser(req, res) {
    const accessToken = req.session.calendlyAccessToken;

    if (!accessToken) {
      return res.status(401).send('Unauthorized. Please authenticate first.');
    }

    try {
      const userDetails = await CalendlyService.getUserDetails(accessToken);
      res.json(userDetails);
    } catch (error) {
      console.error('Error fetching Calendly user details:', error.message);
      res.status(500).send('Failed to fetch Calendly user details.');
    }
  }
}

module.exports = UserController;

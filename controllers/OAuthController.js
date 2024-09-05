const GitHubService = require('../services/githubServices');
const DropBoxService = require('../services/dropboxService');
const CalendlyService = require('../services/calendlyService');

class OAuthController {
    static getService(serviceName) {
        const services = {
            github: GitHubService,
            dropbox: DropBoxService,
            calendly: CalendlyService,
        };

        return services[serviceName];
    }

    static authorize(req, res) {
        const { service } = req.params;
        const oauthService = OAuthController.getService(service);

        if (!oauthService) {
            return res.status(400).json({ error: 'Invalid service' });
        }

        const authUrl = oauthService.getAuthorizationUrl();
        res.redirect(authUrl);
    }

    static async callback(req, res) {
        const { service } = req.params;
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ error: 'Authorization code is missing' });
        }

        const oauthService = OAuthController.getService(service);

        if (!oauthService) {
            return res.status(400).json({ error: 'Invalid service' });
        }

        try {
            const accessToken = await oauthService.exchangeCodeForToken(code);
            req.session[`${service}AccessToken`] = accessToken;
            res.status(200).json({ access_token: accessToken });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = OAuthController;

const OAuthService = require('./OAuthService');
const config = require('../config/config');


class CalendlyService extends OAuthService {
    constructor() {
        super({
            clientId: config.calendlyClientId,
            clientSecret: config.calendlyClientSecret,
            redirectUri: config.calendlyRedirectUri,
            authUrl: config.calendlyAuthUrl,
            tokenUrl: config.calendlyTokenUrl,
        });
    }

    async getUserDetails(accessToken) {
        const userDetailsUrl = 'https://api.calendly.com/users/me';
        return super.getUserDetails(accessToken, userDetailsUrl);
    }

    async inviteUserToOrganization(accessToken, uuid, userEmail) {
        const inviteUrl = `https://api.calendly.com/organizations/${uuid}/invitations`;
        return super.inviteUser(accessToken, inviteUrl, { email: userEmail });
    }

    async revokeInvitation(accessToken, orgUuid, invitationUuid) {
        const revokeUrl = `https://api.calendly.com/organizations/${orgUuid}/invitations/${invitationUuid}`;
        return super.revokeInvitation(accessToken, revokeUrl);
    }
}

module.exports = new CalendlyService();

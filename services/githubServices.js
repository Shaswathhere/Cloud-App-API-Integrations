const OAuthService = require('./OAuthService');
const config = require('../config/config');
const axios = require('axios')

class GitHubService extends OAuthService {
    constructor() {
        super({
            clientId: config.githubClientId,
            clientSecret: config.githubSecret,
            redirectUri: config.githubRedirectUri,
            authUrl: config.githubAuthUrl,
            tokenUrl: config.githubTokenUrl,
        });
    }

    async getOrganizationMembers(accessToken) {
        try {
            const response = await axios.get(`https://api.github.com/orgs/${config.githubOrgName}/members`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching organization members:', error.response?.data || error.message);
            throw new Error('Failed to fetch organization members');
        }
    }

    async inviteUserToOrganization(accessToken, email) {
        const inviteUrl = `https://api.github.com/orgs/${config.githubOrgName}/invitations`;
        return super.inviteUser(accessToken, inviteUrl, { email: email });
    }

    async removeUserFromOrganization(accessToken, username) {
        try {
            const response = await axios.delete(`https://api.github.com/orgs/${config.githubOrgName}/members/${username}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    Accept: 'application/vnd.github.v3+json',
                },
            });
            return { message: `User ${username} removed successfully.`, response: response.data };
        } catch (error) {
            console.error('Error removing user from organization:', error.response?.data || error.message);
            throw new Error('Failed to remove user from organization');
        }
    }
}

module.exports = new GitHubService();

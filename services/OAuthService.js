const axios = require('axios');

class OAuthService {
    constructor({ clientId, clientSecret, redirectUri, authUrl, tokenUrl }) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.redirectUri = redirectUri;
        this.authUrl = authUrl;
        this.tokenUrl = tokenUrl;
    }

    getAuthorizationUrl() {
        return `${this.authUrl}?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=code`;
    }

    async exchangeCodeForToken(code) {
        try {
            const response = await axios.post(this.tokenUrl, new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: code,
                redirect_uri: this.redirectUri,
            }).toString(), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                },
            });

            return response.data.access_token;
        } catch (error) {
            console.error('Error exchanging code for token:', error.response?.data || error.message);
            throw new Error('Failed to exchange authorization code for access token');
        }
    }
    
    async getUserDetails(accessToken, userDetailsUrl) {
        try {
            const response = await axios.get(userDetailsUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user details:', error.response?.data || error.message);
            throw new Error('Failed to fetch user details');
        }
    }
    
    async inviteUser(accessToken, inviteUrl, data) {
        try {
            const response = await axios.post(inviteUrl, data, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            });

            return response.data;
        } catch (error) {
            console.error('Error inviting user:', error.response?.data || error.message);
            throw new Error('Failed to invite user');
        }
    }

    async revokeInvitation(accessToken, revokeUrl) {
        try {
            await axios.delete(revokeUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            console.error('Error revoking invitation:', error.response?.data || error.message);
            throw new Error('Failed to revoke invitation');
        }
    }
}

module.exports = OAuthService;

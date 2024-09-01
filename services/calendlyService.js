const axios = require('axios');
const config = require('../config/sessionConfig');


class CalendlyService {
  static getAuthorizationUrl() {
    return `${config.calendlyAuthUrl}?client_id=${config.clientId}&response_type=code&redirect_uri=${config.redirectUri}`;
  }

  static async exchangeCodeForToken(code) {
    try {
      const response = await axios.post(config.calendlyTokenUrl, new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: config.redirectUri,
        client_id: config.clientId,
        client_secret: config.clientSecret,
      }).toString(), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      console.log('Access Token Response:', response.data);
      return response.data.access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error.response?.data || error.message);
      throw new Error('Failed to exchange authorization code for access token');
    }
  }
  
  static async getUserDetails(accessToken) {
    try {
      const response = await axios.get('https://api.calendly.com/users/me', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching Calendly user details:', error.response?.data || error.message);
      throw new Error('Failed to fetch Calendly user details');
    }
  }

  static async getUserDetailsByUuid(accessToken, uuid) {
    try {
      const response = await axios.get(`https://api.calendly.com/users/${uuid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data.resource)
      return response.data.resource; 
    } catch (error) {
      console.error('Error fetching Calendly user details:', error.response?.data || error.message);
      throw new Error('Failed to fetch Calendly user details');
    }
  }

  static async inviteUserToOrganization(accessToken, uuid, userEmail){
    try{
      const response = await axios.post(`https://api.calendly.com/organizations/${uuid}/invitations`, 
        {
          email: userEmail
        },{
        headers:{
          Authorization: `Bearer ${accessToken}`,
          'Content-type': 'application/json',
        }
      })
      console.log(response.data.resource)
      return response.data.resource
    } catch(error){
      console.error('Error inviting user to organization:', error.response?.data || error.message);
      throw new Error('Failed to invite user');
    }
  }

  static async revokeInvitation(accessToken, orgUuid, invitationUuid) {
    try {
      const response = await axios.delete(`https://api.calendly.com/organizations/${orgUuid}/invitations/${invitationUuid}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return response.data;
    } catch (error) {
      console.error('Error revoking invitation:', error.response?.data || error.message);
      throw new Error('Failed to revoke invitation');
    }
  }
  
}

module.exports = CalendlyService;

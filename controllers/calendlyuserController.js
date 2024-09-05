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

    static async getUserByUuid(req, res) {
        const accessToken = req.session.calendlyAccessToken;
        const { uuid } = req.params;

        if (!accessToken) {
            return res.status(401).send('Unauthorized. Please authenticate first.');
        }

        try {
            const userDetails = await CalendlyService.getUserDetailsByUuid(accessToken, uuid);
            res.json(userDetails);
        } catch (error) {
            console.error('Error fetching Calendly user details by UUID:', error.message);
            res.status(500).send('Failed to fetch Calendly user details by UUID.');
        }
    }

    static async inviteUser(req, res) {
        const accessToken = req.session.calendlyAccessToken;
        const { uuid, userEmail } = req.body;

        if (!accessToken) {
            return res.status(401).send('Unauthorized. Please authenticate first.');
        }

        if (!uuid || !userEmail) {
            return res.status(400).send('Organization UUID and user email are required.');
        }

        try {
            const invitationDetails = await CalendlyService.inviteUserToOrganization(accessToken, uuid, userEmail);
            res.status(201).json(invitationDetails);
        } catch (error) {
            console.error('Error inviting user to organization:', error.message);
            res.status(500).send('Failed to invite user to organization.');
        }
    }

    static async revokeInvitation(req, res) {
        const accessToken = req.session.calendlyAccessToken;
        const { orgUuid, invitationUuid } = req.params;

        if (!accessToken) {
            return res.status(401).send('Unauthorized. Please authenticate first.');
        }

        if (!orgUuid || !invitationUuid) {
            return res.status(400).send('Organization UUID and invitation UUID are required.');
        }

        try {
            await CalendlyService.revokeInvitation(accessToken, orgUuid, invitationUuid);
            res.status(204).send('Invitation revoked successfully');
        } catch (error) {
            console.error('Error revoking invitation:', error.message);
            res.status(500).send('Failed to revoke invitation.');
        }
    }
}

module.exports = UserController;

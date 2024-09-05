const GitHubService = require('../services/githubServices');

class UserController {
    static async getAuthenticatedUser(req, res) {
        const accessToken = req.session.githubAccessToken;

        if (!accessToken) {
            return res.status(401).send('Unauthorized. Please authenticate first.');
        }

        try {
            const userDetails = await GitHubService.getOrganizationMembers(accessToken);
            res.json(userDetails);
        } catch (error) {
            console.error('Error fetching GitHub user details:', error.message);
            res.status(500).send('Failed to fetch GitHub user details.');
        }
    }

    static async inviteUser(req, res) {
        const accessToken = req.session.githubAccessToken;
        const { email } = req.body;

        if (!accessToken) {
            return res.status(401).send('Unauthorized. Please authenticate first.');
        }

        if (!email) {
            return res.status(400).send('Email is required.');
        }

        try {
            const invitationDetails = await GitHubService.inviteUserToOrganization(accessToken, email);
            res.status(201).json(invitationDetails);
        } catch (error) {
            console.error('Error inviting user to GitHub organization:', error.message);
            res.status(500).send('Failed to invite user to GitHub organization.');
        }
    }

    static async removeUser(req, res) {
        const accessToken = req.session.githubAccessToken;
        const { username } = req.params;

        if (!accessToken) {
            return res.status(401).send('Unauthorized. Please authenticate first.');
        }

        if (!username) {
            return res.status(400).send('Username is required.');
        }

        try {
            const result = await GitHubService.removeUserFromOrganization(accessToken, username);
            res.json(result);
        } catch (error) {
            console.error('Error removing user from GitHub organization:', error.message);
            res.status(500).send('Failed to remove user from GitHub organization.');
        }
    }
}

module.exports = UserController;

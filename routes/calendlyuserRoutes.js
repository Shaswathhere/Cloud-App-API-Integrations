const express = require('express');
const UserController = require('../controllers/calendlyuserController');

const router = express.Router();

router.get('/me', UserController.getAuthenticatedUser);
router.get('/user/:uuid', UserController.getUserByUuid);
router.post('/organization/invite', UserController.inviteUser);
router.delete('/organization/invitations/:orgUuid/:invitationUuid', UserController.revokeInvitation);


module.exports = router;

const express = require('express');
const router = express.Router();
const OAuthController = require('../controllers/calendlyauthController');

router.get('/authorize', OAuthController.authorize);
router.get('/callback', OAuthController.callback);

module.exports = router;

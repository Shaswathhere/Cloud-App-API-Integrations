const express = require('express');
const router = express.Router();
const OAuthController = require('../controllers/OAuthController');

router.get('/:service/authorize', OAuthController.authorize);
router.get('/:service/callback', OAuthController.callback);

module.exports = router;

const express = require('express');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.get('/', AuthController.initiateAuthFlow);
router.get('/callback', AuthController.handleAuthCallback);

module.exports = router;

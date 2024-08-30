const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/me', UserController.getAuthenticatedUser);

module.exports = router;

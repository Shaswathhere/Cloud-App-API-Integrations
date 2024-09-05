const express = require('express')
const UserController = require('../controllers/githubUserController')

const router = express.Router()

router.get('/get', UserController.getAuthenticatedUser)
router.post('/invite', UserController.inviteUser)
router.delete('/delete/:username', UserController.removeUser)

module.exports = router
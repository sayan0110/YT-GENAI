const express = require("express");

const authUserMiddleware = require('../middleware/middleware')

const authController = require('../controller/auth.controller')

const router = express.Router();

router.post('/user-register', authController.registerUser)
router.post('/user-login', authController.loginUser)
router.get('/user-logout', authController.logoutUser)

router.get('/current-token', authUserMiddleware.verifiedUserMiddleware, authController.getVerifiedToken)


module.exports = router;
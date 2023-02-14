const express = require('express');
const router = express.Router();
const authController = require('../Controller/AuthController')

router.post('/register/phone-or-email', authController.register);
router.post('/login/phone-or-email', authController.login);

module.exports = router;
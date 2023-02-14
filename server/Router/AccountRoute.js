const express = require('express');
const router = express.Router();
const accountController = require('../Controller/AccountController')
const verifyToken = require("../Middleware/auth");

router.get('/all', accountController.getListAccount)
router.delete("/delete/:id", verifyToken, accountController.deleteAccount);
router.put("/update/:id", verifyToken, accountController.updateAccount);
router.get("/:id", accountController.viewAccountDetail);

module.exports = router;
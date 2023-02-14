const express = require('express');
const router = express.Router();
const reportController = require('../Controller/ReportController')

router.post('/:idUser/report/:idVideo', reportController.postReport)

module.exports = router;
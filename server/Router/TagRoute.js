const express = require('express');
const router = express.Router();
const TagController = require('../Controller/TagController')
const { multerConfigImage } = require("../Helpers/multer");
const verifyToken = require("../Middleware/auth");
const driverService = require('../Middleware/driverService');

router.get('/get-list-trendy', TagController.getListTrendy)
router.get('/get-list-trendy-upload', TagController.getListTrendyUpload)
router.get('/:name', TagController.getTrendy)
router.get("/detail/:id", TagController.viewTrendyView);
router.post(
  "/update/:id",
  verifyToken,
  multerConfigImage.single("myImage"), driverService.uploadImage,
  TagController.updateTag
);
router.get("/:name", TagController.getTrendy);
router.delete("/delete/:id", TagController.deleteTagTrendy);
router.post(
  "/create-trendy",
  verifyToken,
  multerConfigImage.single("myImage"), driverService.uploadImage,
  TagController.createTrendy
);

module.exports = router;
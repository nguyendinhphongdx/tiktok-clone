const express = require('express');
const router = express.Router();
const TagController = require('../Controller/TagController')
const { multerConfigFile } = require("../Helpers/multer");
const verifyToken = require("../Middleware/auth");

router.get('/get-list-trendy', TagController.getListTrendy)
router.get('/get-list-trendy-upload', TagController.getListTrendyUpload)
router.get('/:name', TagController.getTrendy)
router.get("/detail/:id", TagController.viewTrendyView);
router.post(
  "/update/:id",
  verifyToken,
  multerConfigFile.array("files", 1),
  TagController.updateTag
);
router.get("/:name", TagController.getTrendy);
router.delete("/delete/:id", TagController.deleteTagTrendy);
router.post(
  "/create-trendy",
  verifyToken,
  multerConfigFile.array("files", 1),
  TagController.createTrendy
);

module.exports = router;
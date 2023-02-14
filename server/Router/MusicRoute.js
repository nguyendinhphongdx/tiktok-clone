const express = require('express');
const router = express.Router();
const MusicController = require('../Controller/MusicController')
const { multerConfigFile } = require("../Helpers/multer");
const verifyToken = require("../Middleware/auth");

//Phần của Linh
router.get("/get-report", MusicController.getReportMusic);
router.delete("/delete/:id", verifyToken, MusicController.deleteMusic);
router.get("/detail/:id", MusicController.viewMusicDetail);
router.post(
  "/update/:id",
  verifyToken,
  multerConfigFile.array("files", 2),
  MusicController.updateMusic
);
// đặt multer ở đây để lây file send từ form data trước khi chạy vào hàm createMusic
router.post(
  "/upload-music",
  verifyToken,
  multerConfigFile.array("files", 2),
  MusicController.createMusic
);

//Phần của tuấn
router.get('/get-list-music', MusicController.getListMusic)
router.get('/get-list-music-upload', MusicController.getListMusicUpload)
router.get('/:name-:id', MusicController.getMusic)

module.exports = router;
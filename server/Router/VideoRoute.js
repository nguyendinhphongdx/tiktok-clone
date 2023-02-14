const express = require('express');
const router = express.Router();
const videoController = require('../Controller/VideoController')
const { multerConfigFile } = require("../Helpers/multer");
const verifyToken = require("../Middleware/auth");

router.post('/increase-share/:id', videoController.increaseShare)
router.post('/increase-views/:id', videoController.increaseView)
router.post('/liked/:id', videoController.likeVideo)
router.post('/unliked/:id', videoController.unLikeVideo)
router.post('/upload', videoController.uploadVideo)
router.get('/search', videoController.searchVideo)
router.get('/get-list-video-user/:nickname', videoController.getUserVideo)
router.get('/get-list-video', videoController.getRandomVideo)
router.get('/get-list-video-login', videoController.getRandomVideoLogin)
router.get('/get-list-video-login-follow', videoController.getRandomVideoLoginFollow)
router.get('/get-list-first-video', videoController.getFirstVideoUser)
router.get('/get-list-video-trendy/:name', videoController.getTrendyVideo)
router.get('/get-list-video-music/:id', videoController.getMusicVideo)
router.get('/:nickname/:id', videoController.getCurrentVideo)
//Phần của Linh
router.get("/get-report", videoController.getReportVideo);
router.get("/get-list-videos", videoController.getListVideos);
router.get("/detail/:id", videoController.viewVideoDetail);
router.delete("/delete/:id", verifyToken, videoController.deleteVideo);
router.post(
  "/admin-update/:id",
  verifyToken,
  multerConfigFile.array("files", 2),
  videoController.updateVideoByAdmin
);

module.exports = router;
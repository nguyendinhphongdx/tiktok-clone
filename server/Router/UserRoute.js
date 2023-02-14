const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController')
const { multerConfigImage } = require("../Helpers/multer");
const verifyToken = require("../Middleware/auth");

//Phần của Linh
router.get("/get-info/:id", userController.getDetailUser);
router.put("/update/:id", verifyToken, userController.changeStatusTick);
router.delete("/delete/:id", verifyToken, userController.deleteUser);
router.post(
  "/update-info/:id",
  verifyToken,
  multerConfigImage.array("image", 1),
  userController.updateUser
);

//Phần của Tuấn
router.post('/update', userController.updateProfile)
router.post('/:id/update-favorites', userController.updateFavoritesAndIsNewUser)
router.get('/search', userController.searchUser)
router.get('/get-liked-video', userController.getLikedVideo)
router.get('/get-list', userController.getListUser)
router.get('/get-list-suggest', userController.getSuggestUser)
router.post('/follow-user', userController.followUser)
router.post('/unfollow-user', userController.unFollowUser)
router.get('/get-follow-user', userController.getfollowUser)
router.get('/auth/:nickname', userController.getCurrentUser)
router.get('/:nickname', userController.getCurrentUserWithoutJWT)

module.exports = router;
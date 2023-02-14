const express = require('express');
const router = express.Router();
const commentController = require('../Controller/CommentController')

router.post('/post/:id', commentController.postComment)
router.post('/delete/:idVideo/:id', commentController.deleteComment)
router.post('/:nickname/like/:id', commentController.likeComment)
router.post('/:nickname/unlike/:id', commentController.unLikeComment)
router.get('/:nickname', commentController.getListLikeComment)
router.get('/get-list-comment/:id', commentController.getListComment)

module.exports = router;
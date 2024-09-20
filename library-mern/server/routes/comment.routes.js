const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const authenticate = require('../middlewares/authenticate');
const { checkBookAccess } = require('../middlewares/checkBookAccess'); 

router.post('/:bookId', authenticate , commentController.createComment);
router.get('/:commentId', authenticate, commentController.getCommentById);
router.get('/', authenticate, commentController.getAllComments);
router.get('/book/:bookId', authenticate, commentController.getCommentsByBookId);
router.get('/author/:authorId', authenticate, commentController.getCommentsByAuthorId);
router.put('/:commentId', authenticate, commentController.updateCommentById); 
router.delete('/:commentId', authenticate, commentController.deleteCommentById); 

module.exports = router;



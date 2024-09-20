const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book.controller');
const authenticate = require('../middlewares/authenticate');
const authorize = require('../middlewares/authorize');
const verifyPayment = require('../middlewares/verifyPayment');


router.get('/owned-books', authenticate, bookController.getOwnedBooks);
router.post('/', authenticate, authorize(['author', 'admin']), bookController.createBook);
router.get('/', authenticate, bookController.getAllBooks);
router.get('/:id', authenticate, bookController.getBookById);
router.put('/:id', authenticate, bookController.updateBookById);
router.delete('/:id', authenticate, bookController.deleteBookById);
router.get('/author/:authorId', authenticate, bookController.getBooksByAuthor);
router.get('/:commentId',authenticate , bookController.getCommentByBookId);


router.post('/access/purchased', authenticate, verifyPayment, bookController.getBookContent);
router.post('/access/rented', authenticate, verifyPayment, bookController.getBookContent);

module.exports = router;

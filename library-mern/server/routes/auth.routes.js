const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authenticate = require('../middlewares/authenticate');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/current-user', authenticate, authController.getCurrentUser);

module.exports = router;
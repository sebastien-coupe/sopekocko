const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

// Limit number of request to login
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 100
});

const authController = require('../controllers/authController');

router.post('/signup', authController.signup);
router.post('/login', limiter, authController.login);

module.exports = router;
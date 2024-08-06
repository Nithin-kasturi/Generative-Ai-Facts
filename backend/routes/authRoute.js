const express = require('express');
const router = express.Router();
const { login, register } = require('../controllers/authController');
const { search } = require('../controllers/authController');

// POST /login
router.post('/login', login);
// POST /register
router.post('/register', register);
router.post('/search',search);

module.exports = router;
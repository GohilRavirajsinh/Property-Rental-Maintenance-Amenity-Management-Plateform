const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// URL for register and login
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;
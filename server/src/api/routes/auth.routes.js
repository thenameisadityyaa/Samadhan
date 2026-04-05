const express = require('express');
const { register, login, getMe } = require('../controllers/auth.controller');
const authController = require('../controllers/auth.controller');
const { protect } = require('../../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

router.post('/resident-signup', authController.residentSignup);

// POST /api/auth/login
router.post('/login', login);

// GET /api/auth/me
router.get('/me', protect, getMe);

// PUT /api/auth/profile
router.put('/profile', protect, authController.updateProfile);

module.exports = router;



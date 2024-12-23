const express = require('express');
const { registerUser, loginUser, getUserProfile, getAllUsers } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register',protect, registerUser); // Private route
router.post('/login', loginUser);       // Public route
router.get('/profile', protect, getUserProfile); // Private route
router.get('/users', protect, getAllUsers); // Private route


module.exports = router;
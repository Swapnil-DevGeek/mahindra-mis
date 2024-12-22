const asyncHandler = require('express-async-handler');
const User = require('../models/User.model');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// @desc    Register a new user (Admin only)
// @route   POST /api/auth/register
// @access  Private (Admin only)
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, designation, supervisor_id } = req.body;

    // Check if the requester is an Admin (L3)
    if (req.user.designation !== 'L3') {
        return res.status(403).json({ message: 'Unauthorized to create a new user' });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Validate supervisor assignment for L1 users
    if (designation === 'L1') {
        if (!supervisor_id) {
            return res.status(403).json({ message: 'L1 users must have an L2 supervisor.' });
        }

        const supervisor = await User.findById(supervisor_id);
        if (!supervisor || supervisor.designation !== 'L2') {
            return res.status(403).json({ message: 'Supervisor not found or not an L2 user.' });
        }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        designation,
        supervisor_id: designation === 'L1' ? supervisor_id : null, // Supervisor only for L1
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            designation: user.designation,
        });
    } else {
        return res.status(400).json({ message: 'Invalid user data' });
    }
});

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            designation: user.designation,
            token: generateToken(user.id),
        });
    } else {
        
        return res.status(401).json({ message: 'Invalid email or password' });
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    return res.status(200).json(user);
});

// @desc    Get all users
// @route   GET /api/auth/users
// @access  Private(L3)
    const getAllUsers = asyncHandler(async (req, res) => {
        if (req.user.designation!== 'L3') {
            return res.status(403).json({ message: 'Unauthorized to view users' });
        }

        const users = await User.find({});
        return res.status(200).json(users);
    });

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    getAllUsers
};

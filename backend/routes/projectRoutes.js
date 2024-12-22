const express = require('express');
const { createProject } = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/projects - Create a new project (Admin only)
router.post('/', protect, createProject);

module.exports = router;

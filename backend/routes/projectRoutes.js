const express = require('express');
const { createProject, getAllProjects, getProjectById, updateProject, deleteProject } = require('../controllers/projectController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// POST /api/projects - Create a new project (Admin only)
router.post('/', protect, createProject);
router.get('/',protect,getAllProjects);
router.get('/:id',protect,getProjectById);
router.put('/:id',protect,updateProject);
router.delete('/:id',protect,deleteProject);

module.exports = router;

const asyncHandler =require('express-async-handler');
const Project = require('../models/Project.model');

// @desc    Create new project
// @route   POST /api/projects
// @access  Private(admin only)
const createProject = asyncHandler(async (req, res) => {
    const {project_name} = req.body;

    if(req.user.designation !== 'L3'){
        return res.status(401).json({message: 'Not authorized as an admin'}) ;
    }

    if(!project_name || project_name.trim().length === 0){
        return res.status(400).json({message: 'Project name is required'});
    };

    const projectExists = await Project.findOne({project_name});
    if(projectExists){
        return res.status(400).json({message: 'Project already exists'});
    }

    const newProject = await Project.create({
        project_name,
        created_by: req.user._id
    });

    if (newProject) {
        return res.status(201).json({
            _id: newProject._id,
            project_name: newProject.project_name,
            created_by: newProject.created_by,
            created_at: newProject.created_at,
        });
    } else {
        return res.status(500).json({message: 'Failed to create project'});
    }

});

module.exports = {createProject};
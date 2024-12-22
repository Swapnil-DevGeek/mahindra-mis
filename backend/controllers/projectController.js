const asyncHandler =require('express-async-handler');
const Project = require('../models/Project.model');

// @desc    Create new project
// @route   POST /api/projects/
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

// @desc    Get all projects
// @route   GET /api/projects
// @access  Private
const getAllProjects = asyncHandler(async (req, res) => {
    const projects = await Project.find({});
    return res.status(200).json(projects);
});

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Private
const getProjectById = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if(project){
        return res.status(200).json(project);
    } else {
        return res.status(404).json({message:'Project not found'});
    }
});

// @desc Delete project
// @route DELETE /api/projects/:id
// @access Private (admin only)
const deleteProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if(req.user.designation !== 'L3'){
        return res.status(401).json({message: 'Not authorized as an admin'}) ;
    }
    if(project){
        await Project.deleteOne({_id: req.params.id});
        return res.json({message: 'Project removed'});
    } else {
        return res.status(404).json({message: 'Project not found'});
    }
});

// @desc Update project
// @route PUT /api/projects/:id
// @access Private (admin only)
const updateProject = asyncHandler(async (req, res) => {
    const project = await Project.findById(req.params.id);
    if(req.user.designation !== 'L3'){
        return res.status(401).json({message: 'Not authorized as an admin'}) ;
    }
    if(project){
        project.project_name = req.body.project_name || project.project_name;
        const updatedProject = await project.save();
        return res.json({
            _id: updatedProject._id,
            project_name: updatedProject.project_name,
            created_by: updatedProject.created_by,
            created_at: updatedProject.created_at,
        });
    } else {
        return res.status(404).json({message: 'Project not found'});
    }
});

module.exports = {
    createProject,
    getAllProjects,
    getProjectById,
    deleteProject,
    updateProject
};
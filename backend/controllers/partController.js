const asyncHandler = require('express-async-handler');
const Part = require('../models/Part.model');
const Project = require('../models/Project.model');

// @desc Create a part
// @route POST /api/parts
// @access Private(admin)
const createPart = asyncHandler(async (req, res) => {
    const { project_id, part_number, part_description, designated_de_id, sta_id, supplier_id, system_engineer_id } = req.body;

    // Check if the requester is an Admin (L3)
    if (req.user.designation !== 'L3') {
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }

    // Validate the project exists
    const project = await Project.findById(project_id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    // Validate unique part name within the project
    const partExists = await Part.findOne({ project_id, part_name });
    if (partExists) {
        return res.status(400).json({ message: 'Part name already exists within this project' });
    }

     // Create the part
    const part = await Part.create({
        project_id,
        part_number,
        part_description,
        designated_de_id,
        sta_id,
        supplier_id,
        system_engineer_id,
        created_by: req.user._id,
    });

    if (part) {
        return res.status(201).json(part);
    } else {
        return res.status(500).json({ message: 'Failed to create part' });
    }
});

// @desc Get all parts for a project
// @route GET /api/parts/project/:project_id
// @access Private
const getPartsByProject = asyncHandler(async (req, res) => {
    const parts = await Part.find({ project_id: req.params.project_id });
    if (parts) {
        return res.status(201).json(parts);
    } else {
        return res.status(404).json({ message: 'Parts not found' });
    }
});

// @desc Get a part by ID
// @route GET /api/parts/:id
// @access Private
const getPartById = asyncHandler(async (req, res) => {
    const part = await Part.findById(req.params.id);
    if (part) {
        return res.status(201).json(part);
    } else {
        return res.status(404).json({ message: 'Part not found' });
    }
});

// @desc Update a part
// @route PUT /api/parts/:id
// @access Private(admin)
const updatePart = asyncHandler(async (req, res) => {
    const { project_id, part_number, part_description, designated_de_id, sta_id, supplier_id, system_engineer_id } = req.body;

    // Check if the requester is an Admin (L3)
    if (req.user.designation !== 'L3') {
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }

    // Validate the project exists
    const project = await Project.findById(project_id);
    if (!project) {
        return res.status(404).json({ message: 'Project not found' });
    }

    const part = await Part.findById(req.params.id);
    if (part) {
        part.project_id = project_id;
        part.part_number = part_number;
        part.part_description = part_description;
        part.designated_de_id = designated_de_id;
        part.sta_id = sta_id;
        part.supplier_id = supplier_id;
        part.system_engineer_id = system_engineer_id;
        part.updated_at = Date.now();

        const updatedPart = await part.save();
        return res.status(201).json(updatedPart);
    } else {
        return res.status(404).json({ message: 'Part not found' });
    }
});

// @desc Delete a part
// @route DELETE /api/parts/:id
// @access Private(admin)
const deletePart = asyncHandler(async (req, res) => {
    // Check if the requester is an Admin (L3)
    if (req.user.designation !== 'L3') {
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }

    const part = await Part.findById(req.params.id);
    if (part) {
        await Part.deleteOne({ _id: req.params.id });
        return res.status(204).json({ message: 'Part deleted' });
    } else {
        return res.status(404).json({ message: 'Part not found' });
    }
});

module.exports = { createPart, getPartsByProject, getPartById, updatePart, deletePart };
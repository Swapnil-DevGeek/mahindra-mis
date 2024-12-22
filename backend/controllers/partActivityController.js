const asyncHandler = require('express-async-handler');
const PartActivity = require('../models/PartActivity.model');
const Part = require('../models/Part.model');
const Activity = require('../models/Activity.model');

// @desc Create a new part Activity
// @route POST /api/part-activities
// @access Private(admin)
const createPartActivity = asyncHandler(async (req, res) => {
    const { part_id, activity_id, due_date } = req.body;

    // Check if requester is an admin
    if (req.user.designation !== 'L3') {
        return res.status(401).json({ message: 'Not authorized as an admin' });
    }
    
    const part = await Part.findById(part_id);
    if (!part) return res.status(404).json({ message: 'Part not found' });

    const activity = await Activity.findById(activity_id);
    if (!activity) return res.status(404).json({ message: 'Activity not found' });

    // Check for duplicate activity for the same part
    const existingPartActivity = await PartActivity.findOne({ part_id, activity_id });
    if (existingPartActivity) {
        return res.status(400).json({ message: 'Activity already exists for this part' });
    }

    // Create the part activity
    const newPartActivity = await PartActivity.create({
        part_id,
        activity_id,
        due_date,
        status: 'Pending',
    });

    if (newPartActivity) {
        return res.status(201).json(newPartActivity);
    } else {
        return res.status(500).json({ message: 'Failed to create part activity' });
    }
});

// @desc  Get all activities for a specific part
// @route GET /api/part-activities/:part_id
// @access Private
const getPartActivities = asyncHandler(async (req, res) => {
    const partActivities = await PartActivity.find({ part_id: req.params.part_id });
    if (partActivities) {
        return res.status(201).json(partActivities);
    } else {
        return res.status(404).json({ message: 'Part activities not found' });
    }
});

// @desc Update part activity (status, completed_date)
// @route PUT /api/part-activities/:id
// @access Private
const updatePartActivity = asyncHandler(async (req, res) => {
    const { status, completed_date } = req.body;
    // Find the activity
    const partActivity = await PartActivity.findById(req.params.id);
    if (!partActivity) return res.status(404).json({ message: 'Part activity not found' });
    // Validate user access (L2 or L3)
    if (req.user.designation !== 'L3' && req.user.designation !== 'L2') {
        return res.status(401).json({ message: 'Not authorized to update part activity' });
    }

     // Update fields
    partActivity.status = status || partActivity.status;
    if (completed_date) {
        partActivity.completed_date = completed_date;
    }
    partActivity.updated_by = req.user._id;
    partActivity.updated_at = Date.now();

    const updatedActivity = await partActivity.save();

    return res.status(200).json(updatedActivity);
});


module.exports = {
    createPartActivity,
    getPartActivities,
    updatePartActivity,
};
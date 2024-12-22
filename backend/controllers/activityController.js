const asyncHandler  = require('express-async-handler');
const Activity = require('../models/Activity.model');

// @desc Create new activity
// @route POST /api/activities
// @access Private(admin)
const createActivity = asyncHandler(async (req, res) => {
    const {activity_name} = req.body;
    if(req.user.designation!=='L3'){
        return res.status(401).json({message: 'Invalid user access'});
    }

    if(!activity_name || activity_name.trim().length === 0){
        return res.status(400).json({message: 'Activity name is required'});
    }

    const activityExists = await Activity.findOne({activity_name});
    if(activityExists){
        return res.status(400).json({message: 'Activity already exists'});
    }

    const newActivity = await Activity.create({
        activity_name,
        created_by: req.user._id
    });

    if(newActivity){
        res.status(201).json({message: 'Activity created successfully', activity: newActivity});
    }
    else{
        res.status(500).json({message: 'Failed to create activity'});
    }
});

// @desc Get all activities
// @route GET /api/activities
 // @access Private(admin)
const getAllActivities = asyncHandler(async (req, res) => {
    const activities = await Activity.find();

    if(activities){
        return res.status(200).json({activities});
    }
    else{
        return res.status(404).json({message: 'No activities found'});
    }
});

// @desc Get activity by ID
// @route GET /api/activities/:id
// @access Private
const getActivityById = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id);

    if(activity){
        res.status(200).json({activity});
    }
    else{
        res.status(404).json({message: 'Activity not found'});
    }
});

// @desc Update activity by ID
// @route PUT /api/activities/:id
// @access Private(admin)
const updateActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id);

    if(req.user.designation!=='L3'){
        return res.status(401).json({message: 'Invalid user access'});
    }

    if(activity){
        activity.activity_name = req.body.activity_name || activity.activity_name;
        const updatedActivity = await activity.save();
        return res.json({
            _id: updatedActivity._id,
            activity_name: updatedActivity.activity_name,
            created_by: updatedActivity.created_by,
            created_at: updatedActivity.created_at,
        });
    } else {
        return res.status(404).json({message: 'Activity not found'});
    }
});

// @desc Delete activity by ID
// @route DELETE /api/activities/:id
 // @access Private(admin)
const deleteActivity = asyncHandler(async (req, res) => {
    const activity = await Activity.findById(req.params.id);

    if(req.user.designation!=='L3'){
        return res.status(401).json({message: 'Invalid user access'});
    }

    if(activity){
        await Activity.deleteOne({_id: req.params.id});
        return res.json({message: 'Activity deleted successfully'});
    } else {
        return res.status(404).json({message: 'Activity not found'});
    }
});

module.exports= {
    createActivity,
    getAllActivities,
    getActivityById,
    updateActivity,
    deleteActivity
}
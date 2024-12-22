const mongoose = require('mongoose');

const PartActivitySchema = new mongoose.Schema({
    part_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Part', required: true },
    activity_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity', required: true },
    due_date: { type: Date, required: true },
    completed_date: { type: Date, default: null },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
    updated_by: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PartActivity', PartActivitySchema);

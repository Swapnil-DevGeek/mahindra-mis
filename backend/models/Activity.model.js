const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
    activity_name: { type: String, required: true },
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', ActivitySchema);

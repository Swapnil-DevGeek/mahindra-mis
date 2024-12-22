const mongoose = require('mongoose');

const PartSchema = new mongoose.Schema({
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    part_description: { type: String, required: true },
    designated_de_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sta_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    supplier_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    system_engineer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Part', PartSchema);

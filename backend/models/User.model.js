const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, enum: ['L1', 'L2', 'L3','Supplier','STA','SE'], required: true },
    supervisor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

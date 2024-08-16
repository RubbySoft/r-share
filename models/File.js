const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 3600 // 1 hour TTL (Time To Live)
    }
});

module.exports = mongoose.model('File', FileSchema);

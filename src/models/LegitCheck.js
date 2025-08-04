const mongoose = require('mongoose');

const legitCheckSchema = new mongoose.Schema({
    messageId: {
        type: String,
        required: true,
        unique: true,
    },
    authorUsername: {
        type: String,
        required: true,
    },
    authorAvatarURL: {
        type: String,
        required: false,
        default: null,
    },
    content: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const LegitCheck = mongoose.model('LegitCheck', legitCheckSchema);

module.exports = LegitCheck;
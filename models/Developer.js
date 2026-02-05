const mongoose = require('mongoose');

const developerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    founded: {
        type: Date,
    },
    country: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('Developer', developerSchema);
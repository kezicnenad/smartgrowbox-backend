const mongoose = require('mongoose');

const deviceSchema = new mongoose.Schema({
    mac: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Device', deviceSchema);

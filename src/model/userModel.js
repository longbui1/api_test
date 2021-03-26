const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    password: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    role: {
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
    },
});

module.exports = mongoose.model('User', userSchema);

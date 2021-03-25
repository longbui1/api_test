const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    selectCate: [String],
    description: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    content: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
    },
    createdBy: {
        type: String,
    },

    updatedAt: {
        type: Date,
    },
    updatedBy: {
        type: String,
    },

    disabledAt: {
        type: Date,
    },
    disabledBy: {
        type: String,
    },
    status: {
        type: Boolean,
    },
});

module.exports = mongoose.model('Post', postSchema);

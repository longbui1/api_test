const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    selectCate: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
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
});

module.exports = mongoose.model('Post', postSchema);

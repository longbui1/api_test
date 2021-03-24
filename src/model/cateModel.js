const mongoose = require('mongoose');
const { Schema } = mongoose;

const cateSchema = new Schema({
    name: {
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
});

module.exports = mongoose.model('Cate', cateSchema);

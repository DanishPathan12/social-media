const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    Image: {
        type: String,
        required: false,
    },
    likes: {
        type: Number,
        required: false,
    }
});

const post = mongoose.model('post', postSchema);

module.exports = post;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        enum: ["male", "female"],
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    posts: [{
        type: mongoose.Types.ObjectId,
        ref: 'post',
    }]
});

const user = mongoose.model('user', userSchema);

module.exports = user;

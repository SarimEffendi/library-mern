// models/comment.model.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    rating: { // New field
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    publishedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Comment', commentSchema);

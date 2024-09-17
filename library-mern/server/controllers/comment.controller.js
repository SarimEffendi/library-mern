const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment.model");
const Book = require("../models/book.model");

exports.createComment = asyncHandler(async (req, res) => {
    try {
        const { description } = req.body;
        const newComment = new Comment({
            description,
            author: req.user._id,
            book: req.params.bookId
        });
        await newComment.save();

        const populatedComment = await Comment.findById(newComment._id)
            .populate("author", "username")
            .populate("book", "title");

        res.status(201).json(populatedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


exports.getCommentById = asyncHandler(async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId).populate("author", "username").populate("book", "title");
        if (!comment) {
            return res.status(404).json({ message: "Comment not found!" });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.getAllComments = asyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find().populate("author", "username").populate("book", "title");
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.updateCommentById = asyncHandler(async (req, res) => {
    try {
        const { description } = req.body;
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found!" });
        }

        if (req.user.role.includes('admin') || comment.author.toString() === req.user._id.toString()) {
            const updateFields = { description };
            const updatedComment = await Comment.findByIdAndUpdate(req.params.commentId, updateFields, { new: true })
                .populate("author", "username")
                .populate("book", "title");
            res.json(updatedComment); 
        } else {
            res.status(403).json({ error: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


exports.deleteCommentById = asyncHandler(async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.commentId);

        if (!comment) {
            return res.status(404).json({ message: "Comment not found!" });
        }

        if (req.user.role.includes('admin') || comment.author.toString() === req.user._id.toString()) {
            await Comment.findByIdAndDelete(req.params.commentId);
            res.json({ message: "Comment deleted successfully" });
        } else {
            res.status(403).json({ error: "Access denied" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

exports.getCommentsByBookId = asyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find({ book: req.params.bookId })
            .populate("author", "username")
            .populate("book", "title");

        if (!comments.length) {
            return res.json([]); 
        }

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



exports.getCommentsByAuthorId = asyncHandler(async (req, res) => {
    try {
        const comments = await Comment.find({ author: req.params.authorId })
            .populate("author", "username")
            .populate("book", "title");

        if (!comments.length) {
            return res.status(404).json({ message: "No comments found for this author!" });
        }

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

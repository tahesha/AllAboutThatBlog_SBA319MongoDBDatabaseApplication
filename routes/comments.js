// routes/comments.js

const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');

// GET all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().populate('author', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET comments for a specific post
router.get('/post/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new comment
router.post('/', async (req, res) => {
  const comment = new Comment({
    content: req.body.content,
    author: req.body.author, // Assuming req.body.author contains the ObjectId of the author
    post: req.body.post, // Assuming req.body.post contains the ObjectId of the post
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a comment
router.delete('/:id', async (req, res) => {
  try {
    await Comment.findByIdAndRemove(req.params.id);
    res.json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

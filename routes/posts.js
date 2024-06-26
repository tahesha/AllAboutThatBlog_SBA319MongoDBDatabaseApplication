// routes/posts.js

const express = require('express');
const router = express.Router();
const Post = require('../models/post');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET one post
router.get('/:id', getPost, (req, res) => {
  res.json(res.post);
});

// POST a new post
router.post('/', async (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    author: req.body.author, // Assuming req.body.author contains the ObjectId of the author
  });

  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update a post
router.patch('/:id', getPost, async (req, res) => {
  if (req.body.title != null) {
    res.post.title = req.body.title;
  }
  if (req.body.content != null) {
    res.post.content = req.body.content;
  }
  try {
    const updatedPost = await res.post.save();
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post
router.delete('/:id', getPost, async (req, res) => {
  try {
    await res.post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getPost(req, res, next) {
  try {
    const post = await Post.findById(req.params.id);
    if (post == null) {
      return res.status(404).json({ message: 'Cannot find post' });
    }
    res.post = post;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;

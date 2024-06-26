const express = require('express');
const app = express();
const path = require('path');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Example data (replace with your MongoDB setup)
let posts = [
  { id: 1, title: 'First Post', content: 'This is the content of the first post.' },
  { id: 2, title: 'Second Post', content: 'This is the content of the second post.' }
];

// Example routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get all posts
app.get('/posts', (req, res) => {
  res.json(posts);
});

// Get a specific post by ID
app.get('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }
  res.json(post);
});

// Create a new post
app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  const newPost = { id: posts.length + 1, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Update a post by ID
app.put('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const index = posts.findIndex(post => post.id === postId);
  if (index === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }
  posts[index] = { id: postId, title, content };
  res.json(posts[index]);
});

// Delete a post by ID
app.delete('/posts/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== postId);
  res.status(204).end();
});

// Search posts by keyword query
app.get('/search', (req, res) => {
  const { query } = req.query;
  const results = posts.filter(post =>
    post.title.toLowerCase().includes(query.toLowerCase()) ||
    post.content.toLowerCase().includes(query.toLowerCase())
  );
  res.json(results);
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

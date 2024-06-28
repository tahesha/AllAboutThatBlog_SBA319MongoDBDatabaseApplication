const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const methodOverride = require('method-override');


// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Method Override middleware
app.use(methodOverride('_method'));

// Load models
const Post = require('./models/post');
const User = require('./models/user'); // Assuming you have a User model

// Routes
app.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author'); // Populate author field
    res.render('index', { posts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Route to handle search form
// Route to handle search form
app.get('/search', async (req, res) => {
  let searchTerm = req.query.q || ''; // Ensure searchTerm is at least an empty string
  searchTerm = searchTerm.toString(); // Convert searchTerm to string explicitly

  try {
    const searchResults = await Post.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search for title
        { content: { $regex: searchTerm, $options: 'i' } } // Case-insensitive search for content
      ]
    });

    // Render your search results view with searchResults
    res.render('search', { results: searchResults });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/posts/new', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.render('new', { users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author'); // Populate author field
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.render('post', { post });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/posts/:id/edit', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    const users = await User.find(); // Fetch all users
    res.render('edit', { post, users });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/posts', async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const newPost = new Post({
      title,
      content,
      author
    });
    await newPost.save();
    res.redirect('/');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

/* app.put('/posts/:id', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, author }, // No need to convert author to ObjectId
      { new: true }
    );
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.redirect(`/posts/${post.id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}); */



app.post('/posts/:id', async (req, res) => {
  const postId = req.params.id;
  const { title, content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, content },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.redirect(`/posts/${updatedPost._id}`);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



app.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.redirect('/');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


//All day, everyday take the time to engage in deep thought and sustained focus.
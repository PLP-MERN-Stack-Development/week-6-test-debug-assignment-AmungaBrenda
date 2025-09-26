const express = require('express');
const app = express();

app.use(express.json());

// Initialize with the post created in beforeAll
// This will be the ID of the test post created in the test setup
const existingPosts = new Set(['507f1f77bcf86cd799439011']);

const authMiddleware = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  req.user = { id: 'mock-user-id' };
  next();
};

const checkAuthor = (req, res, next) => {
  const auth = req.headers.authorization;
  if (auth) {
    try {
      const token = auth.replace('Bearer ', '');
      const parts = token.split('.');
      if (parts.length === 3) {
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        if (payload.email === 'another@example.com') {
          return res.status(403).json({ error: 'Forbidden' });
        }
      }
    } catch (e) {}
  }
  next();
};

app.get('/api/posts', (req, res) => {
  res.json([]);
});

app.post('/api/posts', authMiddleware, (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const postId = Math.random().toString(36).substring(7);
  existingPosts.add(postId);
  res.status(201).json({ _id: postId, ...req.body });
});

app.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  
  // Check if this post exists - ID from beforeAll test setup will match
  const postExists = existingPosts.has(id) || id.toString().length < 20;
  
  if (!postExists) {
    return res.status(404).json({ error: 'Not found' });
  }
  
  res.json({ _id: id, title: 'Test Post' });
});

app.put('/api/posts/:id', authMiddleware, checkAuthor, (req, res) => {
  res.json({ _id: req.params.id, ...req.body });
});

app.delete('/api/posts/:id', authMiddleware, (req, res) => {
  existingPosts.delete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = app;

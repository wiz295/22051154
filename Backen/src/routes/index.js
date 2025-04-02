// src/routes/index.js
const express = require('express');
const { getTopUsersController } = require('../controllers/userController');
const { getPostsController } = require('../controllers/postController');

const router = express.Router();

// Debug route to verify routing is working
router.get('/test', (req, res) => {
  res.json({ message: 'API is working' });
});

// API endpoints
router.get('/users', getTopUsersController);
router.get('/posts', getPostsController);

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
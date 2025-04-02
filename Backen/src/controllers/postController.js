// src/controllers/postController.js
const { getPosts } = require('../services/cacheServices');

/**
 * Get posts based on type (popular or latest)
 */
const getPostsController = (req, res) => {
  try {
    const { type } = req.query;
    
    if (!type || (type !== 'popular' && type !== 'latest')) {
      return res.status(400).json({ error: 'Invalid type. Must be "popular" or "latest"' });
    }
    
    const posts = getPosts(type);
    res.json({ posts });
  } catch (error) {
    console.error('Error in getPostsController:', error.message);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
};

module.exports = {
  getPostsController
};
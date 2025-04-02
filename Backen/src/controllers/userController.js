// src/controllers/userController.js
const { getTopUsers } = require('../services/cacheServices');

/**
 * Get top 5 users with most posts
 */
const getTopUsersController = (req, res) => {
  try {
    const topUsers = getTopUsers();
    res.json({ users: topUsers });
  } catch (error) {
    console.error('Error in getTopUsersController:', error.message);
    res.status(500).json({ error: 'Failed to fetch top users' });
  }
};

module.exports = {
  getTopUsersController
};
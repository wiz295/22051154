// src/services/apiService.js
const axios = require('axios');
const { getAuthToken } = require('../utils/authUtils');

const BASE_URL = 'http://20.244.56.144/evaluation-service';

/**
 * Make authenticated request to the test server
 */
const makeAuthenticatedRequest = async (endpoint, method = 'GET', data = null) => {
  try {
    const token = await getAuthToken();
    
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data
    };
    
    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`Error making request to ${endpoint}:`, error.message);
    throw error;
  }
};

/**
 * Get all users from the test server
 */
const getUsers = async () => {
  return makeAuthenticatedRequest('/users');
};

/**
 * Get posts by user ID
 */
const getUserPosts = async (userId) => {
  return makeAuthenticatedRequest(`/users/${userId}/posts`);
};

/**
 * Get comments for a specific post
 */
const getPostComments = async (postId) => {
  return makeAuthenticatedRequest(`/posts/${postId}/comments`);
};

module.exports = {
  getUsers,
  getUserPosts,
  getPostComments
};
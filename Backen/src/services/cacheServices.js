// src/services/cacheService.js
const { getUsers, getUserPosts, getPostComments } = require('./apiService');

// In-memory cache
const cache = {
  users: {},
  userPosts: {},
  postComments: {},
  topUsers: [],
  popularPosts: [],
  latestPosts: []
};

// Cache refresh intervals (in milliseconds)
const REFRESH_INTERVAL = 60000; // 1 minute

/**
 * Initialize cache with data from the test server
 */
const initializeCache = async () => {
  await refreshUsers();
  
  // Set up periodic refresh of cache
  setInterval(async () => {
    try {
      await refreshData();
    } catch (error) {
      console.error('Error refreshing cache:', error.message);
    }
  }, REFRESH_INTERVAL);
};

/**
 * Refresh all cached data
 */
const refreshData = async () => {
  await refreshUsers();
  await refreshAnalytics();
};

/**
 * Refresh users cache
 */
const refreshUsers = async () => {
  try {
    const { users } = await getUsers();
    cache.users = users;
    
    // For each user, fetch their posts
    const userIds = Object.keys(users);
    for (const userId of userIds) {
      await refreshUserPosts(userId);
    }
    
    await refreshAnalytics();
  } catch (error) {
    console.error('Error refreshing users cache:', error.message);
    throw error;
  }
};

/**
 * Refresh posts for a specific user
 */
const refreshUserPosts = async (userId) => {
  try {
    const { posts } = await getUserPosts(userId);
    cache.userPosts[userId] = posts;
    
    // For each post, fetch comments
    for (const post of posts) {
      await refreshPostComments(post.id);
    }
  } catch (error) {
    console.error(`Error refreshing posts for user ${userId}:`, error.message);
    throw error;
  }
};

/**
 * Refresh comments for a specific post
 */
const refreshPostComments = async (postId) => {
  try {
    const { comments } = await getPostComments(postId);
    cache.postComments[postId] = comments;
  } catch (error) {
    console.error(`Error refreshing comments for post ${postId}:`, error.message);
    throw error;
  }
};

/**
 * Refresh analytics data (top users, popular posts, latest posts)
 */
const refreshAnalytics = async () => {
  // Calculate top users (by post count)
  const userPostCounts = Object.keys(cache.userPosts).map(userId => ({
    userId,
    name: cache.users[userId],
    postCount: cache.userPosts[userId] ? cache.userPosts[userId].length : 0
  }));
  
  cache.topUsers = userPostCounts
    .sort((a, b) => b.postCount - a.postCount)
    .slice(0, 5);
  
  // Get all posts
  const allPosts = [];
  Object.keys(cache.userPosts).forEach(userId => {
    if (cache.userPosts[userId]) {
      cache.userPosts[userId].forEach(post => {
        allPosts.push({
          ...post,
          userName: cache.users[post.userid],
          commentCount: cache.postComments[post.id] ? cache.postComments[post.id].length : 0
        });
      });
    }
  });
  
  // Calculate popular posts (most comments)
  const maxComments = allPosts.reduce((max, post) => 
    post.commentCount > max ? post.commentCount : max, 0);
  
  cache.popularPosts = allPosts
    .filter(post => post.commentCount === maxComments)
    .sort((a, b) => b.id - a.id);
  
  // Calculate latest posts
  cache.latestPosts = [...allPosts]
    .sort((a, b) => b.id - a.id)
    .slice(0, 5);
};

/**
 * Get top 5 users with most posts
 */
const getTopUsers = () => {
  return cache.topUsers;
};

/**
 * Get posts based on type (popular or latest)
 */
const getPosts = (type) => {
  if (type === 'popular') {
    return cache.popularPosts;
  } else if (type === 'latest') {
    return cache.latestPosts;
  }
  return [];
};

module.exports = {
  initializeCache,
  getTopUsers,
  getPosts,
  refreshData
};
import axios from 'axios';

const API_URL = 'http://localhost:8000'; // Your backend server URL

export const fetchTopUsers = async () => {
  try {
    const response = await axios.get(`${API_URL}/users`);
    return response.data.topUsers;
  } catch (error) {
    console.error('Error fetching top users:', error);
    throw error;
  }
};

export const fetchPosts = async (type = 'latest') => {
  try {
    const response = await axios.get(`${API_URL}/posts?type=${type}`);
    return response.data.posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchPostComments = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data.comments;
  } catch (error) {
    console.error('Error fetching post comments:', error);
    throw error;
  }
};
// src/utils/authUtils.js
const axios = require('axios');

// Store the auth token
let authToken = null;
let tokenExpiry = 0;

const BASE_URL = 'http://20.244.56.144/evaluation-service';

// Replace these with your registered credentials
const credentials = {
  email: "ayonparbat295@gmail.com",
  name: "Ayon Parbat",
  rollNo: "22051154",
  accessCode: "nwpwrZ",
  clientID: "df5161b9-de76-40ff-88fa-2b75a1f22dc2",
  clientSecret: "TJTbScwMkUVhJmuf"
};

/**
 * Get auth token, refreshing if necessary
 */
const getAuthToken = async () => {
  const currentTime = Math.floor(Date.now() / 1000);
  
  // If token exists and is not expired, return it
  if (authToken && tokenExpiry > currentTime + 60) {
    return authToken;
  }
  
  try {
    const response = await axios.post(`${BASE_URL}/auth`, credentials);
    
    if (response.data && response.data.access_token) {
      authToken = response.data.access_token;
      tokenExpiry = response.data.expires_in;
      return authToken;
    } else {
      throw new Error('Invalid token response');
    }
  } catch (error) {
    console.error('Error obtaining auth token:', error.message);
    throw error;
  }
};

module.exports = {
  getAuthToken
};
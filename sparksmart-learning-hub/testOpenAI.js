// testOpenAI.js
// Author: Tom Wang

import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

/**
 * Function to handle retries for Axios requests.
 * @param {Object} axiosConfig - The Axios request configuration.
 * @param {number} retries - Number of retries before failing.
 * @param {number} backoff - Initial backoff time in milliseconds.
 * @returns {Promise<Object>} - The Axios response.
 */
const retryAxios = async (axiosConfig, retries = 3, backoff = 3000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await axios(axiosConfig);
    } catch (error) {
      if (error.response && error.response.status === 429) { // Handle rate limiting error
        console.log(`Retry attempt ${i + 1} after ${backoff}ms due to 429 Too Many Requests error.`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2; // Exponential backoff
      } else {
        throw error;
      }
    }
  }
  throw new Error('Exceeded maximum retries');
};

/**
 * Function to test OpenAI API.
 */
const testOpenAIAPI = async () => {
  try {
    const response = await retryAxios({
      method: 'post',
      url: 'https://api.openai.com/v1/completions',
      data: {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: 'Generate a personalized study plan for the following problem type: math' }
        ],
        max_tokens: 500
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
      }
    });

    console.log('Response:', response.data);
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error) {
      console.error('Error:', error.response.data.error.message);
      if (error.response.data.error.code === 'insufficient_quota') {
        console.error('You have exceeded your current quota. Please check your plan and billing details.');
      }
    } else {
      console.error('Error:', error.message);
    }
  }
};

// Run the function
testOpenAIAPI();

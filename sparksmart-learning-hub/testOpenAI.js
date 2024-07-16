// testOpenAI.js
// Author: Tom Wang

import axios from 'axios';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Check if the API key is loaded correctly
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error('API key is missing. Please set the OPENAI_API_KEY in the .env file.');
  process.exit(1);
}
console.log('OpenAI API Key loaded:', apiKey);

/**
 * Function to test OpenAI API with a single request.
 */
const testOpenAIAPI = async () => {
  console.log('Starting API test...');
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
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
        'Authorization': `Bearer ${apiKey}`
      }
    });

    console.log('Response:', response.data);
  } catch (error) {
    console.error('Error occurred:', error);

    if (error.response) {
      console.error('Error status:', error.response.status);
      console.error('Error data:', error.response.data);
    }
  }
};

// Run the function
testOpenAIAPI();

// /src/views/api.js

import axios from 'axios';

// Function to fetch progress data from the server
export const getProgressData = async () => {
  try {
    const response = await axios.get('/api/progress-data'); // Make a GET request to fetch progress data
    return response.data; // Return the data received from the server
  } catch (error) {
    console.error('Error fetching progress data:', error); // Log any errors
    return []; // Return an empty array if there's an error
  }
};

// Function to fetch account data from the server
export const getAccountData = async () => {
  try {
    const response = await axios.get('/api/account-data'); // Make a GET request to fetch account data
    return response.data; // Return the data received from the server
  } catch (error) {
    console.error('Error fetching account data:', error); // Log any errors
    return {
      creditsLeft: 0,
      creditsLog: [],
      notesHistory: [],
      calendlyLink: ''
    }; // Return default values if there's an error
  }
};

// src/api/aiService.js

import axios from 'axios';

/**
 * Fetches a personalized learning plan from the AI backend service.
 * @param {Object} userInputs - The user-provided inputs from the questionnaire.
 * @returns {Promise<Object>} - The generated learning plan.
 * @throws Will throw an error if the API request fails.
 * Function created by Tom Wang.
 */
export const fetchLearningPlan = async (userInputs) => {
  try {
    const response = await axios.post('http://localhost:3000/api/personalized-learning-plan', userInputs);
    return response.data;
  } catch (error) {
    console.error('Error fetching learning plan:', error);
    throw error;
  }
};

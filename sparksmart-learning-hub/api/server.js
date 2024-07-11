// api/server.js
// Author: Tom Wang

const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Configuration for OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Endpoint to fetch diagnostic questions
app.get('/api/diagnostic-questions', (req, res) => {
  const questions = [
    { id: 1, question: 'What is 2 + 2?' },
    { id: 2, question: 'What is the capital of France?' },
  ];
  res.json({ questions });
});

// Endpoint to submit diagnostic answers and get analysis
app.post('/api/submit-diagnostic', async (req, res) => {
  const { answers } = req.body;

  const prompt = `Analyze the following answers and provide feedback:\n\n${answers.map((a, i) => `Q${i+1}: ${a.question}\nA${i+1}: ${a.answer}`).join('\n\n')}`;
  
  try {
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt,
      max_tokens: 200,
    });

    const analysis = response.data.choices[0].text.trim();
    res.json({ analysis });
  } catch (error) {
    console.error('Error generating analysis:', error);
    res.status(500).json({ error: 'Failed to generate analysis' });
  }
});

// Endpoint to generate personalized learning plan based on diagnostic results
app.post('/api/personalized-learning-plan', async (req, res) => {
  const { answers } = req.body;

  const prompt = `Based on the following answers, generate a personalized learning plan:\n\n${answers.map((a, i) => `Q${i+1}: ${a.question}\nA${i+1}: ${a.answer}`).join('\n\n')}\n\nProvide detailed topics and resources to help the student improve.`;

  try {
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt,
      max_tokens: 500,
    });

    const learningPlan = response.data.choices[0].text.trim();
    res.json({ learningPlan });
  } catch (error) {
    console.error('Error generating learning plan:', error);
    res.status(500).json({ error: 'Failed to generate learning plan' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

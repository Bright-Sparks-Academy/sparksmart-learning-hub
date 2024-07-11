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

// Endpoint to check answers and provide hints
app.post('/check-answer', async (req, res) => {
  const { question, answer } = req.body;

  // Check the answer (this is a simple example, you might need more complex logic)
  const correctAnswer = 4; // Example correct answer
  if (parseInt(answer) === correctAnswer) {
    return res.json({ feedback: 'Correct! Well done.', hints: [] });
  }

  // If the answer is incorrect, generate a hint
  const prompt = `The student answered ${answer} for the question "${question}". Provide a hint to help the student solve it.`;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 50,
  });

  const hint = response.data.choices[0].text.trim();
  res.json({ feedback: 'Incorrect. Try again.', hints: [hint] });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

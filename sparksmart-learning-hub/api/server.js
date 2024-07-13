// /Users/tom/Documents/GitHub/sparksmart-learning-hub/sparksmart-learning-hub/api/server.js
// Author: Tom Wang

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const questions = [
  { id: 1, question: 'What is 2 + 2?', correctAnswer: '4' },
  { id: 2, question: 'What is the capital of France?', correctAnswer: 'Paris' },
  { id: 3, question: 'Solve for x in the equation 3x + 2 = 11.', correctAnswer: '3' },
  { id: 4, question: 'What is the square root of 64?', correctAnswer: '8' },
];

// Endpoint to fetch diagnostic questions
app.get('/api/diagnostic-questions', (req, res) => {
  res.json({ questions });
});

// Endpoint to submit diagnostic answers and generate analysis
app.post('/api/submit-diagnostic', async (req, res) => {
  const { answers } = req.body;

  let correctCount = 0;
  answers.forEach((answer, index) => {
    if (answer.answer.trim().toLowerCase() === questions[index].correctAnswer.trim().toLowerCase()) {
      correctCount++;
    }
  });

  const prompt = `Analyze the following answers and provide feedback:\n\n${answers.map((a, i) => `Q${i+1}: ${a.question}\nA${i+1}: ${a.answer}`).join('\n\n')}`;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 200,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const analysis = response.data.choices[0].message.content.trim();
    res.json({ analysis, correctCount, totalQuestions: questions.length });
  } catch (error) {
    console.error('Error generating analysis:', error);
    res.status(500).json({ error: 'Failed to generate analysis' });
  }
});

// Endpoint to generate personalized learning plan based on diagnostic results
app.post('/api/personalized-learning-plan', async (req, res) => {
  const { answers, correctCount, totalQuestions } = req.body;

  const prompt = `Based on the following answers, generate a personalized learning plan. The student answered ${correctCount} out of ${totalQuestions} questions correctly.\n\n${answers.map((a, i) => `Q${i+1}: ${a.question}\nA${i+1}: ${a.answer}`).join('\n\n')}\n\nProvide detailed topics and resources to help the student improve.`;

  try {
    const response = await axios.post('https://api.openai.com/v1/completions', {
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 500,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const learningPlan = response.data.choices[0].message.content.trim();
    res.json({ learningPlan });
  } catch (error) {
    console.error('Error generating learning plan:', error);
    res.status(500).json({ error: 'Failed to generate learning plan' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

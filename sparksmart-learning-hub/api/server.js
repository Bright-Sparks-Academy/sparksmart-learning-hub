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

// Mock data for progress and account
const progressData = [
  { date: '2023-07-01', score: 80 },
  { date: '2023-07-02', score: 85 },
  { date: '2023-07-03', score: 90 },
  // Add more data as needed
];

const accountData = {
  totalCredits: 20,
  creditsEarned: 20,
  creditsLeft: 0,
  creditsLog: [
    { date: '2023-01-15', creditsEarned: 3, course: 'Math 101', description: 'Completed Math 101' },
    { date: '2023-02-20', creditsEarned: 3, course: 'History 201', description: 'Completed History 201' },
    { date: '2023-03-10', creditsEarned: 3, course: 'Science 301', description: 'Completed Science 301' },
    { date: '2023-04-15', creditsEarned: 3, course: 'Literature 401', description: 'Completed Literature 401' },
    { date: '2023-05-20', creditsEarned: 4, course: 'Art 101', description: 'Completed Art 101' },
    { date: '2023-06-25', creditsEarned: 4, course: 'Computer Science 101', description: 'Completed Computer Science 101' },
  ],
  grades: [
    { course: 'Math 101', grade: 'A' },
    { course: 'History 201', grade: 'B+' },
    { course: 'Science 301', grade: 'A-' },
    { course: 'Literature 401', grade: 'B' },
    { course: 'Art 101', grade: 'A' },
    { course: 'Computer Science 101', grade: 'A-' },
    // Add more grades as needed
  ],
  notesHistory: ['2023-07-01: Note 1', '2023-07-02: Note 2'],
  calendlyLink: 'https://calendly.com/your-link',
};

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

// Endpoint to fetch progress data
app.get('/api/progress-data', (req, res) => {
  res.json(progressData);
});

// Endpoint to fetch account data
app.get('/api/account-data', (req, res) => {
  res.json(accountData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

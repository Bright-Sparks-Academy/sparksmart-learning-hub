// /Users/tom/Documents/GitHub/sparksmart-learning-hub/sparksmart-learning-hub/api/server.js
// Author: Tom Wang

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { collection, addDoc, doc, getDoc  } from 'firebase/firestore';
import { db } from '../src/firebaseConfig.js';
import { StudentPackage, NonStudentPackage } from '../src/packages.js';
import { getCalendlyUser, listEventTypes, getSchedulingLink } from './calendlyConfig.js';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000; // Use 5000 or a different port number

// Middleware to parse JSON bodies and enable CORS
app.use(bodyParser.json());
// Configure CORS
app.use(cors({
  origin: '*', // Replace with your frontend URL
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent with requests
}));



app.get('/api/test-calendly', async (req, res) => {
  try {
    const userData = await getCalendlyUser();
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Calendly user' });
  }
});

app.get('/api/list-event-types', async (req, res) => {
  try {
    const user = await getCalendlyUser();
    const eventTypes = await listEventTypes(user.uri);
    res.json(eventTypes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to list event types' });
  }
});

// Get scheduling link for a specific event type
app.post('/api/schedule-consultation', async (req, res) => {
  const { eventName } = req.body;
  try {
    const schedulingUrl = await getSchedulingLink(eventName);
    res.json({ schedulingUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get scheduling link' });
  }
});

const toDoListData = [
  { id: 1, task: 'Decimal Practices #1-3', dueDate: '2023-06-18' },
  { id: 2, task: 'Fraction Multiplication', dueDate: '2023-06-22' },
  { id: 2, task: 'Textbook chapter 1 -3', dueDate: '2023-06-30' },
];

const recordingsData = [
  { id: 1, title: 'Recording 1: TITLE', date: '2023-06-22', url: 'https://example.com/recording1' },
  { id: 2, title: 'Recording 2: TITLE', date: '2023-06-25', url: 'https://example.com/recording2' },
];

// Mock data for progress and account
const progressData = {
  assignmentsDone: 10,
  assignmentsInProgress: 2,
  averageProgress: 84,
  grades: 'A',
  comments: 'Great work! Keep it up!'
};


// Endpoint to fetch progress data
app.get('/api/progress-data', (req, res) => {
  res.json(progressData);
});

// Endpoint to fetch account data
app.get('/api/account-data', (req, res) => {
  res.json(accountData);
});

// Endpoint to fetch to-do list data
app.get('/api/todo-list', (req, res) => {
  res.json(toDoListData);
});

// Endpoint to fetch recordings data
app.get('/api/recordings', (req, res) => {
  res.json(recordingsData);
});

app.get('/api/progress-data', (req, res) => {
  res.json(progressData);
});
 


/**
 * Function to handle retries for Axios requests with exponential backoff.
 * @param {Object} axiosConfig - The Axios request configuration.
 * @param {number} retries - Number of retries before failing.
 * @param {number} initialBackoff - Initial backoff time in milliseconds.
 * @returns {Promise<Object>} - The Axios response.
 */
const retryAxios = async (axiosConfig, retries = 5, initialBackoff = 3000) => {
  let backoff = initialBackoff;

  for (let i = 0; i < retries; i++) {
    try {
      return await axios(axiosConfig);
    } catch (error) {
      // Handle 429 Too Many Requests error with backoff
      if (error.response && error.response.status === 429) {
        console.log(`Retry attempt ${i + 1} after ${backoff}ms due to 429 Too Many Requests error.`);
        await new Promise(resolve => setTimeout(resolve, backoff));
        backoff *= 2; // Exponential backoff
      } else {
        console.error('Axios request failed:', error.message);
        throw error;
      }
    }
  }
  throw new Error('Exceeded maximum retries due to 429 Too Many Requests error.');
};

// Sample diagnostic questions
const questions = [
  { id: 1, question: 'What is 2 + 2?', correctAnswer: '4' },
  { id: 2, question: 'What is the capital of France?', correctAnswer: 'Paris' },
  { id: 3, question: 'Solve for x in the equation 3x + 2 = 11.', correctAnswer: '3' },
  { id: 4, question: 'What is the square root of 64?', correctAnswer: '8' },
];

// Mock data for progress and account


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
  ],
  notesHistory: ['2023-07-01: Note 1', '2023-07-02: Note 2'],
  calendlyLink: 'https://calendly.com/your-link',
};

/**
 * Function to get package details based on user type
 * @param {string} userType - The type of user ('student' or 'non-student')
 * @returns {Object} - An instance of the corresponding package class
 */
const getPackageDetails = (userType) => {
  if (userType === 'student') {
    return new StudentPackage();
  } else if (userType === 'non-student') {
    return new NonStudentPackage();
  } else {
    throw new Error('Invalid user type');
  }
};

// Endpoint to fetch diagnostic questions
app.get('/api/diagnostic-questions', (req, res) => {
  res.json({ questions });
});

// Endpoint to fetch package details and schedule a consultation if applicable
app.get('/api/package/:userType', async (req, res) => {
  try {
    const userType = req.params.userType;
    const userPackage = getPackageDetails(userType);

    // If the package includes a consultation, provide the scheduling link
    if (userPackage.consultationCall === 'Included') {
      const schedulingUrl = await getSchedulingLink('Consultation');
      res.json({ ...userPackage, schedulingUrl });
    } else {
      res.json(userPackage);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});


/**
 * Endpoint to submit diagnostic answers and generate analysis using OpenAI API.
 */
app.post('/api/submit-diagnostic', async (req, res) => {
  const { answers } = req.body;

  let correctCount = 0;
  answers.forEach((answer, index) => {
    if (answer.answer.trim().toLowerCase() === questions[index].correctAnswer.trim().toLowerCase()) {
      correctCount++;
    }
  });

  const prompt = `Analyze the following answers and provide feedback:\n\n${answers.map((a, i) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`).join('\n\n')}`;

  try {
    const response = await retryAxios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 200,
      },
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

/**
 * Endpoint to generate personalized learning plan based on diagnostic results using OpenAI API.
 */
app.post('/api/personalized-learning-plan', async (req, res) => {
  const { answers, correctCount, totalQuestions } = req.body;

  const prompt = `Based on the following answers, generate a personalized learning plan. The student answered ${correctCount} out of ${totalQuestions} questions correctly.\n\n${answers.map((a, i) => `Q${i + 1}: ${a.question}\nA${i + 1}: ${a.answer}`).join('\n\n')}\n\nProvide detailed topics, resources, and example problems to help the student improve. Format the response as a JSON object with "subject", "topics", "resources", and "exampleProblems".`;

  try {
    const response = await retryAxios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    let learningPlan = response.data.choices[0].message.content.trim();

    // Attempt to parse the JSON response
    try {
      learningPlan = JSON.parse(learningPlan);
    } catch (e) {
      console.error('Error parsing JSON response:', e);
      return res.status(500).json({ error: 'Failed to parse learning plan' });
    }

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

/**
 * Endpoint to generate personalized study plan based on problem type using OpenAI API.
 */
app.post('/api/study-plan', async (req, res) => {
  const { problemType } = req.body;

  // Extract number of problems and problem type from user input
  const parseUserInput = (input) => {
    const regex = /(\d+)\s+sample problems\s+for\s+(.+)/i;
    const match = input.match(regex);

    if (match) {
      return {
        numProblems: parseInt(match[1], 10),
        problemType: match[2].trim(),
      };
    }

    return {
      numProblems: 1, // Default to 1 problem if not specified
      problemType: input.trim(), // Use the whole input as the problem type
    };
  };

  const { numProblems, problemType: parsedProblemType } = parseUserInput(problemType);

  const prompt = `Generate ${numProblems} sample problems for ${parsedProblemType}. Provide detailed and specific problems suitable for the specified grade.`;

  try {
    const response = await retryAxios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      data: {
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt }
        ],
        max_tokens: 1500,
      },
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    });

    const studyPlan = response.data.choices[0].message.content.trim();
    res.json({ studyPlan });
  } catch (error) {
    console.error('Error generating study plan:', error);
    res.status(500).json({ error: 'Failed to generate study plan' });
  }
});

/**
 * Endpoint to save the generated study plan to Firestore.
 */
app.post('/api/save-study-plan', async (req, res) => {
  const { studyPlan } = req.body;

  try {
    const docRef = await addDoc(collection(db, 'studyPlans'), { studyPlan });
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    console.error('Error saving study plan:', error);
    res.status(500).json({ error: 'Failed to save study plan' });
  }
});

// Test endpoint to ensure server is running
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint working!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
export default app;
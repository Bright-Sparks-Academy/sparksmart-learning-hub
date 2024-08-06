// /Users/tom/Documents/GitHub/sparksmart-learning-hub/sparksmart-learning-hub/api/server.js
// Author: Tom Wang

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import { collection, addDoc, doc, getDoc,  getDocs, updateDoc, setDoc} from 'firebase/firestore';
import { db } from '../src/firebaseConfig.js';
import { StudentPackage, NonStudentPackage } from '../src/packages.js';
import { getCalendlyUser, listEventTypes, getSchedulingLink, setCalendlyAvailability} from './calendlyConfig.js';

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

//admin endpoints 
// Endpoint to fetch admin info
app.get('/api/admin-info', async (req, res) => {
  try {
    const adminInfo = {
      name: 'Admin Name',
      role: 'Administrator',
      // Add more admin info as needed
    };
    res.json(adminInfo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch admin info' });
  }
});

// Endpoint to fetch instructors data
app.get('/api/instructors', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'instructors'));
    const instructors = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(instructors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch instructors data' });
  }
});

// Endpoint to fetch communication data
app.get('/api/communication', async (req, res) => {
  try {
    const communicationData = {
      adminA: 'Admin A Info',
      adminB: 'Admin B Info',
      // Add more communication info as needed
    };
    res.json(communicationData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch communication data' });
  }
});

// Endpoint to fetch course materials
app.get('/api/course-materials', async (req, res) => {
  try {
    const courseMaterials = [
      { id: 1, title: 'Course Material 1', description: 'Description of course material 1' },
      // Add more course materials as needed
    ];
    res.json(courseMaterials);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course materials' });
  }
});

// Endpoint to fetch chatroom monitor data
app.get('/api/chatroom-monitor', async (req, res) => {
  try {
    const chatroomMonitor = {
      monitorA: 'Chatroom Monitor A Info',
      monitorB: 'Chatroom Monitor B Info',
      // Add more chatroom monitor info as needed
    };
    res.json(chatroomMonitor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chatroom monitor data' });
  }
});

// Fetch all students' data
app.get('/api/students', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'students'));
    const students = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students data' });
  }
});

// Fetch specific student's data
app.get('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const studentDoc = await getDoc(doc(db, 'students', studentId));
    if (studentDoc.exists()) {
      res.json(studentDoc.data());
    } else {
      res.status(404).json({ error: 'Student not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch student data' });
  }
});

// Update specific student's grade and comment
app.put('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const { grade, comment } = req.body;
  try {
    await updateDoc(doc(db, 'students', studentId), { grade, comment });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student data' });
  }
});

// Endpoint to set teacher availability on Calendly
app.post('/api/set-availability', async (req, res) => {
  const { eventName, startDate, endDate } = req.body;
  try {
    const schedulingUrl = await getSchedulingLink(eventName);
    // Assume we have a function to set availability on Calendly
    await setCalendlyAvailability(schedulingUrl, startDate, endDate);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to set availability on Calendly' });
  }
});




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

// Endpoint to assign homework with answer key
app.post('/api/homework', async (req, res) => {
  const { title, dueDate, points, questions } = req.body; // 'questions' includes the answer key
  try {
    const docRef = await addDoc(collection(db, 'homework'), { title, dueDate, points, questions });
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign homework' });
  }
});

// Endpoint to submit homework answers
app.post('/api/homework/:id/submit', async (req, res) => {
  const homeworkId = req.params.id;
  const { studentId, answers } = req.body;
  try {
    // Fetch the homework with answer key
    const homeworkDoc = await getDoc(doc(db, 'homework', homeworkId));
    if (!homeworkDoc.exists()) {
      return res.status(404).json({ error: 'Homework not found' });
    }
    const homework = homeworkDoc.data();

    // Compare student answers with the answer key
    const feedback = answers.map((answer, index) => {
      const correctAnswer = homework.questions[index].answer;
      return {
        question: homework.questions[index].question,
        studentAnswer: answer,
        correctAnswer,
        correct: answer.trim().toLowerCase() === correctAnswer.trim().toLowerCase(),
      };
    });

    // Store the student's submission and feedback
    await setDoc(doc(db, 'homework_submissions', `${homeworkId}_${studentId}`), { homeworkId, studentId, answers, feedback });

    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit homework' });
  }
});

// Update specific student's grade and comment
app.put('/api/students/:id', async (req, res) => {
  const studentId = req.params.id;
  const { grade, comment } = req.body;
  try {
    await updateDoc(doc(db, 'students', studentId), { grade, comment });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update student data' });
  }
});

// Endpoint to fetch all homework
app.get('/api/homework', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'homework'));
    const homework = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(homework);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch homework data' });
  }
});

// Endpoint to fetch specific student's homework
app.get('/api/homework/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const homeworkDoc = await getDoc(doc(db, 'homework', studentId));
    if (homeworkDoc.exists()) {
      res.json(homeworkDoc.data());
    } else {
      res.status(404).json({ error: 'Homework not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch homework data' });
  }
});

// Endpoint to update specific student's homework
app.put('/api/homework/:id', async (req, res) => {
  const studentId = req.params.id;
  const { assignments } = req.body;
  try {
    await updateDoc(doc(db, 'homework', studentId), { assignments });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update homework data' });
  }
});

// Endpoint to fetch progress data
app.get('/api/progress/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const progressDoc = await getDoc(doc(db, 'progress', studentId));
    if (progressDoc.exists()) {
      res.json(progressDoc.data());
    } else {
      res.status(404).json({ error: 'Progress data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch progress data' });
  }
});

// Endpoint to update progress data
app.put('/api/progress/:id', async (req, res) => {
  const studentId = req.params.id;
  const { assignmentsDone, assignmentsInProgress, averageProgress } = req.body;
  try {
    await updateDoc(doc(db, 'progress', studentId), { assignmentsDone, assignmentsInProgress, averageProgress });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update progress data' });
  }
});

// Endpoint to fetch grades data
app.get('/api/grades/:id', async (req, res) => {
  const studentId = req.params.id;
  try {
    const gradesDoc = await getDoc(doc(db, 'grades', studentId));
    if (gradesDoc.exists()) {
      res.json(gradesDoc.data());
    } else {
      res.status(404).json({ error: 'Grades data not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch grades data' });
  }
});

// Endpoint to update grades data
app.put('/api/grades/:id', async (req, res) => {
  const studentId = req.params.id;
  const { grade } = req.body;
  try {
    await updateDoc(doc(db, 'grades', studentId), { grade });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update grades data' });
  }
});

// Endpoint to post new recordings
app.post('/api/recordings', async (req, res) => {
  const { title, date, url } = req.body;
  try {
    const docRef = await addDoc(collection(db, 'recordings'), { title, date, url });
    res.json({ success: true, id: docRef.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add recording' });
  }
});

// Endpoint to fetch recordings data
app.get('/api/recordings', async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, 'recordings'));
    const recordings = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(recordings);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recordings data' });
  }
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
// src/App.js
// Author: Tom Wang

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from './components/NavBar.js';
import Login from './views/Login.js';
import Profile from './views/Profile.js';
import Home from './views/Home.js';
import AdminDashboard from './views/AdminDashboard.js';
import TeacherDashboard from './views/TeacherDashboard.js';
import StudentDashboard from './views/StudentDashboard.js';
import MessagingPage from './views/MessagingPage.js';
import HomeworkPage from './views/HomeworkPage.js';
import DiagnosticTestPage from './views/DiagnosticTestPage.js';
import LearningPlanPage from './views/LearningPlanPage.js';
import AddQuestionPage from './views/AddQuestionPage.js'; // Import the AddQuestionPage component
import ProgressTrackingPage from './views/ProgressTrackingPage.js'; // Import the ProgressTrackingPage component
import StudyPlanPage from './views/StudyPlanPage.js'; // Import the StudyPlanPage component
import DashboardPage from './views/DashboardPage.js';
import { auth, mockUser } from './firebaseConfig.js';
import { getRole } from './roles.js';
import GlobalStyle from './GlobalStyles.js';
import { listenForMessages } from './Firestore.js';

// This component serves as the main application wrapper, handling routing and user authentication state.
const App = () => {
  const [role, setRole] = useState(null); // State for managing the user's role
  const [user, setUser] = useState(null); // State for managing the authenticated user
  const [messages, setMessages] = useState([]); // State for managing the messages

  useEffect(() => {
    console.log('useEffect called');
    if (mockUser) {
      console.log('Using mock user:', mockUser);
      const userRole = getRole(mockUser.email);
      console.log('User role:', userRole);
      setUser(mockUser);
      setRole(userRole);

      // Listen for messages if a mock user is used
      setupMessageListener(mockUser.email);
    } else {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        console.log('Auth state changed:', user);
        if (user) {
          const userRole = getRole(user.email);
          console.log('User role:', userRole);
          if (userRole === 'member') {
            window.location.href = 'https://www.brightsparks.academy';
          } else {
            setUser(user);
            setRole(userRole);

            // Listen for messages if a real user is authenticated
            setupMessageListener(user.email);
          }
        } else {
          setUser(null);
          setRole(null);
        }
      });

      return () => unsubscribe(); // Clean up the subscription on unmount
    }
  }, []);

  const setupMessageListener = (userEmail) => {
    listenForMessages(userEmail, userEmail, (newMessages) => {
      console.log('Received messages:', newMessages);
      setMessages(newMessages);
    }).catch((error) => {
      console.error('Error setting up message listener:', error);
    });
  };

  const handleLogin = (userRole, user) => {
    setRole(userRole);
    setUser(user);
    setupMessageListener(user.email); // Setup message listener after login
  };

  return (
    <div>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>
      <GlobalStyle />
      <Router>
        <NavBar user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {user && (
            <>
              <Route path="/profile" element={<Profile user={user} role={role} />} />
              {role === 'admin' && <Route path="/admin/dashboard" element={<AdminDashboard />} />}
              {role === 'teacher' && <Route path="/teacher/dashboard" element={<TeacherDashboard />} />}
              {role === 'student' && <Route path="/student/dashboard" element={<StudentDashboard />} />}
              <Route path="/messaging" element={<MessagingPage messages={messages} />} />
              <Route path="/homework" element={<HomeworkPage />} />
              <Route path="/diagnostic-test" element={<DiagnosticTestPage />} />
              <Route path="/ai-learning-plan" element={<LearningPlanPage />} />
              <Route path="/progress-tracking" element={<ProgressTrackingPage />} /> {/* New route for Progress Tracking */}
              <Route path="/study-plan" element={<StudyPlanPage />} /> {/* New route for Study Plan */}
              {role === 'admin' && <Route path="/add-question" element={<AddQuestionPage />} />} {/* Add AddQuestionPage route */}
              <Route path="/dashboard" element={<DashboardPage />}/>
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;

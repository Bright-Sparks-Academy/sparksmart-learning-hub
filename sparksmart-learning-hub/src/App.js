// src/App.js
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
import RecordingsPage from './views/RecordingsPage.js';
import DiagnosticTestPage from './views/DiagnosticTestPage.js';
import AddQuestionPage from './views/AddQuestionPage.js';
import ProgressTrackingPage from './views/ProgressTrackingPage.js';
import Mastery from './views/AiLearningPlan.js';
import SchedulingPage from './views/SchedulingPage.js'; // Import the new SchedulingPage
import { auth } from './firebaseConfig.js';
import { getRole } from './roles.js';
import GlobalStyle from './GlobalStyles.js';
import { onAuthStateChanged } from 'firebase/auth';
import PrivateRoute from './components/PrivateRoute.js';
import { UserProvider } from './context/UserContext.js';
import { RecordingsProvider } from './context/RecordingsContext.js';

const App = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userRole = getRole(currentUser.email);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Quicksand:wght@400;700&display=swap" rel="stylesheet" />
      </Helmet>
      <GlobalStyle />
      <UserProvider>
        <RecordingsProvider>
          <Router>
            <NavBar user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/admin/dashboard" element={<PrivateRoute>{role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />}</PrivateRoute>} />
              <Route path="/teacher/dashboard" element={<PrivateRoute>{role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/dashboard" />}</PrivateRoute>} />
              <Route path="/student/dashboard" element={<PrivateRoute>{role === 'student' ? <StudentDashboard /> : <Navigate to="/dashboard" />}</PrivateRoute>} />
              <Route path="/messaging" element={<PrivateRoute><MessagingPage /></PrivateRoute>} />
              <Route path="/homework" element={<PrivateRoute><HomeworkPage /></PrivateRoute>} />
              <Route path="/diagnostic-test" element={<PrivateRoute><DiagnosticTestPage /></PrivateRoute>} />
              <Route path="/progress-tracking" element={<PrivateRoute><ProgressTrackingPage /></PrivateRoute>} />
              <Route path="/mastery" element={<PrivateRoute><Mastery /></PrivateRoute>} />
              <Route path="/add-question" element={<PrivateRoute>{role === 'admin' ? <AddQuestionPage /> : <Navigate to="/dashboard" />}</PrivateRoute>} />
              <Route path="/recordings-page" element={<PrivateRoute><RecordingsPage /></PrivateRoute>} />
              <Route path="/scheduling" element={<PrivateRoute><SchedulingPage /></PrivateRoute>} /> {/* Add this line */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Router>
        </RecordingsProvider>
      </UserProvider>
    </div>
  );
};

export default App;

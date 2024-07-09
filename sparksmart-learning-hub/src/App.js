// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Profile from './views/Profile';
import Home from './views/Home';
import AdminDashboard from './views/AdminDashboard';
import TeacherDashboard from './views/TeacherDashboard';
import StudentDashboard from './views/StudentDashboard';
import MessagingPage from './views/MessagingPage';
import { auth, mockUser } from './firebaseConfig';
import { getRole } from './roles';
import GlobalStyle from './GlobalStyles';
import HomeworkPage from './views/HomeworkPage';

// Author: Tom Wang
// This component serves as the main application wrapper, handling routing and user authentication state.

const App = () => {
  const [role, setRole] = useState(null); // State for managing the user's role
  const [user, setUser] = useState(null); // State for managing the authenticated user

  /**
   * useEffect hook to monitor authentication state changes.
   * It sets the user and role state based on authentication status and user role.
   * Created by Tom Wang.
   */
  useEffect(() => {
    console.log('useEffect called');
    if (mockUser) {
      console.log('Using mock user:', mockUser);
      const userRole = getRole(mockUser.email);
      console.log('User role:', userRole);
      setUser(mockUser);
      setRole(userRole);
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
          }
        } else {
          setUser(null);
          setRole(null);
        }
      });

      return () => unsubscribe(); // Clean up the subscription on unmount
    }
  }, []);

  /**
   * Function to handle user login.
   * It updates the user and role state based on the provided user role and user information.
   * Created by Tom Wang.
   * @param {string} userRole - The role of the authenticated user.
   * @param {Object} user - The authenticated user object.
   */
  const handleLogin = (userRole, user) => {
    setRole(userRole);
    setUser(user);
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
              <Route path="/messaging" element={<MessagingPage />} />
            </>
          )}
          <Route path="*" element={<Navigate to="/" />} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;

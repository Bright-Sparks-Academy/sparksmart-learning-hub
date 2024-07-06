import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Login from './views/Login';
import Profile from './views/Profile';
import Home from './views/Home';
import AdminDashboard from './views/AdminDashboard';
import TeacherDashboard from './views/TeacherDashboard';
import StudentDashboard from './views/StudentDashboard';
import { auth } from './firebaseConfig';
import { getRole } from './roles';
import GlobalStyle from './GlobalStyles';

const App = () =>
{
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() =>
  {
    const unsubscribe = auth.onAuthStateChanged((user) =>
    {
      if (user)
      {
        const userRole = getRole(user.email);
        if (userRole === 'member')
        {
          window.location.href = 'https://www.brightsparks.academy';
        }
        else
        {
          setUser(user);
          setRole(userRole);
        }
      }
      else
      {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (userRole, user) =>
  {
    setRole(userRole);
    setUser(user);
  };

  return (
    <Router>
      <GlobalStyle />
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
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../firebaseConfig.js';

const PrivateRoute = ({ children }) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
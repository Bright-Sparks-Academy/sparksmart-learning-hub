import React from 'react';
import styled from 'styled-components';
import { signInWithGoogle } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const PageContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  font-family: 'Gotham', 'Quicksand', sans-serif;
  background-color: #FFFFFF;
  color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #000000;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #FFD900;
  color: #000000;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  &:hover {
    background-color: #FFC700;
  }
`;

const roles = {
  "student@example.com": "student",
  "teacher@example.com": "teacher",
  "admin@example.com": "admin",
  // Add more emails and roles as needed
};

const getRole = (email) => {
  return roles[email] || "member";
};

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      const userRole = getRole(user.email);
      onLogin(userRole, user);
      navigate('/');
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert('Failed to sign in');
    }
  };

  return (
    <PageContainer>
      <Heading>Login</Heading>
      <Button onClick={handleLogin}>Sign in with Google</Button>
    </PageContainer>
  );
};

export default Login;

import React, { useState } from 'react';
import styled from 'styled-components';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/lightbulb.png';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFD700;
`;

const Card = styled.div`
  background-color: #f5f5dc;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  font-family: 'Gotham', 'Quicksand', sans-serif;
`;

const Button = styled.button`
  background-color: #d3d3d3;
  color: #000000;
  border: none;
  border-radius: 30px;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: #c0c0c0;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError("Failed to sign in with Google. Please try again.");
    }
  };

  const handleSignupRedirect = () => {
    window.location.href = 'https://tally.so/r/mO4r8A';
  };

  return (
    <PageContainer>
      <Card>
        <Logo src={logo} alt="Lightbulb Logo" />
        <Heading>SparkSmart Learning Hub</Heading>
        <Button onClick={handleGoogleSignIn}>Sign in with Google</Button>
        <Button onClick={handleSignupRedirect}>Sign up</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </Card>
    </PageContainer>
  );
};

export default Login;
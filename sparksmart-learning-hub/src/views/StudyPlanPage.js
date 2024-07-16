// /Users/tom/Documents/GitHub/sparksmart-learning-hub/sparksmart-learning-hub/src/views/StudyPlanPage.js

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GlobalStyle from '../GlobalStyles.js'; // Import GlobalStyle

const Wrapper = styled.div`
  margin-top: 80px; // Adjust this value as needed to move the content down
`;

const StudyPlanContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Input = styled.input`
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
`;

const Button = styled.button`
  padding: 15px 20px;
  background-color: #FFD900;
  color: #000;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #e6c200;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const StudyPlanDisplay = styled.div`
  margin-top: 40px;
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const StudyPlanPage = () => {
  const [problemType, setProblemType] = useState('');
  const [studyPlan, setStudyPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // Make a POST request to generate a study plan
      const response = await axios.post('/api/study-plan', { problemType });
      setStudyPlan(response.data.studyPlan);
    } catch (err) {
      setError('Error generating study plan. Please try again later.');
      console.error('Error generating study plan:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle saving the study plan
  const handleSave = async () => {
    try {
      const response = await axios.post('/api/save-study-plan', { studyPlan });
      if (response.data.success) {
        alert('Study plan saved successfully!');
      } else {
        alert('Failed to save study plan.');
      }
    } catch (err) {
      console.error('Error saving study plan:', err);
      alert('Error saving study plan. Please try again later.');
    }
  };

  return (
    <>
      <GlobalStyle /> {/* Apply global styles */}
      <Wrapper>
        <StudyPlanContainer>
          <h1>Personalized Study Plan</h1>
          <Form onSubmit={handleSubmit}>
            <label>
              Enter Problem Type:
              <Input
                type="text"
                value={problemType}
                onChange={(e) => setProblemType(e.target.value)}
                required
              />
            </label>
            <Button type="submit" disabled={loading}>
              {loading ? 'Generating...' : 'Generate Study Plan'}
            </Button>
          </Form>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {studyPlan && (
            <StudyPlanDisplay>
              <h2>Study Plan</h2>
              <pre>{studyPlan}</pre>
              <Button onClick={handleSave}>Save Study Plan</Button>
            </StudyPlanDisplay>
          )}
        </StudyPlanContainer>
      </Wrapper>
    </>
  );
};

export default StudyPlanPage;

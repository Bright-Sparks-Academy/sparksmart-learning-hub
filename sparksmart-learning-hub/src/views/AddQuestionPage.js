// src/views/AddQuestionPage.js
// Author: Tom Wang

import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GlobalStyle from '/Users/tom/Documents/GitHub/sparksmart-learning-hub/sparksmart-learning-hub/src/GlobalStyles.js'; // Import GlobalStyle

// Component to provide a form for admins or teachers to add new diagnostic questions
const AddQuestionContainer = styled.div`
  position: relative;
  margin: 2rem;
  padding: 2rem;
  background-color: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 8px;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  display: block;
`;

const FormInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #000000;
  border-radius: 4px;
  width: 100%;
`;

const SubmitButton = styled.button`
  background-color: #FFD900;
  color: #000000;
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #FFC700;
  }
`;

const AddQuestionPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [message, setMessage] = useState('');

  /**
   * Function to handle the submission of the new question form.
   * Sends the question and answer to the backend to be stored in Firestore.
   * Updates the state with a success or error message based on the response.
   */
  const handleAddQuestion = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/add-question', { question, answer });
      console.log('Response:', response); // Use the response for logging
      setMessage('Question added successfully!');
      setQuestion('');
      setAnswer('');
    } catch (error) {
      console.error('Error adding question:', error);
      setMessage('Failed to add question. Please try again.');
    }
  };

  return (
    <AddQuestionContainer>
      <GlobalStyle /> {/* Apply GlobalStyle */}
      <h1>Add New Question</h1>
      <FormLabel>Question:</FormLabel>
      <FormInput
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <FormLabel>Answer:</FormLabel>
      <FormInput
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />
      <SubmitButton onClick={handleAddQuestion}>Add Question</SubmitButton>
      {message && <p>{message}</p>}
    </AddQuestionContainer>
  );
};

export default AddQuestionPage;

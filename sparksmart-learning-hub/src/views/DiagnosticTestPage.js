// src/views/DiagnosticTestPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setDiagnosticCompleted } from './diagnosticService.js';

// Author: Tom Wang 
// Design the Diagnostic Test page

const DiagnosticTestPageContainer = styled.div`
  position: relative;
  margin: 2rem;
`;

const QuestionText = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const AnswerInput = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const SubmitButton = styled.button`
  background-color: blue;
  color: white;
  padding: 0.5rem 2rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const AnalysisText = styled.div`
  font-size: 1.2rem;
  color: green;
  margin-top: 1rem;
`;

const DiagnosticTestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch diagnostic questions from the backend
    axios.get('/api/diagnostic-questions')
      .then(response => {
        setQuestions(response.data.questions);
        setAnswers(response.data.questions.map(q => ({ question: q.question, answer: '' })));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
        setLoading(false);
      });
  }, []);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const submitDiagnosticTest = async () => {
    try {
      const response = await axios.post('/api/submit-diagnostic', { answers });
      setAnalysis(response.data.analysis);
      setDiagnosticCompleted(); // Mark diagnostic as completed

      // Generate learning plan and navigate to the learning plan page
      const learningPlanResponse = await axios.post('/api/personalized-learning-plan', { answers });
      navigate('/ai-learning-plan', { state: { learningPlan: learningPlanResponse.data.learningPlan } });
    } catch (error) {
      console.error('Error submitting diagnostic test:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <DiagnosticTestPageContainer>
      {questions.map((q, index) => (
        <div key={index}>
          <QuestionText>{q.question}</QuestionText>
          <AnswerInput
            type="text"
            value={answers[index].answer}
            onChange={(e) => handleAnswerChange(index, e.target.value)}
          />
        </div>
      ))}
      <SubmitButton onClick={submitDiagnosticTest}>Submit Diagnostic Test</SubmitButton>
      {analysis && <AnalysisText>{analysis}</AnalysisText>}
    </DiagnosticTestPageContainer>
  );
};

export default DiagnosticTestPage;

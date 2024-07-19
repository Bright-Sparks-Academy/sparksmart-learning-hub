// /Users/tom/Documents/GitHub/sparksmart-learning-hub/sparksmart-learning-hub/src/views/DiagnosticTestPage.js
// Author: Tom Wang

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setDiagnosticCompleted } from './diagnosticService.js';
import { initializeLockdownBrowser, checkLockdownBrowserActive } from '../mockLockdownBrowser.js'; // Adjust the import path as necessary
import { fetchLearningPlan } from '../api/aiService.js'; // Import the aiService

const Wrapper = styled.div`
  margin-top: 100px; // Adjust this value as needed to move the content down
`;

const DiagnosticTestPageContainer = styled.div`
  position: relative;
  margin: 2rem;
  padding: 2rem;
  background-color: #FFFFFF;
  border: 1px solid #000000;
  border-radius: 8px;
`;

const QuestionText = styled.div`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #000000;
`;

const AnswerInput = styled.input`
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
  margin-top: 1rem;

  &:hover {
    background-color: #FFC700;
  }
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
    initializeLockdownBrowser()
      .then(() => {
        if (!checkLockdownBrowserActive()) {
          alert('Please start the lockdown browser to proceed with the test.');
          navigate('/lockdown-info');
        } else {
          axios.get('http://localhost:3000/api/diagnostic-questions')
            .then(response => {
              const initialAnswers = response.data.questions.map(q => ({ question: q.question, answer: '' }));
              setQuestions(response.data.questions);
              setAnswers(initialAnswers);
              setLoading(false);
            })
            .catch(error => {
              console.error('Error fetching questions:', error);
              setLoading(false);
            });
        }
      })
      .catch(error => {
        console.error('Error initializing lockdown browser:', error);
      });
  }, [navigate]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const submitDiagnosticTest = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/submit-diagnostic', { answers });
      setAnalysis(response.data.analysis);
      setDiagnosticCompleted();

      const learningPlanResponse = await fetchLearningPlan({
        answers,
        correctCount: response.data.correctCount,
        totalQuestions: response.data.totalQuestions
      });

      navigate('/ai-learning-plan', { state: { learningPlan: learningPlanResponse.learningPlan } });
    } catch (error) {
      console.error('Error submitting diagnostic test:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default DiagnosticTestPage;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import GlobalStyle from '../GlobalStyles.js';
import { marked } from 'marked';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Wrapper = styled.div`
  margin-top: 80px;
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
  white-space: pre-wrap;
`;

const ErrorMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const AiLearningPlan = () => {
  const [problemType, setProblemType] = useState('');
  const [studyPlan, setStudyPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const testEndpoint = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/test');
        console.log('Test endpoint response:', response.data);
      } catch (err) {
        console.error('Error testing endpoint:', err);
      }
    };

    testEndpoint();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:3000/api/study-plan', { problemType });
      setStudyPlan(response.data.studyPlan);
    } catch (err) {
      setError('Error generating study plan. Please try again later.');
      console.error('Error generating study plan:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsPdf = async () => {
    try {
      const input = document.getElementById('study-plan-display');
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('study-plan.pdf');
    } catch (err) {
      console.error('Error saving study plan as PDF:', err);
      alert('Error saving study plan as PDF. Please try again later.');
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <StudyPlanContainer>
          <h1>AI Powered Learning Plans</h1> {/* Updated heading */}
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
            <StudyPlanDisplay id="study-plan-display">
              <h2>Study Plan</h2>
              <div dangerouslySetInnerHTML={{ __html: marked(studyPlan) }} />
              <Button onClick={handleSaveAsPdf}>Save Study Plan as PDF</Button>
            </StudyPlanDisplay>
          )}
        </StudyPlanContainer>
      </Wrapper>
    </>
  );
};

export default AiLearningPlan;

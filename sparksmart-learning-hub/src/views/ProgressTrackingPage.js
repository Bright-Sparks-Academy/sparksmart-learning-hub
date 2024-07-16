// ProgressTrackingPage.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Import chart components
import GlobalStyles from '../GlobalStyles.js'; // Import GlobalStyles

// Styled component for the main container
const ProgressTrackingContainer = styled.div`
  padding: 20px;
  background-color: #FFFFFF; /* White background */
`;

// Styled component for the header
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #FFD900; /* Yellow background */
  color: #000000; /* Black text */
`;

// Styled component for the main section
const MainSection = styled.main`
  padding: 20px;
  background-color: #FFFFFF;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

// Styled component for each section
const Section = styled.section`
  margin-bottom: 20px;
`;

// Styled component for the link button
const LinkButton = styled.a`
  display: inline-block;
  padding: 10px 20px;
  background-color: #FFD900; /* Yellow background */
  color: #000000; /* Black text */
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e6c200; /* Darker yellow on hover */
  }
`;

// Main component for the progress tracking page
const ProgressTrackingPage = () => {
  const [progressData, setProgressData] = useState([]); // State for progress data
  const [totalCredits, setTotalCredits] = useState(0); // State for total credits required
  const [creditsEarned, setCreditsEarned] = useState(0); // State for credits earned
  const [creditsLeft, setCreditsLeft] = useState(0); // State for credits left
  const [creditsLog, setCreditsLog] = useState([]); // State for log of credits
  const [grades, setGrades] = useState([]); // State for grades
  const [notesHistory, setNotesHistory] = useState([]); // State for notes and history
  const [calendlyLink, setCalendlyLink] = useState(''); // State for Calendly link

  // Effect to fetch data from the server when component mounts
  useEffect(() => {
    // Function to fetch progress data from the server
    const fetchProgressData = async () => {
      try {
        const response = await axios.get('/api/progress-data');
        setProgressData(response.data);
      } catch (error) {
        console.error('Error fetching progress data:', error);
      }
    };

    // Function to fetch account data from the server
    const fetchAccountData = async () => {
      try {
        const response = await axios.get('/api/account-data');
        const data = response.data;
        setTotalCredits(data.totalCredits || 0); // Set total credits required
        setCreditsEarned(data.creditsEarned || 0); // Set credits earned
        setCreditsLeft(data.creditsLeft || 0); // Set credits left
        setCreditsLog(data.creditsLog || []); // Set log of credits
        setGrades(data.grades || []); // Set grades
        setNotesHistory(data.notesHistory || []); // Set notes and history
        setCalendlyLink(data.calendlyLink || ''); // Set Calendly link
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    fetchProgressData();
    fetchAccountData();
  }, []);

  return (
    <>
      <GlobalStyles /> {/* Apply global styles */}
      <ProgressTrackingContainer>
        <Header>
          <div>Logo</div> {/* Placeholder for logo */}
          <nav>
            {/* Placeholder for navigation links */}
          </nav>
        </Header>
        <MainSection>
          <Section>
            <h2>Credits Overview</h2> {/* Display credits overview */}
            <p>Total Credits Required: {totalCredits}</p>
            <p>Credits Earned: {creditsEarned}</p>
            <p>Credits Left: {creditsLeft}</p>
          </Section>
          <Section>
            <h2>Credits Log</h2> {/* Display log of credits */}
            <ul>
              {creditsLog.map((log, index) => (
                <li key={index}>{log.date}: {log.creditsEarned} credits - {log.course} ({log.description})</li> // Display each log of credits
              ))}
            </ul>
          </Section>
          <Section>
            <h2>Grades</h2> {/* Display grades */}
            <ul>
              {grades.map((grade, index) => (
                <li key={index}>{grade.course}: {grade.grade}</li> // Display each grade
              ))}
            </ul>
          </Section>
          <Section>
            <h2>Notes and History</h2> {/* Display notes and history */}
            <ul>
              {notesHistory.map((note, index) => (
                <li key={index}>{note}</li> // Display each note
              ))}
            </ul>
          </Section>
          <Section>
            <h2>Schedule a Meeting</h2> {/* Display Calendly link */}
            <LinkButton href={calendlyLink} target="_blank" rel="noopener noreferrer">Book a slot on Calendly</LinkButton>
          </Section>
          <ResponsiveContainer width="100%" height={400}> {/* Container for the chart */}
            <LineChart data={progressData}> {/* Line chart to display progress data */}
              <CartesianGrid strokeDasharray="3 3" /> {/* Grid lines */}
              <XAxis dataKey="date" xAxisId="x-axis-0" /> {/* X-axis with id */}
              <YAxis yAxisId="y-axis-0" /> {/* Y-axis with id */}
              <Tooltip /> {/* Tooltip */}
              <Legend /> {/* Legend */}
              <Line type="monotone" dataKey="score" stroke="#000000" activeDot={{ r: 8 }} xAxisId="x-axis-0" yAxisId="y-axis-0" /> {/* Line representing scores with axis ids */}
            </LineChart>
          </ResponsiveContainer>
        </MainSection>
      </ProgressTrackingContainer>
    </>
  );
};

export default ProgressTrackingPage;

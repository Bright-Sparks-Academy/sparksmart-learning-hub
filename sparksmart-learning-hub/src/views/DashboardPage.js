import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Todolist from './Todolist.js';
import { db } from './firebase'; // Import Firestore database
import { getUpcomingClasses, getToDoList } from './api'; // Functions to fetch data

const DashboardContainer = styled.div`
  /* Add your styles here */
`;

const Header = styled.header`
  /* Add your styles here */
`;

const MainSection = styled.main`
  /* Add your styles here */
`;

const DashboardPage = () => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    // Fetch upcoming classes from Firestore
    getUpcomingClasses().then(classes => setUpcomingClasses(classes));

    // Fetch To-Do list from Firestore
    getToDoList().then(list => setToDoList(list));
  }, []);
  
  return (
    <DashboardContainer>
      <Header>
        {/* Logo */}
        {/* Navigation links: Dashboard, Scheduling, Messaging, Homework, Progress Tracking, Recordings */}
      </Header>
      <MainSection>
        {/* Display upcoming classes with date and time */}
        {/* Add a button linking to the meeting link */}
        <Todolist /> {/* Display To-Do list for homework */}
      </MainSection>
    </DashboardContainer>
  );
};

export default DashboardPage;
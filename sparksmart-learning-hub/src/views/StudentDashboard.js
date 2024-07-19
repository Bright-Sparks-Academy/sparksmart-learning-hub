import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Todolist from './Todolist.js';
//import { db } from './firebase'; // Import Firestore database
import { getUpcomingClasses, getToDoList,} from '../api/aiService.js'; // Functions to fetch data
import lightbulbIcon from '../assets/lightbulb.png';

const DashboardContainer = styled.div`
  position: relative;
`;

const DashboardItemsContainer = styled.div`
  display: flex;
  background-color: #FFFAED;
  width: 99.5vw;
  height: 140vh;
`;

const HeaderTitle = styled.div`
  position: absolute;
  width: 463px;
  top: 125px;
  left: 50px;
  font-weight: bold;
  font-size: 2rem;
  color: black;
`;

const YellowBackground = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  border-radius: 2rem;
  background-color: #FFD900;
`;

const WhiteBackground = styled.div`
  position: absolute;
  width: 90px;
  height: 10px;
  border-radius: 1rem;
  background-color: white;
  margin-top: 20px;
  padding-bottom: 20px;
`;

const DashboardContent = styled.div`
  display: absolute;
`;

const ProfileContent = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  padding-top: 1.5rem;
  padding-bottom: 0;
`;

const ProfileViewButton = styled.button`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 1rem;
  height: 45px;
  width: 200px;
  background-color: black;
  margin-top: 295px;
  margin-right: 15px;
`;  

const ProgressHeader = styled.div`
  font-weight: bold;
  font-size: 1.75rem;
  color: black;
  margin: 20px;
`;

const ScheduleHeader = styled.div`
  display: flex;
  align-items: center;
  background-color: black;
  color: white;
  font-size: 1.3rem;
  border-radius: 1.5rem;
  height: 50px;
  width: 200px;
  margin: 20px;
  padding-left: 20px;
`;

const ScheduleViewButton = styled.button `
  color: black;
  font-weight: bold;
  font-size: 1.25rem;
  border-radius: 1rem;
  height: 45px;
  width: 120px;
  border-width: 0;
  background-color: #FFD900;
  margin-top: 490px;
  margin-left: 320px;
`;

const MessageHeader = styled.div`
  font-weight: bold;
  font-size: 1.75rem;
  color: black;
  margin: 20px;
`;

const MessagesViewButton = styled.button`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
  border-radius: 1rem;
  height: 45px;
  width: 130px;
  background-color: black;
  margin-top: 170px;
  margin-left: 350px;
`;

const ClassHeader = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  margin: 20px;
`;

const ClassContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: bold;
  font-size: 1.2rem;
  color: black;
  background-color: lightgray;
  border-radius: 1.5rem;
  width: 250px;
  height: 185px;
  padding-left: 20px;
  padding-top: 5px;
  margin-left: 20px;
`;

const JoinClassButton = styled.button`
  color: black;
  font-weight: bold;
  border-radius: 1rem;
  font-size: 1.25rem;
  height: 45px;
  width: 120px;
  border-width: 0;
  background-color: #FFD900;
  margin-left: 370px;
`;

const TodoListBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  width: 90px;
  height: 10px;
  border-radius: 1rem;
  background-color: white;
  margin-top: 20px;
  padding-bottom: 20px;
`;

const TodoListHeader = styled.div`
  font-weight: bold;
  font-size: 1.75rem;
  color: black;
  margin: 20px;
`;

const CurrentDateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  width: 400px;
  height: 50px;
`;

const NavButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 0.5rem;
  width: 4rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;  
  margin: 0 0.5rem;
`;

const ScrollContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  overflow-y: scroll;
  position: absolute;
  width: 550px;
  height: 400px;
  margin-top: 160px;
`;

const TodoItem = styled.div`
  display: flex;
  font-size: 1.3rem;
  color: black;
  font-weight: bold;
  width: 500px;
  height: 60px;
  align-items: center;
  justify-content: space-around;
  border-radius: 1.5rem;
  background-color: lightgray;
  margin-left: 15px;
  padding-left: 5px
`;

const TaskButton = styled.button`
  width: 65px;
  height: 30px;
  background-color: black;
  color: #f59e0b;
  font-size: 1rem;
  font-weight: bold;
  padding: 0.25rem 0.5rem;
  cursor: pointer;
  border-radius: 0.375rem;
`;


const StudentDashboard = () => {
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    // Fetch upcoming classes from Firestore
   // getUpcomingClasses().then(classes => setUpcomingClasses(classes));

    // Fetch To-Do list from Firestore
   // getToDoList().then(list => setToDoList(list));
  }, []);
  
  return (
    <DashboardContainer>
      <DashboardItemsContainer>
        <HeaderTitle>First Name's Profile</HeaderTitle>
        {/* Profile Section */}
        <YellowBackground style={{ width: '600px', height: '350px', top: '200px', left: '45px'}}>
          <img src={lightbulbIcon /* Place holder for user profile picture */} style={{ width: '125px', height: '125px'}} />
          <DashboardContent style={{ width: '600px', height: '350px', top: '200px', left: '45px'}}>
            <ProfileContent>Student: FirstName</ProfileContent>
            <ProfileContent>User ID: UserID</ProfileContent>
          </DashboardContent>
          <ProfileViewButton>View</ProfileViewButton>
        </YellowBackground>
        {/* Progress Section */}
        <YellowBackground style={{ width: '550px', height: '350px', top: '200px', left: '670px'}}>
          <DashboardContent style={{ width: '550px', height: '350px', top: '200px', left: '670px'}}>
            <ProgressHeader>Progress</ProgressHeader>
          </DashboardContent>
        </YellowBackground>
        {/* Schedule Section */}
        <YellowBackground style={{ width: '500px', height: '680px', top: '200px', left: '1250px'}}>
          <WhiteBackground style={{ width: '460px', height: '620px'}}>
            <ScheduleHeader>Schedule</ScheduleHeader>
            <ScheduleViewButton>View</ScheduleViewButton>
          </WhiteBackground>
        </YellowBackground>
        {/* Messages Section */}
        <YellowBackground style={{ width: '500px', height: '300px', top: '895px', left: '1250px'}}>
          <DashboardContent style={{ width: '500px', height: '300px', top: '895px', left: '1250px'}}>
            <MessageHeader>Messages</MessageHeader>
            <MessagesViewButton>View</MessagesViewButton>
          </DashboardContent>
        </YellowBackground>
        {/* Upcoming Classes Section */}
        <YellowBackground style={{ width: '550px', height: '350px', top: '570px', left: '670px'}}>
          <WhiteBackground style={{ width: '510px', height: '290px'}}>
            <ClassHeader>Upcoming class</ClassHeader>
            <ClassContent> 
              <span>July 14th</span>
              <span>6:30 PM - 7:30 PM</span>
              <span>Fractions</span>
              <span>Teacher Name</span>
            </ClassContent>
            <JoinClassButton >Join Class</JoinClassButton>
          </WhiteBackground>
        </YellowBackground>
        {/* Todo List Section */}
        <YellowBackground style={{ width: '600px', height: '620px', top: '575px', left: '45px'}}>
          <TodoListBody style={{ width: '560px', height: '560px'}}>
            <TodoListHeader>To-Do List</TodoListHeader>
            <CurrentDateContainer>
              <NavButton>{'<'}</NavButton>
              June 2024
              <NavButton>{'>'}</NavButton>
            </CurrentDateContainer>
            <ScrollContainer >
              <TodoItem>
                <span>Decimal Practices #1-3</span>
                <span>06/18</span>
                <TaskButton>View</TaskButton>
              </TodoItem>
              <TodoItem>
                <span>Fraction Multiplication</span>
                <span>06/22</span>
                <TaskButton>View</TaskButton>
              </TodoItem>
            </ScrollContainer>
          </TodoListBody>
        </YellowBackground>
      </DashboardItemsContainer>
    </DashboardContainer>
  );
};

export default StudentDashboard;
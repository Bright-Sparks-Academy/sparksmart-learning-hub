import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import axios from "axios";
import lightbulbIcon from "../assets/lightbulb.png";
import { UserContext } from "../context/UserContext.js";
import { RecordingsContext } from "../context/RecordingsContext.js";

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fffaed;
  width: 99.4vw;
  height: 150vh;
`;

const SectionHeader = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
  color: black;
  margin: 0.8rem;
`;

const DashboardItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  background-color: #ffd900;
`;

const WhiteBackground = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  background-color: white;
  margin-left: 0.5rem;
  padding-bottom: 20px;
`;

const DashboardItemsContainer = styled.div`
  display: grid;
  height: 760px;
  width: 95%;
  grid-template: 1.2fr 1fr 1.05fr / 1.2fr 1fr 1fr;
  gap: 10px;
`;

const DashboardTitle = styled.header`
  color: black;
  height: 50px;
  width: 380px;
  font-size: 2.5rem;
  font-weight: bold;
  padding-top: 95px;
`;

// PROFILE
const ProfileHeaderTitle = styled.header`
  width: 92%;
  height: 40px;
  font-weight: bold;
  font-size: 1.5rem;
  margin-top: 35px;
  color: black;
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProfileContent = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
  color: black;
  padding-top: 1rem;
`;

const ProfileViewButton = styled.button`
  color: white;
  font-size: 1.25rem;
  border-radius: 1rem;
  height: 2.3rem;
  width: 7.5rem;
  background-color: black;
  margin-top: 7.2rem;
  margin-left: 23rem;
  cursor: pointer;
`;

// UPCOMING CLASSES
const ClassContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  color: black;
  background-color: lightgray;
  border-radius: 1.5rem;
  width: 13rem;
  height: 11.5rem;
  padding-left: 20px;
  padding-top: 5px;
  margin-top: 1.3rem;
`;

const ClassInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 6em;
  height: 10rem;
  margin-top: 1.3rem;
  margin-left: 1rem;
`;
const ClassInfo = styled.span`
  font-weight: bold;
  font-size: 1.25rem;
`;

const ClassContentInfo = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;

const JoinClassButton = styled.button`
  color: black;
  font-weight: bold;
  border-radius: 1rem;
  font-size: 1.25rem;
  cursor: pointer;
  height: 2rem;
  width: 8rem;
  border-width: 0;
  margin-top: 1rem;
  background-color: #ffd900;
`;

// SCHEDULE
const ScheduleContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  width: 100%;
  height: 60%;
  margin: 1rem;
`;

const ScheduleContent = styled.span`
  font-weight: bold;
  font-size: 1.1rem;
`;
const ScheduleInfoContainer = styled.div`
  display: flex;
`;

const ScheduleInfo = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  background-color: lightgray;
  font-weight: bold;
  font-size: 1.1rem;
  margin-left: 0.35rem;
  padding-left: 1rem;
`;

// TODO LIST
const TodoListBody = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 30rem;
  height: 23rem;
  border-radius: 1rem;
  background-color: white;
  padding-bottom: 20px;
`;

const TodoListHeader = styled.div`
  font-weight: bold;
  font-size: 1.75rem;
  color: black;
  margin: 0.7rem;
`;

const CurrentDateContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  font-size: 1.3rem;
  color: black;
  width: 20rem;
  height: 5rem;
`;

const NavButton = styled.button`
  background-color: black;
  color: white;
  border-radius: 0.5rem;
  width: 3.5rem;
  height: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.5rem;
`;

const TodoScrollContainer = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  direction: rtl;
  width: 30rem;
  height: 25rem;
`;

const TodoItem = styled.div`
  display: flex;
  flex: none;
  font-size: 1.1rem;
  color: black;
  font-weight: bold;
  width: 95%;
  height: 3.1rem;
  direction: ltr;
  align-items: center;
  justify-content: space-around;
  border-radius: 1.5rem;
  background-color: lightgray;
  padding-left: 5px;
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

// PROGRESS
const ProgressContainer = styled.div`
  display: grid;
  grid-template: 1fr 0.2fr / 1fr 1fr;
  width: 100%;
  height: 23rem;
`;

const ProgressItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  font-size: 1.1rem;
  color: black;
  background-color: lightgray;
  border-radius: 1.5rem;
  margin: 0.5rem;
  padding-top: 1rem;
`;

const ProgressContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBar = styled.progress`
  accent-color: lightgreen;
`;

const ProgressViewButton = styled.button`
  color: white;
  font-size: 1.25rem;
  border-radius: 1rem;
  height: 2.3rem;
  width: 7rem;
  margin-top: 0.5rem;
  margin-left: 18rem;
  background-color: black;
  cursor: pointer;
`;

// COMMUNICATION
const CommunicationScrollContainer = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  scrollbar-width: thin;
  width: 23rem;
  height: 7.5rem;
  margin-left: 1.3rem;
  padding-bottom: 0.5rem;
`;

const Contact = styled.div`
  display: flex;
  flex: none;
  flex-direction: column;
  align-items: center;
  width: 7rem;
  height: 100%;
  margin-bottom: 1rem;
`;

const ContactName = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const ContactViewButton = styled.button`
  color: white;
  font-size: 1.25rem;
  border-radius: 1rem;
  height: 2.3rem;
  width: 7rem;
  margin-left: 18rem;
  margin-top: 0.25rem;
  background-color: black;
  cursor: pointer;
`;

// RECORDINGS
const RecordingsScrollContainer = styled.div`
  width: 14rem;
  height: 8rem;
  overflow-y: scroll;
  border-radius: 1rem;
  direction: rtl;
  margin-top: 0.3rem;
  margin-left: 1rem;
`;
const InstructorDropdown = styled.select`
  width: 9rem;
  height: 2.5rem;
  border-radius: 0.3rem;
  margin-left: 0.5rem;
  margin-top: 1rem;
`;

const RecordingsViewButton = styled.button`
  color: white;
  font-size: 1.25rem;
  border-radius: 1rem;
  height: 2.3rem;
  width: 7rem;
  margin-left: 18rem;
  margin-top: 0.2rem;
  background-color: black;
  cursor: pointer;
`;

const Recording = styled.div`
  display: flex;
  align-items: center;
  border-radius: 1rem;
  direction: ltr;
  background-color: lightgray;
  font-weight: bold;
  font-size: 1.1rem;
  width: 12rem;
  margin-right: 0.5rem;
  padding-left: 0.5rem;
  margin-top: 0.5rem;
`;

const StudentDashboard = () => {
  const { user } = useContext(UserContext);
  const { recordings } = useContext(RecordingsContext); // Access recordings from context
  const [toDoList, setToDoList] = useState([]);
  const [progressData, setProgressData] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState('Instructor A'); // State for instructor filter
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toDoListResponse, progressResponse] = await Promise.all([
          axios.get("/api/todo-list"),
          axios.get("/api/progress-data"),
        ]);

        setToDoList(toDoListResponse.data);
        setProgressData(progressResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter recordings based on selected instructor
  const filteredRecordings = recordings.filter(recording => recording.instructor === selectedInstructor);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardContainer>
      <DashboardTitle>Student Dashboard</DashboardTitle>
      <ProfileHeaderTitle>
        {user?.displayName ? `${user.displayName.split(" ")[0]}'s Profile` : "Profile"}
      </ProfileHeaderTitle>
      <DashboardItemsContainer>
        {/* Profile Section */}
        <DashboardItem style={{ alignItems: "flex-start" }}>
          <ProfileContainer>
            <img src={lightbulbIcon} alt="Profile" style={{ width: "100px", height: "100px" }} />
            <ProfileContentContainer>
              <ProfileContent>Student: {user?.displayName}</ProfileContent>
              <ProfileContent>User ID: {user?.uid}</ProfileContent>
              <ProfileContent>Email: {user?.email}</ProfileContent>
            </ProfileContentContainer>
          </ProfileContainer>
          <ProfileViewButton>View</ProfileViewButton>
        </DashboardItem>
        
        {/* Upcoming Classes Section */}
        <DashboardItem>
          <SectionHeader>Upcoming class</SectionHeader>
          <WhiteBackground style={{ width: "25rem", height: "11.5rem" }}>
            <ClassInfoContainer>
              <ClassInfo>Class: Math 3</ClassInfo>
              <ClassInfo>Meeting: 9</ClassInfo>
            </ClassInfoContainer>
            <ClassContent>
              <ClassContentInfo>July 14th</ClassContentInfo>
              <ClassContentInfo>6:30 PM - 7:30 PM</ClassContentInfo>
              <ClassContentInfo>Fractions</ClassContentInfo>
              <ClassContentInfo>Teacher Name</ClassContentInfo>
              <JoinClassButton>Join Class</JoinClassButton>
            </ClassContent>
          </WhiteBackground>
        </DashboardItem>

        {/* Schedule Section */}
        <DashboardItem>
          <SectionHeader>Schedule</SectionHeader>
          <WhiteBackground style={{ width: "25rem", height: "11.5rem", flexDirection: "column", alignItems: "flex-start" }}>
            <ScheduleContentContainer>
              <ScheduleContent>Class: Math 3</ScheduleContent>
              <ScheduleContent>Instructor: Instructor A</ScheduleContent>
              <ScheduleContent>Class Term: 6/1/24 - 7/21/24</ScheduleContent>
            </ScheduleContentContainer>
            <ScheduleInfoContainer>
              <ScheduleInfo style={{ width: "10rem", height: "4rem" }}>
                Next Session: 7/14/24
              </ScheduleInfo>
              <ScheduleInfo style={{ width: "12rem", height: "4rem" }}>
                Next Assignment Due: 6/18/24
              </ScheduleInfo>
            </ScheduleInfoContainer>
          </WhiteBackground>
        </DashboardItem>
        
        {/* Todo List Section */}
        <DashboardItem style={{ gridRow: "span 2", alignItems: "center" }}>
          <SectionHeader>To-Do List</SectionHeader>
          <TodoListBody>
            <TodoListHeader>My To-Do List</TodoListHeader> {/* This line now uses the TodoListHeader */}
            <CurrentDateContainer>
              <NavButton>{"<"}</NavButton>
              June 2024
              <NavButton>{">"}</NavButton>
            </CurrentDateContainer>
            <TodoScrollContainer>
              {toDoList.map((item) => (
                <TodoItem key={item.id}>
                  <span>{item.task}</span>
                  <span>{item.dueDate}</span>
                  <TaskButton>View</TaskButton>
                </TodoItem>
              ))}
            </TodoScrollContainer>
          </TodoListBody>
        </DashboardItem>
        
        {/* Progress Section */}
        <DashboardItem style={{ gridRow: "span 2" }}>
          <SectionHeader>Progress</SectionHeader>
          <ProgressContainer>
            <ProgressItem>
              <ProgressContent style={{ fontSize: "2rem" }}>{progressData.assignmentsDone}</ProgressContent>
              <ProgressContent>Assignments Done</ProgressContent>
              <ProgressContent style={{ marginTop:'5rem' }}>Assignment Progress</ProgressContent>
              <ProgressBar max="100" value={progressData.averageProgress} />
              <ProgressContent>{progressData.averageProgress}%</ProgressContent>
              <ProgressContent style={{ marginTop:'1rem', fontSize: '1rem' }}>Assignments in Progress:</ProgressContent>
              <ProgressContent style={{ fontSize: '1rem' }}>{progressData.assignmentsInProgress}</ProgressContent>
            </ProgressItem>
            <ProgressItem>
              <ProgressContent>Teacher's Comments</ProgressContent>
              <ProgressContent>{progressData.comments}</ProgressContent>
            </ProgressItem>
            <ProgressItem style={{ gridColumn: "span 2" }}>
              <ProgressContent>{progressData.grades} - 99.28%</ProgressContent>
            </ProgressItem>
          </ProgressContainer>
          <ProgressViewButton>View</ProgressViewButton>
        </DashboardItem>

        {/* Communication Section  */}
        <DashboardItem>
          <SectionHeader>Communication</SectionHeader>
          <CommunicationScrollContainer>
            <Contact>
              <img src={lightbulbIcon} alt="Profile" style={{ width: "100px", height: "100px" }} />
              <ContactName>Instructor A</ContactName>
            </Contact>
            <Contact>
              <img src={lightbulbIcon} alt="Profile" style={{ width: "100px", height: "100px" }} />
              <ContactName>Student B</ContactName>
            </Contact>
          </CommunicationScrollContainer>
          <ContactViewButton>View</ContactViewButton>
        </DashboardItem>
        
        {/* Recordings Section */}
        <DashboardItem>
          <SectionHeader>Recordings</SectionHeader>
          <WhiteBackground style={{ height: "7.5rem", width: "25rem", alignItems: "flex-start" }}>
            <RecordingsScrollContainer>
              {filteredRecordings.map(recording => (
                <Recording key={recording.id}>{recording.title}</Recording>
              ))}
            </RecordingsScrollContainer>
            <InstructorDropdown value={selectedInstructor} onChange={(e) => setSelectedInstructor(e.target.value)}>
              <option value="Instructor A">Instructor A</option>
              <option value="Instructor B">Instructor B</option>
            </InstructorDropdown>
          </WhiteBackground>
          <RecordingsViewButton>View</RecordingsViewButton>
        </DashboardItem>
      </DashboardItemsContainer>
      {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
    </DashboardContainer>
  );
};

export default StudentDashboard;

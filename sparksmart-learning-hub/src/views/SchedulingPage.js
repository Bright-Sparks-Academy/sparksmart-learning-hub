// /Users/tom/Documents/GitHub/sparksmart-learning-hub/sparksmart-learning-hub/src/views/SchedulingPage.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import CalendlyScheduling from '../components/CalendlyScheduling.js'; // Import the CalendlyScheduling component

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px;
  background-color: #fffaed;
  min-height: 100vh;
`;

const LeftPanel = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const RightPanel = styled.div`
  width: 70%;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const EventList = styled.ul`
  list-style: none;
  padding: 0;
`;

const EventItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 10px;
`;

const CalendarContainer = styled.div`
  width: 100%;
  padding: 20px;
  background-color: #ffdd00;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: none;

  &:nth-child(1) {
    background-color: green;
    color: white;
  }
  &:nth-child(2) {
    background-color: yellow;
    color: black;
  }
  &:nth-child(3) {
    background-color: red;
    color: white;
  }
`;

const ScheduleOptionsButton = styled.button`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  border: 1px solid #ccc;
  background-color: #f0f0f0;
`;

const SchedulingPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5003/api/list-event-types');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Container>
      <LeftPanel>
        <Header>Events</Header>
        <Select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">Select Class</option>
          <option value="class1">Class 1</option>
          <option value="class2">Class 2</option>
        </Select>
        <EventList>
          {events.map((event, index) => (
            <EventItem key={index}>
              <strong>Meeting {index + 1}:</strong> {event.name}
              <br />
              <strong>Instructor:</strong> {event.instructor}
              <br />
              <strong>Reason:</strong> {event.reason}
            </EventItem>
          ))}
        </EventList>
      </LeftPanel>
      <RightPanel>
        <Header>Class Scheduling</Header>
        <CalendarContainer>
          <h2>July 2024</h2>
          {/* Calendar component can be implemented or imported from a library */}
          <p>Calendar here</p>
        </CalendarContainer>
        <CalendlyScheduling /> {/* Add the CalendlyScheduling component here */}
        <ButtonContainer>
          <Button>Schedule a new meeting</Button>
          <Button>Reschedule a meeting</Button>
          <Button>Cancel a meeting</Button>
          <ScheduleOptionsButton>Schedule Options</ScheduleOptionsButton>
        </ButtonContainer>
      </RightPanel>
    </Container>
  );
};

export default SchedulingPage;

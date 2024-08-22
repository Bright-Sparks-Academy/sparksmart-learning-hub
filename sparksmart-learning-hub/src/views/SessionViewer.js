import React, { useState } from 'react';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  color: black;
  min-height: 100vh;
  font-family: Arial, sans-serif;
  position: relative;
  top: 25px
`;

const Header = styled.header`
  font-size: 36px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const SessionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
`;

const LeftSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: white;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const SelectStudent = styled.div`
border: 15px solid #FFD900;
  border-radius: 15px;
`;

const CalendarContainer = styled.div`
  margin-bottom: 20px;
  position: relative;
  border: 25px solid #FFD900;
  border-radius: 15px;
  top:30px;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  
  button {
    margin: 10px 0;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
   
  }
    
`;

const AddButton = styled.button`
  background-color: #00B300;
  color: white;
  &:hover {
    background-color: #009900;
  }
`;

const RescheduleButton = styled.button`
  background-color: #FFD900;
  color: black;
  &:hover {
    background-color: #e6c800;
  }
`;

const RemoveButton = styled.button`
  background-color: #FF4D4D;
  color: white;
  &:hover {
    background-color: #e60000;
  }
`;

const SessionOptions = styled.button`
  background-color: #CCCCCC;
  color: black;
  &:hover {
    background-color: #b3b3b3;
  }
`;

const SessionsSection = styled.div`
  display: flex;
  width: 68%;
`;

const SessionsColumn = styled.div`
  width: 48%;
  background-color: white;
  border: 15px solid #FFD900;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  margin-right: 4%;
  
  h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 15px;
  }

  &:last-child {
    margin-right: 0;
  }
`;

const SessionItem = styled.div`
  background-color: #F4F4F4;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

const SessionDetails = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
`;

const SessionIcons = styled.div`
  display: flex;

  img {
    margin-left: 15px;
    cursor: pointer;
  }
`;

const Logo = styled.img`
  width: 50px;
  margin-bottom: 20px;
`;

const SessionViewer = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [date, setDate] = useState(new Date());

  return (
    <Container>
      <Logo src="/path/to/your/logo.png" alt="Logo" />
      <Header>Session Viewer</Header>
      <SessionContainer>
        <LeftSection>
        <SelectStudent>
          <label>Student under review:</label>
          <select onChange={(e) => setSelectedStudent(e.target.value)}>
            <option>Select Student</option>
            <option value="studentA">Student A</option>
            <option value="studentB">Student B</option>
          </select>
        </SelectStudent>
          <CalendarContainer>
            <Calendar onChange={setDate} value={date} />
          </CalendarContainer>
          <ButtonGroup>
            <AddButton>Add Session</AddButton>
            <RescheduleButton>Reschedule Session</RescheduleButton>
            <RemoveButton>Remove Session</RemoveButton>
            <SessionOptions>⚙️ Session Options</SessionOptions>
          </ButtonGroup>
        </LeftSection>
        <SessionsSection>
          <SessionsColumn>
            <h3>Current Sessions</h3>
            <SessionItem>
              <SessionDetails>
                <div>Session 5: 7/12/24</div>
                <div>Student: Student A</div>
                <div>3:30 PM - 4:45 PM</div>
              </SessionDetails>
              <SessionIcons>
                <img src="/path/to/edit-icon.png" alt="Edit" />
                <img src="/path/to/delete-icon.png" alt="Delete" />
              </SessionIcons>
            </SessionItem>
            {/* Additional SessionItem components can be added here */}
          </SessionsColumn>
          <SessionsColumn>
            <h3>Past Sessions</h3>
            <SessionItem>
              <SessionDetails>
                <div>Session 1: 7/3/24</div>
                <div>Student: Student A</div>
                <div>3:30 PM - 4:45 PM</div>
              </SessionDetails>
              <SessionIcons>
                <img src="/path/to/edit-icon.png" alt="Edit" />
                <img src="/path/to/delete-icon.png" alt="Delete" />
              </SessionIcons>
            </SessionItem>
            {/* Additional SessionItem components can be added here */}
          </SessionsColumn>
        </SessionsSection>
      </SessionContainer>
    </Container>
  );
};

export default SessionViewer;
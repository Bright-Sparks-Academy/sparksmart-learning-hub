import React, { useState } from 'react';
import styled from 'styled-components';

//CSS for the entire page
const RecordingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  color: black;
  min-height: 100vh;
  font-family: Arial, sans-serif;
`;

//CSS for the header (Recordings)
const Header = styled.header`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

//CSS for the whole course selection navigation
const CourseSelector = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  background-color: #FFD900;
  padding: 10px;
  border-radius: 5px;
  position: relative;
  left: 310px
`;

//CSS for the instrctor selector 
const Select = styled.select`
  margin-left: 10px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

//CSS for main part of the page (video and recordings list)
const MainSection = styled.main`
  display: flex;
  width: 100%;
  max-width: 1200px;
  justify-content: space-between;
`;

//CSS for the video player
const VideoPlayer = styled.div`
  background-color: #ccc;
  width: 60%;
  height: 300px;
  border: 5px solid #FFD900;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

//CSS for the play button 
const VideoIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: #999;
  border-radius: 50%;
`;

//CSS for title of the video being played
const VideoTitle = styled.div`
  margin-top: 10px;
  font-size: 18px;
  font-weight: bold;
`;

//CSS for the recordings list that contains the recordings
const RecordingsList = styled.div`
  width: 35%;
  border: 1px solid #ccc;
`;

//CSS for each recording in the list
const RecordingItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  background-color: ${props => (props.selected ? '#FFD900' : 'white')};
  cursor: pointer;
`;

//CSS for the play icon for the play button
const PlayIcon = styled.div`
  width: 30px;
  height: 30px;
  background-color: #999;
  border-radius: 50%;
  margin-right: 10px;
`;

//CSS for the box around about and transcript
const InfoSection = styled.div`
  width: 60%;
  margin-top: 20px;
  background-color: #FFD900;
  padding: 10px;
`;

//CSS the tabs for about and transcript
const Tabs = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
`;

//CSS each tab
const Tab = styled.div`
  cursor: pointer;
  font-weight: bold;
`;

//CSS for each texbox under tabs
const TabContent = styled.div`
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
`;

const RecordingsPage = () => {
  const [selectedRecording, setSelectedRecording] = useState(null);
  const [tab, setTab] = useState('About');

  const recordings = [
    'Prelude - Coding Basics',
    'Lesson 1 - Intro to Java',
    'Lesson 2 - Variables and Types',
    'Lesson 3 - Basic Arithmetic',
    'Lesson 4 - Arrays',
    'Lesson 5 - Branch Statements',
  ];

  return (
    <RecordingsContainer>
      <div>...</div>
      
      <Header>Recordings</Header>
      <Header>Recordings</Header>
      <CourseSelector>
        
        <label>Course: Java</label>
        <Select>
          <option>Select Instructor</option>
          <option>Student</option>
          <option>Teacher</option>
        </Select>
      </CourseSelector>
      <MainSection>
        <VideoPlayer>
          <VideoIcon />
          <VideoTitle>Intro to Java</VideoTitle>
        </VideoPlayer>
        <RecordingsList>
          {recordings.map((rec, index) => (
            <RecordingItem
              key={index}
              selected={selectedRecording === index}
              onClick={() => setSelectedRecording(index)}
            >
              <PlayIcon />
              {rec}
            </RecordingItem>
          ))}
        </RecordingsList>
      </MainSection>
      <InfoSection>
        <div>Lesson 1: Intro to Java</div>
        <Tabs>
          <Tab onClick={() => setTab('About')} style={{ color: tab === 'About' ? 'black' : 'grey' }}>About</Tab>
          <Tab onClick={() => setTab('Transcript')} style={{ color: tab === 'Transcript' ? 'black' : 'grey' }}>Transcript</Tab>
        </Tabs>
        <TabContent>
          {tab === 'About' ? 'Information Here...' : 'Transcript Here...'}
        </TabContent>
      </InfoSection>
    </RecordingsContainer>
  );
};

export default RecordingsPage;

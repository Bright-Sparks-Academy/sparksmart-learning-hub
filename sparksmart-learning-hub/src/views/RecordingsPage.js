// RecordingsPage.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
//import { db } from './firebase'; // Import Firestore database
import { fetchLearningPlan } from '../api/aiService.js'; // Function to fetch Google Drive links


const RecordingsContainer = styled.div`
  /* Add your styles here */
`;

const Header = styled.header`
  /* Add your styles here */
`;

const MainSection = styled.main`
  /* Add your styles here */
`;

const VideoEmbed = styled.iframe`
  width: 100%;
  height: 400px;
  border: none;
  margin-bottom: 20px;
`;

const RecordingsPage = () => {
    const [recordings, setRecordings] = useState([]);
  
    useEffect(() => {
      // Fetch recording links from Firestore
      fetchLearningPlan().then(links => setRecordings(links));
    }, []);
  
    return (
      <RecordingsContainer>
        <Header>
          {/* Logo */}
          {/* Navigation links */}
        </Header>
        <MainSection>
          {recordings.map((recording, index) => (
            <div key={index}>
              <h3>{recording.title}</h3>
              <VideoEmbed
                src={`https://drive.google.com/file/d/${recording.driveId}/preview`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></VideoEmbed>
            </div>
          ))}
        </MainSection>
      </RecordingsContainer>
    );
  };
  
  export default RecordingsPage;
  
  /**
   * Steps to code:
   * 1. Create the recordings interface using React.
   * 2. Integrate Firestore to fetch and display Google Drive links for class recordings.
   * 3. Embed Google Drive videos using iframe.
   * 4. Style the page using Styled Components and Tailwind CSS.
   */
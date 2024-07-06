// src/views/MessagingPage.js
// Author: Tom Wang

import React from 'react';
import styled from 'styled-components';

/**
 * PageContainer is the main container for the MessagingPage.
 * It uses styled-components for styling.
 * This component sets the font family, background color, text color, and padding.
 */
const PageContainer = styled.div`
  font-family: 'Gotham', 'Quicksand', sans-serif;
  background-color: #FFFFFF;
  color: #000000;
  padding: 2rem;
`;

/**
 * Heading is a styled-component for the main heading of the page.
 * It sets the font size, font weight, text color, text alignment, and margin.
 */
const Heading = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  color: #000000;
  text-align: center;
  margin-bottom: 1.5rem;
`;

/**
 * Subheading is a styled-component for the subheadings on the page.
 * It sets the font size, text color, text alignment, and margin.
 */
const Subheading = styled.h2`
  font-size: 2rem;
  color: #FFD900;
  text-align: center;
  margin-bottom: 1rem;
`;

/**
 * MessagingPage component renders the main messaging interface.
 * It includes placeholders for MessageForm and MessageList components.
 * This component is the entry point for the messaging feature.
 */
const MessagingPage = () => {
  return (
    <PageContainer>
      <Heading>Messaging</Heading>
      <Subheading>Send a Message</Subheading>
      {/* MessageForm component will be added here */}
      <Subheading>Past Messages</Subheading>
      {/* MessageList component will be added here */}
    </PageContainer>
  );
};

export default MessagingPage;

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addMessage, listenForMessages } from '../Firestore.js';
import { mockUser } from '../firebaseConfig.js'; // Ensure the correct import path
import MessageForm from './MessageForm.js';
import MessageList from './MessageList.js';
import LightBulbAnimation from '../components/LightBulbAnimation.js';

// Mock data for instructors
const mockInstructors = [
  { name: "Instructor 1", email: "instructor1@example.com" },
  { name: "Instructor 2", email: "instructor2@example.com" },
];

// Styled component for the page container
const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-family: 'Quicksand', sans-serif;
  background-color: #f9f9f9;
  color: #000000;
`;

// Styled component for the messaging box
const MessagingBox = styled.div`
  width: 80%;
  max-width: 1000px;
  height: 80%;
  border: 12px solid #FFD900;
  border-radius: 30px;
  background-color: #EDEDED;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
`;

// Styled component for the header
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #FFD900;
  border-radius: 8px;
  margin-bottom: 10px;
`;

// Styled component for the centered title
const CenteredTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

// Styled component for the heading
const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  margin: 0;
`;

// Styled component for the dropdown
const Dropdown = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

// Styled component for the light bulb container
const LightBulbContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
`;

// Styled component for the content wrapper
const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  background-color: #D3D3D3;
  border-radius: 10px;
  padding: 10px;
`;

// Styled component for the content area
const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #CFCFCF;
  border-radius: 5px;
  padding: 10px;
`;

// Styled component for the subheading
const Subheading = styled.h2`
  font-size: 1.2rem;
  color: #000000;
  text-align: center;
  margin-bottom: 10px;
  font-family: 'Quicksand', sans-serif;
`;

// Styled component for the conversation area
const ConversationArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto;
  margin-bottom: 10px;
  font-family: 'Quicksand', sans-serif;
`;

// Styled component for the footer
const Footer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #E0E0E0;
  border-radius: 8px;
`;

/**
 * MessagingPage component handles the messaging interface.
 * Function created by Tom Wang.
 */
const MessagingPage = () => {
  // State for storing messages
  const [messages, setMessages] = useState([]);
  // State for storing the current message input by the user
  const [message, setMessage] = useState("");
  // State for storing the selected recipient
  const [recipient, setRecipient] = useState("");

  // Mock user object for demonstration
  const user = mockUser;

  /**
   * useEffect hook to listen for messages between the current user and the selected recipient.
   * Function created by Tom Wang.
   * It sets up a Firestore snapshot listener that updates the state with new messages in real-time.
   */
  useEffect(() => {
    let unsubscribe;
    if (user && recipient) {
      console.log('Listening for messages:', { userEmail: user.email, recipient });
      listenForMessages(user.email, recipient, (msgs) => {
        setMessages(msgs);
      }).then((unsub) => {
        unsubscribe = unsub;
      }).catch((error) => {
        console.error('Error setting up listener:', error);
      });
    }
    // Clean up the snapshot listener on component unmount or when dependencies change
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, recipient]);

  /**
   * Adds a message to the Firestore messages collection.
   * Function created by Tom Wang.
   * @param {string} text - The text content of the message.
   * @returns {Promise<void>}
   * @throws Will throw an error if the message cannot be added.
   */
  const handleSendMessage = async (text) => {
    if (user && recipient) {
      try {
        const content = { text, timestamp: new Date() }; // Ensure content is structured properly
        console.log('Sending message:', { sender: user.email, recipient, content });
        await addMessage(user.email, recipient, content);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } else {
      console.error('Sender or recipient email is missing.', { sender: user.email, recipient });
    }
  };

  return (
    <PageContainer>
      <MessagingBox>
        <LightBulbContainer>
          <LightBulbAnimation />
        </LightBulbContainer>
        <Header>
          <Dropdown onChange={(e) => setRecipient(e.target.value)} value={recipient}>
            <option value="">Select Instructor</option>
            {mockInstructors.map((instructor, index) => (
              <option key={index} value={instructor.email}>{instructor.name}</option>
            ))}
          </Dropdown>
          <CenteredTitle>
            <Heading>Messaging</Heading>
          </CenteredTitle>
        </Header>
        <ContentWrapper>
          <ContentArea>
            <Subheading>Your conversation with {recipient ? `Instructor ${mockInstructors.find(inst => inst.email === recipient)?.name || "Unknown"}` : "Instructor"}:</Subheading>
            <ConversationArea>
              <MessageList messages={messages} />
            </ConversationArea>
            <Footer>
              <MessageForm
                message={message}
                setMessage={setMessage}
                onSend={handleSendMessage}
                user={user}
              />
            </Footer>
          </ContentArea>
        </ContentWrapper>
      </MessagingBox>
    </PageContainer>
  );
};

export default MessagingPage;
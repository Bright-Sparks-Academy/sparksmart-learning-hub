// src/views/MessagingPage.js
// Author: Tom Wang

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { addMessage, listenForMessages } from './Firestore';
import { auth } from './firebaseConfig';
import MessageForm from './MessageForm';
import MessageList from './MessageList';

/**
 * PageContainer is the main container for the MessagingPage.
 * It uses styled-components for styling.
 * This component sets the font family, background color, text color, and padding.
 * Created by Tom Wang.
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
 * Created by Tom Wang.
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
 * Created by Tom Wang.
 */
const Subheading = styled.h2`
  font-size: 2rem;
  color: #FFD900;
  text-align: center;
  margin-bottom: 1rem;
`;

/**
 * MessagingPage component renders the main messaging interface.
 * It includes MessageForm and MessageList components.
 * This component is the entry point for the messaging feature.
 * Created by Tom Wang.
 */
const MessagingPage = () => {
  // State for managing the list of messages
  const [messages, setMessages] = useState([]);

  // State for managing the input message
  const [message, setMessage] = useState("");

  // State for managing the recipient of the message
  const [recipient, setRecipient] = useState("");

  // Get the current authenticated user
  const user = auth.currentUser;

  /**
   * useEffect hook to listen for real-time updates to messages.
   * It sets up a Firestore listener when the user and recipient are set.
   * The listener is cleaned up when the component is unmounted or the dependencies change.
   * Created by Tom Wang.
   */
  useEffect(() => {
    let unsubscribe;
    if (user && recipient) {
      unsubscribe = listenForMessages(user.email, recipient, (msgs) => {
        setMessages(msgs);
      });
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user, recipient]);

  /**
   * handleSendMessage function to send a new message.
   * It uses the addMessage function from Firestore to add a new message document.
   * If an error occurs, it is logged to the console.
   * Created by Tom Wang.
   * @param {string} content - The content of the message to be sent.
   */
  const handleSendMessage = async (content) => {
    if (user) {
      try {
        await addMessage(user.email, recipient, content);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <PageContainer>
      <Heading>Messaging</Heading>
      <Subheading>Send a Message</Subheading>
      <MessageForm
        message={message}
        setMessage={setMessage}
        recipient={recipient}
        setRecipient={setRecipient}
        onSend={handleSendMessage}
      />
      <Subheading>Past Messages</Subheading>
      <MessageList messages={messages} />
    </PageContainer>
  );
};

export default MessagingPage;

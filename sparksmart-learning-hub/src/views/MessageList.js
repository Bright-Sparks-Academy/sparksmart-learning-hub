// src/views/MessageList.js
// Author: Tom Wang

import React from 'react';
import styled from 'styled-components';

/**
 * MessageListContainer is a styled-component that provides styling for the message list container.
 * Created by Tom Wang.
 */
const MessageListContainer = styled.div`
  margin-top: 2rem;
  max-height: 300px;
  overflow-y: auto;
`;

/**
 * MessageItem is a styled-component that provides styling for individual messages.
 * Created by Tom Wang.
 */
const MessageItem = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #000000;
`;

/**
 * MessageList component renders a list of messages.
 * @param {Object[]} messages - Array of message objects to be displayed.
 * Created by Tom Wang.
 */
const MessageList = ({ messages }) => {
  return (
    <MessageListContainer>
      {messages.map((msg, index) => (
        <MessageItem key={index}>
          <p><strong>{msg.sender}</strong>: {msg.content}</p>
          <p><em>{new Date(msg.timestamp.seconds * 1000).toLocaleString()}</em></p>
        </MessageItem>
      ))}
    </MessageListContainer>
  );
};

export default MessageList;

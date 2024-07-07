import React from 'react';
import styled from 'styled-components';
import defaultAvatar from '../assets/user-avatar_6596121.png';

// Author: Tom Wang
// This component renders a list of messages in a styled container.

/**
 * MessageListContainer is the main container for the message list.
 * It sets the margin, max height, overflow behavior, padding, border radius, and background color.
 * Created by Tom Wang.
 */
const MessageListContainer = styled.div`
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
  padding: 1rem;
  border-radius: 8px;
  background-color: #ffffff;
`;

/**
 * MessageItem is a styled-component for each individual message.
 * It sets the display, alignment, padding, margin, border, border radius, and background color.
 * Created by Tom Wang.
 */
const MessageItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 8px;
  border: 1px solid #FFD900;
  background-color: #f9f9f9;
`;

/**
 * Avatar is a styled-component for the user's avatar image.
 * It sets the size, border radius, and margin.
 * Created by Tom Wang.
 */
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

/**
 * MessageContent is a styled-component for the message content.
 * It sets the display and flex direction.
 * Created by Tom Wang.
 */
const MessageContent = styled.div`
  display: flex;
  flex-direction: column;
`;

/**
 * MessageList component renders a list of messages.
 * @param {Array} messages - An array of message objects to be displayed.
 * Created by Tom Wang.
 */
const MessageList = ({ messages }) => {
  const defaultAvatarUrl = defaultAvatar;

  return (
    <MessageListContainer>
      {messages.map((msg, index) => (
        <MessageItem key={index}>
          <Avatar src={msg.avatarUrl || defaultAvatarUrl} alt="User Avatar" />
          <MessageContent>
            <p><strong>{msg.sender}</strong>: {msg.content}</p>
            <p><em>{new Date(msg.timestamp.seconds * 1000).toLocaleString()}</em></p>
          </MessageContent>
        </MessageItem>
      ))}
    </MessageListContainer>
  );
};

export default MessageList;

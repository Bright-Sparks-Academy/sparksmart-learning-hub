import React from 'react';
import styled from 'styled-components';
import defaultAvatar from '../assets/user-avatar_6596121.png';

// Author: Tom Wang
// This component renders a form for sending messages with icons for different actions and a text input area.

/**
 * Form is a styled-component for the message form container.
 * It sets the display, flex direction, width, background color, border radius, padding, and font family.
 * Created by Tom Wang.
 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 8px;
  padding: 10px;
  font-family: 'Quicksand', sans-serif;
`;

/**
 * IconBar is a styled-component for the icon bar.
 * It sets the display, justification, margin, background color, padding, and border radius.
 * Created by Tom Wang.
 */
const IconBar = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  background-color: #f2f2f2;
  padding: 5px;
  border-radius: 8px;
`;

/**
 * Icon is a styled-component for the action icons.
 * It sets the size and cursor style.
 * Created by Tom Wang.
 */
const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

/**
 * InputArea is a styled-component for the input area.
 * It sets the display, alignment, background color, border radius, and padding.
 * Created by Tom Wang.
 */
const InputArea = styled.div`
  display: flex;
  align-items: center;
  background-color: #e6e6e6;
  border-radius: 8px;
  padding: 5px;
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
 * Textarea is a styled-component for the message input field.
 * It sets the flex, font size, padding, border radius, border, outline, and background color.
 * Created by Tom Wang.
 */
const Textarea = styled.input`
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #e6e6e6;
  font-family: 'Quicksand', sans-serif;
`;

/**
 * Button is a styled-component for the send button.
 * It sets the display, alignment, font size, padding, color, background color, border, border radius, cursor, margin, and font family.
 * It also changes the background color on hover.
 * Created by Tom Wang.
 */
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: #FFFFFF;
  background-color: #a9a9a9;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-left: 10px;
  font-family: 'Quicksand', sans-serif;
  &:hover {
    background-color: #808080;
  }
`;

/**
 * ButtonText is a styled-component for the text inside the button.
 * It sets the margin.
 * Created by Tom Wang.
 */
const ButtonText = styled.span`
  margin-left: 5px;
`;

/**
 * MessageForm component renders a form for sending messages.
 * @param {string} message - The current message input by the user.
 * @param {function} setMessage - The function to update the message state.
 * @param {function} onSend - The function to handle sending the message.
 * @param {object} user - The user object containing user info.
 * Created by Tom Wang.
 */
const MessageForm = ({ message, setMessage, onSend, user }) => {
  /**
   * Handles form submission.
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(message);
    setMessage('');
  };

  /**
   * Handles icon click actions.
   * @param {string} iconType - The type of icon clicked.
   */
  const handleIconClick = (iconType) => {
    console.log(`${iconType} icon clicked`);
  };

  const avatarUrl = user?.photoURL || defaultAvatar;

  return (
    <Form onSubmit={handleSubmit}>
      <IconBar>
        <Icon src="../assets/emoji.png" alt="emoji" onClick={() => handleIconClick('emoji')} />
        <Icon src="../assets/image.png" alt="image" onClick={() => handleIconClick('image')} />
        <Icon src="../assets/attachment.png" alt="attachment" onClick={() => handleIconClick('attachment')} />
        <Icon src="../assets/group.png" alt="group" onClick={() => handleIconClick('group')} />
        <Icon src="../assets/microphone.png" alt="microphone" onClick={() => handleIconClick('microphone')} />
        <Icon src="../assets/video.png" alt="video" onClick={() => handleIconClick('video')} />
        <Icon src="../assets/bold.png" alt="bold" onClick={() => handleIconClick('bold')} />
        <Icon src="../assets/italic.png" alt="italic" onClick={() => handleIconClick('italic')} />
        <Icon src="../assets/underline.png" alt="underline" onClick={() => handleIconClick('underline')} />
        <Icon src="../assets/pen.png" alt="pen" onClick={() => handleIconClick('pen')} />
      </IconBar>
      <InputArea>
        <Avatar src={avatarUrl} alt="User Avatar" />
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit">
          <ButtonText>Send</ButtonText>
        </Button>
      </InputArea>
    </Form>
  );
};

export default MessageForm;

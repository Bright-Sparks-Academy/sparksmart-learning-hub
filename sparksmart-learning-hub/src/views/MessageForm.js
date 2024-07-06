// src/views/MessageForm.js
// Author: Tom Wang

import React from 'react';
import styled from 'styled-components';

/**
 * Form is a styled-component for the message form.
 * It sets the display, flex direction, alignment, and margin.
 * Created by Tom Wang.
 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
`;

/**
 * Textarea is a styled-component for the message input field.
 * It sets the font size, padding, margin, width, and height.
 * Created by Tom Wang.
 */
const Textarea = styled.textarea`
  font-size: 1rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 500px;
  height: 150px;
`;

/**
 * Input is a styled-component for the recipient email input field.
 * It sets the font size, padding, margin, and width.
 * Created by Tom Wang.
 */
const Input = styled.input`
  font-size: 1rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 500px;
`;

/**
 * Button is a styled-component for the send button.
 * It sets the font size, padding, color, background color, border, and cursor.
 * Created by Tom Wang.
 */
const Button = styled.button`
  font-size: 1rem;
  padding: 0.5rem 1rem;
  color: #FFFFFF;
  background-color: #FFD900;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #FFC107;
  }
`;

/**
 * MessageForm component renders the form for sending messages.
 * It includes a textarea for the message, an input for the recipient email,
 * and a button to send the message.
 * Created by Tom Wang.
 */
const MessageForm = ({ message, setMessage, recipient, setRecipient, onSend }) => {
  /**
   * handleSubmit is called when the form is submitted.
   * It prevents the default form submission behavior and calls the onSend function.
   * Created by Tom Wang.
   * @param {Event} e - The form submission event.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(message);
    setMessage('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Textarea
        placeholder="Type your message here..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Recipient Email"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <Button type="submit">Send</Button>
    </Form>
  );
};

export default MessageForm;

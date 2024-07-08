import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import defaultAvatar from '../assets/user-avatar_6596121.png';
import Picker from 'emoji-picker-react';

// Styled components definitions...

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
const Textarea = styled.textarea`
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #e6e6e6;
  resize: none;
  height: 3rem;
  ${({ $isBold }) => $isBold && 'font-weight: bold;'}
  ${({ $isItalic }) => $isItalic && 'font-style: italic;'}
  ${({ $isUnderline }) => $isUnderline && 'text-decoration: underline;'}
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
 * CanvasWrapper is a styled-component to conditionally display the drawing canvas.
 * @param {boolean} show - Determines whether to show the canvas.
 */
const CanvasWrapper = styled.div`
  position: relative;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

/**
 * Canvas is a styled-component for the drawing canvas.
 * It sets the size and border of the canvas.
 */
const Canvas = styled.canvas`
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to manage the visibility of the emoji picker
  const [isBold, setIsBold] = useState(false); // State to toggle bold text
  const [isItalic, setIsItalic] = useState(false); // State to toggle italic text
  const [isUnderline, setIsUnderline] = useState(false); // State to toggle underline text
  const [isDrawing, setIsDrawing] = useState(false); // State to track drawing status
  const [showCanvas, setShowCanvas] = useState(false); // State to toggle the visibility of the drawing canvas
  const imageInputRef = useRef(null); // Ref for the image input element
  const attachmentInputRef = useRef(null); // Ref for the attachment input element
  const canvasRef = useRef(null); // Ref for the canvas element
  const ctxRef = useRef(null); // Ref for the canvas context
  const drawingData = useRef([]); // Ref to store drawing data

  /**
   * Handles form submission.
   * @param {Object} e - The event object.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    if (message.trim()) { // Checks if the message is not empty or just whitespace
      onSend(message); // Calls the onSend function to handle the message sending
      setMessage(''); // Resets the message input field
    }
  };

  /**
   * Handles emoji selection.
   * @param {Object} emojiData - The selected emoji data.
   */
  const handleEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji); // Appends the selected emoji to the current message
    setShowEmojiPicker(false); // Hides the emoji picker after selection
  };

  /**
   * Handles icon click actions.
   * @param {string} iconType - The type of icon clicked.
   */
  const handleIconClick = (iconType) => {
    switch (iconType) {
      case 'emoji':
        setShowEmojiPicker(!showEmojiPicker); // Toggles the visibility of the emoji picker
        break;
      case 'image':
        imageInputRef.current.click(); // Triggers the image input click
        break;
      case 'attachment':
        attachmentInputRef.current.click(); // Triggers the attachment input click
        break;
      case 'group':
        alert('Group management feature not implemented yet.'); // Placeholder alert for group management
        break;
      case 'microphone':
        alert('Microphone recording feature not implemented yet.'); // Placeholder alert for microphone recording
        break;
      case 'video':
        alert('Video recording feature not implemented yet.'); // Placeholder alert for video recording
        break;
      case 'bold':
        setIsBold(!isBold); // Toggles bold text
        break;
      case 'italic':
        setIsItalic(!isItalic); // Toggles italic text
        break;
      case 'underline':
        setIsUnderline(!isUnderline); // Toggles underline text
        break;
      case 'pen':
        setShowCanvas(!showCanvas); // Toggles the visibility of the drawing canvas
        break;
      default:
        console.log(`${iconType} icon clicked`);
    }
  };

  /**
   * Handles file input changes.
   * @param {Object} event - The event object.
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Gets the selected file
    if (file) {
      alert(`Selected file - ${file.name}`); // Placeholder alert for file selection
    }
  };

  /**
   * Starts drawing on the canvas.
   * @param {Object} nativeEvent - The native event object.
   */
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  /**
   * Finishes drawing on the canvas.
   */
  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    drawingData.current.push(ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
  };

  /**
   * Draws on the canvas.
   * @param {Object} nativeEvent - The native event object.
   */
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  /**
   * Sets up the canvas context.
   */
  useEffect(() => {
    if (showCanvas) {
      const canvas = canvasRef.current;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      const ctx = canvas.getContext('2d');
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 2;
      ctxRef.current = ctx;
    }
  }, [showCanvas]);

  const avatarUrl = user?.photoURL || defaultAvatar; // Uses the user's photo URL if available, otherwise uses a default avatar

  return (
    <Form onSubmit={handleSubmit}>
      <IconBar>
        <Icon src="../assets/emoji.png" alt="emoji" onClick={() => handleIconClick('emoji')} />
        <Icon src="../assets/image.png" alt="image" onClick={() => handleIconClick('image')} />
        <input type="file" ref={imageInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <Icon src="../assets/attachment.png" alt="attachment" onClick={() => handleIconClick('attachment')} />
        <input type="file" ref={attachmentInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <Icon src="../assets/group.png" alt="group" onClick={() => handleIconClick('group')} />
        <Icon src="../assets/microphone.png" alt="microphone" onClick={() => handleIconClick('microphone')} />
        <Icon src="../assets/video.png" alt="video" onClick={() => handleIconClick('video')} />
        <Icon src="../assets/bold.png" alt="bold" onClick={() => handleIconClick('bold')} />
        <Icon src="../assets/italic.png" alt="italic" onClick={() => handleIconClick('italic')} />
        <Icon src="../assets/underline.png" alt="underline" onClick={() => handleIconClick('underline')} />
        <Icon src="../assets/pen.png" alt="pen" onClick={() => handleIconClick('pen')} />
      </IconBar>
      {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />} {/* Renders the emoji picker if showEmojiPicker is true */}
      <CanvasWrapper show={showCanvas}>
        <Canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} />
      </CanvasWrapper>
      <InputArea>
        <Avatar src={avatarUrl} alt="User Avatar" />
        <Textarea
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)} // Updates the message state when the input changes
          $isBold={isBold} // Applies bold style if isBold is true
          $isItalic={isItalic} // Applies italic style if isItalic is true
          $isUnderline={isUnderline} // Applies underline style if isUnderline is true
        />
        <Button type="submit">
          <ButtonText>Send</ButtonText>
        </Button>
      </InputArea>
    </Form>
  );
};

export default MessageForm;

import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import defaultAvatar from '../assets/user-avatar_6596121.png';
import Picker from 'emoji-picker-react';
import { saveAs } from 'file-saver';
import { ReactMediaRecorder } from 'react-media-recorder';
import html2canvas from 'html2canvas';

// Styled components definitions...

/**
 * Form is a styled-component for the message form container.
 * It sets the display, flex direction, width, background color, border radius, padding, and font family.
 * @author Tom Wang
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
 * @author Tom Wang
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
 * @author Tom Wang
 */
const Icon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

/**
 * InputArea is a styled-component for the input area.
 * It sets the display, alignment, background color, border radius, and padding.
 * @author Tom Wang
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
 * @author Tom Wang
 */
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

/**
 * EditableDiv is a styled-component for the message input field.
 * It sets the flex, font size, padding, border radius, border, outline, and background color.
 * @author Tom Wang
 */
const EditableDiv = styled.div`
  flex: 1;
  font-size: 1rem;
  padding: 0.5rem;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: #e6e6e6;
  min-height: 3rem;
  white-space: pre-wrap;
  overflow-wrap: break-word;
`;

/**
 * Button is a styled-component for the send button.
 * It sets the display, alignment, font size, padding, color, background color, border, border radius, cursor, margin, and font family.
 * It also changes the background color on hover.
 * @author Tom Wang
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
 * @author Tom Wang
 */
const ButtonText = styled.span`
  margin-left: 5px;
`;

/**
 * CanvasWrapper is a styled-component to conditionally display the drawing canvas.
 * @param {boolean} show - Determines whether to show the canvas.
 * @author Tom Wang
 */
const CanvasWrapper = styled.div`
  position: relative;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

/**
 * Canvas is a styled-component for the drawing canvas.
 * It sets the size and border of the canvas.
 * @author Tom Wang
 */
const Canvas = styled.canvas`
  width: 100%;
  height: 200px;
  border: 1px solid #ddd;
`;

/**
 * SaveButton is a styled-component for the save drawing button.
 * @param {boolean} show - Determines whether to show the button.
 * @author Tom Wang
 */
const SaveButton = styled.button`
  display: ${({ show }) => (show ? 'block' : 'none')};
  margin-top: 5px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 5px;
  font-family: 'Quicksand', sans-serif;
`;

/**
 * MessageForm component renders a form for sending messages.
 * @param {string} message - The current message input by the user.
 * @param {function} setMessage - The function to update the message state.
 * @param {function} onSend - The function to handle sending the message.
 * @param {object} user - The user object containing user info.
 * @author Tom Wang
 */
const MessageForm = ({ message, setMessage, onSend, user }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to manage the visibility of the emoji picker
  const [showCanvas, setShowCanvas] = useState(false); // State to toggle the visibility of the drawing canvas
  const [isDrawing, setIsDrawing] = useState(false); // State to track drawing status
  const [messages, setMessages] = useState([]); // State to manage messages
  const [isRecordingAudio, setIsRecordingAudio] = useState(false); // State to manage audio recording
  const [isRecordingVideo, setIsRecordingVideo] = useState(false); // State to manage video recording
  const imageInputRef = useRef(null); // Ref for the image input element
  const attachmentInputRef = useRef(null); // Ref for the attachment input element
  const canvasRef = useRef(null); // Ref for the canvas element
  const ctxRef = useRef(null); // Ref for the canvas context
  const drawingData = useRef([]); // Ref to store drawing data
  const editableDivRef = useRef(null); // Ref for the editable div

  /**
   * Handles form submission.
   * @param {Object} e - The event object.
   * @author Tom Wang
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    const text = editableDivRef.current.innerHTML; // Gets the innerHTML of the editable div
    if (text.trim() || drawingData.current.length > 0) { // Checks if the text is not empty or if there is drawing data
      if (drawingData.current.length > 0) { // If there is drawing data
        const drawingMessage = `${text}\n[Drawing Attached]`; // Appends the drawing message
        onSend(drawingMessage, drawingData.current); // Sends the message with the drawing
      } else {
        onSend(text); // Sends the text message
      }
      editableDivRef.current.innerHTML = ''; // Clears the editable div
      drawingData.current = []; // Resets the drawing data
      setShowCanvas(false); // Hides the canvas
      setMessages([...messages, { text, id: Date.now(), editing: false }]); // Adds the message to the state
    }
  };

  /**
   * Handles emoji selection.
   * @param {Object} emojiData - The selected emoji data.
   * @author Tom Wang
   */
  const handleEmojiClick = (emojiData) => {
    editableDivRef.current.focus(); // Focuses the editable div
    document.execCommand('insertText', false, emojiData.emoji); // Inserts the emoji into the editable div
    setShowEmojiPicker(false); // Hides the emoji picker
  };

  /**
   * Handles icon click actions.
   * @param {string} iconType - The type of icon clicked.
   * @author Tom Wang
   */
  const handleIconClick = (iconType) => {
    editableDivRef.current.focus(); // Focuses the editable div
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
        // Group management logic
        break;
      case 'microphone':
        setIsRecordingAudio(!isRecordingAudio); // Toggles the audio recording state
        break;
      case 'video':
        setIsRecordingVideo(!isRecordingVideo); // Toggles the video recording state
        break;
      case 'bold':
        document.execCommand('bold'); // Applies bold formatting to the selected text
        break;
      case 'italic':
        document.execCommand('italic'); // Applies italic formatting to the selected text
        break;
      case 'underline':
        document.execCommand('underline'); // Applies underline formatting to the selected text
        break;
      case 'pen':
        setShowCanvas(!showCanvas); // Toggles the visibility of the drawing canvas
        break;
      default:
        console.log(`${iconType} icon clicked`); // Logs the icon type
    }
  };

  /**
   * Handles file input changes.
   * @param {Object} event - The event object.
   * @author Tom Wang
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
   * @author Tom Wang
   */
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  /**
   * Finishes drawing on the canvas.
   * @author Tom Wang
   */
  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    drawingData.current.push(ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
  };

  /**
   * Draws on the canvas.
   * @param {Object} nativeEvent - The native event object.
   * @author Tom Wang
   */
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  /**
   * Sets up the canvas context.
   * @author Tom Wang
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

  /**
   * Saves the drawing as an image file.
   * @author Tom Wang
   */
  const saveDrawing = () => {
    html2canvas(canvasRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        saveAs(blob, 'drawing.png');
      });
    });
  };

  /**
   * Toggles the edit state of a message.
   * @param {number} id - The id of the message to edit.
   * @author Tom Wang
   */
  const toggleEditMessage = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, editing: !msg.editing } : msg
      )
    );
  };

  /**
   * Deletes a message.
   * @param {number} id - The id of the message to delete.
   * @author Tom Wang
   */
  const deleteMessage = (id) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  /**
   * Handles message text change during editing.
   * @param {number} id - The id of the message to update.
   * @param {string} text - The new text of the message.
   * @author Tom Wang
   */
  const handleEditMessageChange = (id, text) => {
    setMessages(
      messages.map((msg) => (msg.id === id ? { ...msg, text } : msg))
    );
  };

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
        <ReactMediaRecorder
          audio
          render={({ startRecording, stopRecording, mediaBlobUrl }) => (
            <>
              <Icon src="../assets/microphone.png" alt="microphone" onClick={startRecording} />
              <Icon src="../assets/stop.png" alt="stop" onClick={stopRecording} />
              {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
            </>
          )}
        />
        <ReactMediaRecorder
          video
          render={({ startRecording, stopRecording, mediaBlobUrl }) => (
            <>
              <Icon src="../assets/video.png" alt="video" onClick={startRecording} />
              <Icon src="../assets/stop.png" alt="stop" onClick={stopRecording} />
              {mediaBlobUrl && <video src={mediaBlobUrl} controls />}
            </>
          )}
        />
        <Icon src="../assets/bold.png" alt="bold" onClick={() => handleIconClick('bold')} />
        <Icon src="../assets/italic.png" alt="italic" onClick={() => handleIconClick('italic')} />
        <Icon src="../assets/underline.png" alt="underline" onClick={() => handleIconClick('underline')} />
        <Icon src="../assets/pen.png" alt="pen" onClick={() => handleIconClick('pen')} />
      </IconBar>
      {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />} {/* Renders the emoji picker if showEmojiPicker is true */}
      <CanvasWrapper show={showCanvas}>
        <Canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} />
        <SaveButton show={showCanvas} onClick={saveDrawing}>Save Drawing</SaveButton>
      </CanvasWrapper>
      <InputArea>
        <Avatar src={avatarUrl} alt="User Avatar" />
        <EditableDiv
          ref={editableDivRef}
          contentEditable
          placeholder="Type your message here..."
        />
        <Button type="submit">
          <ButtonText>Send</ButtonText>
        </Button>
      </InputArea>
      <div>
        {messages.map((message) => (
          <div key={message.id}>
            {message.editing ? (
              <EditableDiv
                contentEditable
                suppressContentEditableWarning={true}
                onBlur={(e) =>
                  handleEditMessageChange(message.id, e.target.innerText)
                }
              >
                {message.text}
              </EditableDiv>
            ) : (
              <p>{message.text}</p>
            )}
            <button onClick={() => toggleEditMessage(message.id)}>
              {message.editing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => deleteMessage(message.id)}>Delete</button>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default MessageForm;

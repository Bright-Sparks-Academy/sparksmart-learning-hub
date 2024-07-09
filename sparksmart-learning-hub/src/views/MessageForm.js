import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import defaultAvatar from '../assets/user-avatar_6596121.png';
import Picker from 'emoji-picker-react';
import emojiIcon from '../assets/smile.png';
import imageIcon from '../assets/icons8-image-48.png';
import attachmentIcon from '../assets/icons8-attachment-50.png';
import microphoneIcon from '../assets/icons8-microphone-50.png';
import videoIcon from '../assets/icons8-video-48.png';
import boldIcon from '../assets/icons8-bold-50.png';
import italicIcon from '../assets/icons8-italic-32.png';
import underlineIcon from '../assets/icons8-underline-50.png';
import penIcon from '../assets/icons8-pen-48.png';

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
 * EditableDiv is a styled-component for the message input field.
 * It sets the flex, font size, padding, border radius, border, outline, and background color.
 * Created by Tom Wang.
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
 * @param {boolean} $show - Determines whether to show the canvas.
 * Created by Tom Wang.
 */
const CanvasWrapper = styled.div`
  position: relative;
  display: ${({ $show }) => ($show ? 'block' : 'none')};
`;

/**
 * Canvas is a styled-component for the drawing canvas.
 * It sets the size and border of the canvas.
 * Created by Tom Wang.
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
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [isRecordingVideo, setIsRecordingVideo] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const imageInputRef = useRef(null);
  const attachmentInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawingData = useRef([]);
  const editableDivRef = useRef(null);

  /**
   * Handles form submission.
   * @param {Object} e - The event object.
   * Created by Tom Wang.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    const text = editableDivRef.current.innerHTML;
    if (text.trim() || drawingData.current.length > 0) {
      if (drawingData.current.length > 0) {
        const drawingMessage = `${text}\n[Drawing Attached]`;
        onSend(drawingMessage, drawingData.current);
      } else {
        onSend(text);
      }
      editableDivRef.current.innerHTML = '';
      drawingData.current = [];
      setShowCanvas(false);
    }
  };

  /**
   * Handles emoji selection.
   * @param {Object} emojiData - The selected emoji data.
   * Created by Tom Wang.
   */
  const handleEmojiClick = (emojiData) => {
    editableDivRef.current.focus();
    document.execCommand('insertText', false, emojiData.emoji);
    setShowEmojiPicker(false);
  };

  /**
   * Handles icon click actions.
   * @param {string} iconType - The type of icon clicked.
   * Created by Tom Wang.
   */
  const handleIconClick = (iconType) => {
    editableDivRef.current.focus();
    switch (iconType) {
      case 'emoji':
        setShowEmojiPicker(!showEmojiPicker);
        break;
      case 'image':
        imageInputRef.current.click();
        break;
      case 'attachment':
        attachmentInputRef.current.click();
        break;
      case 'group':
        alert('Group management feature not implemented yet.');
        break;
      case 'microphone':
        toggleRecording('audio');
        break;
      case 'video':
        toggleRecording('video');
        break;
      case 'bold':
        document.execCommand('bold');
        break;
      case 'italic':
        document.execCommand('italic');
        break;
      case 'underline':
        document.execCommand('underline');
        break;
      case 'pen':
        setShowCanvas(!showCanvas);
        break;
      default:
        console.log(`${iconType} icon clicked`);
    }
  };

  /**
   * Handles file input changes.
   * @param {Object} event - The event object.
   * Created by Tom Wang.
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Selected file - ${file.name}`);
    }
  };

  /**
   * Starts drawing on the canvas.
   * @param {Object} nativeEvent - The native event object.
   * Created by Tom Wang.
   */
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  /**
   * Finishes drawing on the canvas.
   * Created by Tom Wang.
   */
  const finishDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
    drawingData.current.push(ctxRef.current.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
  };

  /**
   * Draws on the canvas.
   * @param {Object} nativeEvent - The native event object.
   * Created by Tom Wang.
   */
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    ctxRef.current.lineTo(offsetX, offsetY);
    ctxRef.current.stroke();
  };

  /**
   * Sets up the canvas context.
   * Created by Tom Wang.
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
   * Toggles audio or video recording.
   * @param {string} type - The type of recording ('audio' or 'video').
   * Created by Tom Wang.
   */
  const toggleRecording = (type) => {
    if (type === 'audio') {
      if (!isRecordingAudio) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = event => {
            if (event.data.size > 0) {
              setRecordedChunks(prev => [...prev, event.data]);
            }
          };
          recorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'audio/webm' });
            const url = URL.createObjectURL(blob);
            alert(`Recording saved: ${url}`);
            setRecordedChunks([]);
          };
          recorder.start();
          setMediaRecorder(recorder);
          setIsRecordingAudio(true);
        });
      } else {
        mediaRecorder.stop();
        setIsRecordingAudio(false);
      }
    } else if (type === 'video') {
      if (!isRecordingVideo) {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = event => {
            if (event.data.size > 0) {
              setRecordedChunks(prev => [...prev, event.data]);
            }
          };
          recorder.onstop = () => {
            const blob = new Blob(recordedChunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            alert(`Recording saved: ${url}`);
            setRecordedChunks([]);
          };
          recorder.start();
          setMediaRecorder(recorder);
          setIsRecordingVideo(true);
        });
      } else {
        mediaRecorder.stop();
        setIsRecordingVideo(false);
      }
    }
  };

  const avatarUrl = user?.photoURL || defaultAvatar;

  return (
    <Form onSubmit={handleSubmit}>
      <IconBar>
        <Icon src={emojiIcon} alt="emoji" onClick={() => handleIconClick('emoji')} />
        <Icon src={imageIcon} alt="image" onClick={() => handleIconClick('image')} />
        <input type="file" ref={imageInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <Icon src={attachmentIcon} alt="attachment" onClick={() => handleIconClick('attachment')} />
        <input type="file" ref={attachmentInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <Icon src={videoIcon} alt="video" onClick={() => handleIconClick('video')} />
        <input type="file" ref={videoInputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        <Icon src={microphoneIcon} alt="microphone" onClick={() => handleIconClick('microphone')} />
        <Icon src={boldIcon} alt="bold" onClick={() => handleIconClick('bold')} />
        <Icon src={italicIcon} alt="italic" onClick={() => handleIconClick('italic')} />
        <Icon src={underlineIcon} alt="underline" onClick={() => handleIconClick('underline')} />
        <Icon src={penIcon} alt="pen" onClick={() => handleIconClick('pen')} />
      </IconBar>
      {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      <CanvasWrapper $show={showCanvas}>
        <Canvas ref={canvasRef} onMouseDown={startDrawing} onMouseUp={finishDrawing} onMouseMove={draw} />
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
    </Form>
  );
};

export default MessageForm;

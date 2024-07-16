import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { auth, db, storage } from '../firebaseConfig.js';
import { collection, query, where, orderBy, onSnapshot, addDoc, updateDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { roles, getRole } from '../roles.js';
import LightBulbAnimation from '../components/LightBulbAnimation.js';

// Styled components for the UI elements

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding-top: 70px;
  font-family: 'Quicksand', sans-serif;
  background-color: #f9f9f9;
  color: #000000;
`;

const MessagingBox = styled.div`
  width: 80%;
  max-width: 1000px;
  height: 80vh;
  border: 12px solid #FFD900;
  border-radius: 30px;
  background-color: #EDEDED;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #FFD900;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const CenteredTitle = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  color: #000000;
  margin: 0;
`;

const Dropdown = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
`;

const LightBulbContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 30px;
  height: 30px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
  background-color: #D3D3D3;
  border-radius: 10px;
  padding: 10px;
`;

const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #CFCFCF;
  border-radius: 5px;
  padding: 10px;
`;

const Subheading = styled.h2`
  font-size: 1.2rem;
  color: #000000;
  text-align: center;
  margin-bottom: 10px;
  font-family: 'Quicksand', sans-serif;
`;

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

const MessageContainer = styled.div`
  display: flex;
  justify-content: ${props => props.isCurrentUser ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

const MessageBubble = styled.div`
  max-width: 70%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${props => props.isCurrentUser ? '#DCF8C6' : '#FFFFFF'};
  position: relative;
`;

const MessageOptions = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;

  ${MessageBubble}:hover & {
    opacity: 1;
  }
`;

const MessageForm = styled.form`
  display: flex;
  margin-top: 10px;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
`;

const SendButton = styled.button`
  background-color: #FFD900;
  color: #000000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 10px;
`;

const FileInput = styled.input`
  display: none;
`;

const FileLabel = styled.label`
  background-color: #FFD900;
  color: #000000;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-left: 10px;
`;

const MessagingPage = () => {
  // State variables to manage the component's data
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [userRole, setUserRole] = useState('');
  const fileInputRef = useRef(null);
// Effect to handle user authentication
  useEffect(() => {
    // If a user is logged in, set the user and their role
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const role = getRole(currentUser.email);
        setUserRole(role);
      } else {
        // If no user is logged in, set user to null
        setUser(null);
      }
    });
 // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);
// Effect to fetch and update messages in real-time
// Create a query to fetch messages for the current conversation

  useEffect(() => {
    if (user && selectedRecipient) {
      const q = query(
        collection(db, 'messages'),
        where('participants', 'array-contains', user.email),
        orderBy('timestamp', 'asc')
      );
   // Set up a real-time listener for messages
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(msg => msg.participants.includes(selectedRecipient));
        setMessages(newMessages);
      });

      return () => unsubscribe();
    }
  }, [user, selectedRecipient]);     // Clean up the listener when the component unmounts or the user/recipient changes
  // Function to handle sending a new message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() && user && selectedRecipient) {   // Add the new message to the Firestore database
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        sender: user.email,
        recipient: selectedRecipient,
        participants: [user.email, selectedRecipient],
        timestamp: serverTimestamp(),
      });
      setNewMessage('');     // Clear the message input after sending
    }
  };

  const handleFileUpload = async (e) => {  // Function to handle file uploads
    const file = e.target.files[0];
    if (file && user && selectedRecipient) {
      const storageRef = ref(storage, `chat_files/${file.name}`);   // Upload the file to Firebase Storage (RN DOES NOT WORK)
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, 'messages'), {  // Add a new message with the file information
        text: `File: ${file.name}`,
        fileURL: downloadURL,
        sender: user.email,
        recipient: selectedRecipient,
        participants: [user.email, selectedRecipient],
        timestamp: serverTimestamp(),
      });
    }
  };

  const handleDeleteMessage = async (messageId) => {  // Function to handle message deletion
    if (window.confirm('Are you sure you want to delete this message?')) {   // Delete the message from the Firestore database
      await deleteDoc(doc(db, 'messages', messageId));
    }
  };

  const getRecipientOptions = () => {   // Function to get the list of recipients based on the user's role
    if (userRole === 'teacher') {
      return roles.students;
    } else {
      return roles.teachers;
    }
  };

  return ( // all ui based
    <PageContainer>
      <MessagingBox>
        <LightBulbContainer>
          <LightBulbAnimation />
        </LightBulbContainer>
        <Header>
          <Dropdown 
            onChange={(e) => setSelectedRecipient(e.target.value)} 
            value={selectedRecipient}
          >
            <option value="">Select Recipient</option>
            {getRecipientOptions().map((recipient, index) => (
              <option key={index} value={recipient}>{recipient}</option>
            ))}
          </Dropdown>
          <CenteredTitle>
            <Heading>Messaging</Heading>
          </CenteredTitle>
        </Header>
        <ContentWrapper>
          <ContentArea>
            <Subheading>Your conversation with {selectedRecipient || "Recipient"}</Subheading>
            <ConversationArea>
              {messages.map((msg) => (
                <MessageContainer key={msg.id} isCurrentUser={msg.sender === user?.email}>
                  <MessageBubble isCurrentUser={msg.sender === user?.email}>
                    <strong>{msg.sender === user?.email ? 'You' : msg.sender}:</strong> 
                    {msg.text}
                    {msg.fileURL && <a href={msg.fileURL} target="_blank" rel="noopener noreferrer">View File</a>}
                    {msg.sender === user?.email && (
                      <MessageOptions onClick={() => handleDeleteMessage(msg.id)}>...</MessageOptions>
                    )}
                  </MessageBubble>
                </MessageContainer>
              ))}
            </ConversationArea>
            <MessageForm onSubmit={handleSendMessage}>
              <MessageInput
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <SendButton type="submit">Send</SendButton>
              <FileLabel htmlFor="file-upload">Upload File</FileLabel>
              <FileInput
                id="file-upload"
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
              />
            </MessageForm>
          </ContentArea>
        </ContentWrapper>
      </MessagingBox>
    </PageContainer>
  );
};

export default MessagingPage;
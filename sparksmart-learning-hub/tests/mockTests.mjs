import { signInMockUser } from '../src/firebaseConfig.js';
import { addMessage, listenForMessages } from '../src/Firestore.js';
import { format } from 'date-fns';
import { Faker, en, fr, de, es, it, ja, ko, pt_BR, ru, zh_CN } from '@faker-js/faker';

// Create a Faker instance with all supported locales
const faker = new Faker({
  locale: [en, fr, de, es, it, ja, ko, pt_BR, ru, zh_CN],
});

// Convert Firestore Timestamp to a formatted string using date-fns.
const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return format(date, 'yyyy-MM-dd hh:mm:ss a');
  }
  return 'Invalid date';
};

// Generate a random message using Faker.
const generateRandomMessage = () => {
  return faker.lorem.sentence();
};

// Add a delay to simulate real-world messaging intervals.
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Test adding multiple random messages to Firestore using the mock user.
const testAddRandomMessagesMultiSenders = async (messageCount = 2000) => {
  try {
    // Sign in as a mock user
    const mockUser = await signInMockUser();
    const userEmail = mockUser.email; // testuser@example.com
    const senderEmails = ['instructor1@example.com', 'instructor2@example.com'];

    for (let i = 0; i < messageCount; i++) {
      // Alternate between user and instructors for sender and recipient
      const sender = i % 2 === 0 ? userEmail : senderEmails[i % senderEmails.length];
      const recipient = i % 2 === 0 ? senderEmails[i % senderEmails.length] : userEmail;
      const content = {
        text: generateRandomMessage() || 'No content available' // Ensure text is never undefined
      };

      // Debugging log to check the message structure
      console.log(`Adding message from ${sender} to ${recipient}: ${content.text}`);

      // Add the message to Firestore
      await addMessage(sender, recipient, content);
      await delay(50); // Add a 50ms delay between messages
    }

    console.log('All messages added successfully');
  } catch (error) {
    console.error('Error adding messages:', error);
  }
};

// Test listening for real-time messages in Firestore using the mock user.
const testListenForMessages = () => {
  try {
    const userEmail = 'testuser@example.com';
    // Listen for messages involving the mock user
    listenForMessages(userEmail, userEmail, (messages) => {
      // Format the timestamps of the received messages
      const formattedMessages = messages.map(msg => ({
        ...msg,
        timestamp: formatTimestamp(msg.timestamp)
      }));
      console.log('Real-time messages:', formattedMessages);
    });
  } catch (error) {
    console.error('Error listening for messages:', error);
  }
};

// Run the test functions to add and listen for messages
testListenForMessages();
testAddRandomMessagesMultiSenders();

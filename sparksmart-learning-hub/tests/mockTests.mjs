import { signInMockUser } from '../src/firebaseConfig.js';
import { addMessage, listenForMessages } from '../src/Firestore.js';
import { format } from 'date-fns';
import { Faker, en, fr, de, es, it, ja, ko, pt_BR, ru, zh_CN } from '@faker-js/faker';

// Create a Faker instance with all supported locales
const faker = new Faker({
  locale: [en, fr, de, es, it, ja, ko, pt_BR, ru, zh_CN],
});

/**
 * Convert Firestore Timestamp to a formatted string.
 * @param {Timestamp} timestamp - The Firestore Timestamp object.
 * @returns {string} - The formatted timestamp.
 */
const formatTimestamp = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000);
    return format(date, 'yyyy-MM-dd hh:mm:ss a');
  }
  return null;
};

/**
 * Generate a random message.
 * @returns {string} - The generated message.
 */
const generateRandomMessage = () => {
  return faker.lorem.sentence();
};

/**
 * Add a delay to simulate real-world messaging intervals.
 * @param {number} ms - The delay duration in milliseconds.
 * @returns {Promise<void>} - A promise that resolves after the delay.
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Test adding multiple random messages to Firestore using the mock user.
 * This simulates a conversation where messages are exchanged between the user and instructors.
 * @param {number} messageCount - The number of messages to generate.
 */
const testAddRandomMessagesMultiSenders = async (messageCount = 2000) => {
  try {
    const mockUser = await signInMockUser();
    const userEmail = mockUser.email; // testuser@example.com
    const senderEmails = ['instructor1@example.com', 'instructor2@example.com'];

    for (let i = 0; i < messageCount; i++) {
      const sender = i % 2 === 0 ? userEmail : senderEmails[i % senderEmails.length];
      const recipient = i % 2 === 0 ? senderEmails[i % senderEmails.length] : userEmail;
      const content = generateRandomMessage();
      await addMessage(sender, recipient, content);
      console.log(`Message from ${sender} to ${recipient} added: ${content}`);
      await delay(50); // Add a 50ms delay between messages
    }

    console.log('All messages added successfully');
  } catch (error) {
    console.error('Error adding messages:', error);
  }
};

/**
 * Test listening for real-time messages in Firestore using the mock user.
 */
const testListenForMessages = () => {
  try {
    const userEmail = 'testuser@example.com';
    listenForMessages(userEmail, userEmail, (messages) => {
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

// Run the test functions
testListenForMessages();
testAddRandomMessagesMultiSenders();

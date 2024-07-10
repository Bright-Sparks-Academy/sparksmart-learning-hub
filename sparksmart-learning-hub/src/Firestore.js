import { db } from './firebaseConfig.js';
import { 
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc, 
  query, where, orderBy, onSnapshot, serverTimestamp, Timestamp 
} from "firebase/firestore"; // Import necessary Firestore functions

/**
 * Adds a new document to a specified Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {Object} data - The data to be added to the collection.
 * @returns {Promise<string>} - The ID of the newly created document.
 * @throws Will throw an error if the document cannot be added.
 * Function created by Tom Wang.
 */
const addData = async (collectionName, data) => {
  try {
    console.log(`Adding document to collection: ${collectionName}`, data);
    const docRef = await addDoc(collection(db, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document:", error);
    throw error;
  }
};

/**
 * Retrieves all documents from a specified Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @returns {Promise<Array>} - An array of objects containing the document data.
 * @throws Will throw an error if the documents cannot be retrieved.
 * Function created by Tom Wang.
 */
const getData = async (collectionName) => {
  try {
    console.log(`Getting documents from collection: ${collectionName}`);
    const querySnapshot = await getDocs(collection(db, collectionName));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    console.error("Error getting documents:", error);
    throw error;
  }
};

/**
 * Updates a document in a specified Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} docId - The ID of the document to update.
 * @param {Object} data - The new data to update in the document.
 * @returns {Promise<void>}
 * @throws Will throw an error if the document cannot be updated.
 * Function created by Tom Wang.
 */
const updateData = async (collectionName, docId, data) => {
  try {
    console.log(`Updating document in collection: ${collectionName}`, docId, data);
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};

/**
 * Deletes a document from a specified Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {string} docId - The ID of the document to delete.
 * @returns {Promise<void>}
 * @throws Will throw an error if the document cannot be deleted.
 * Function created by Tom Wang.
 */
const deleteData = async (collectionName, docId) => {
  try {
    console.log(`Deleting document from collection: ${collectionName}`, docId);
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

/**
 * Adds a message to the Firestore messages collection.
 * @param {string} senderEmail - The email of the sender.
 * @param {string} recipientEmail - The email of the recipient.
 * @param {Object} content - The content of the message which includes text and timestamp.
 * @returns {Promise<void>}
 * @throws Will throw an error if the message cannot be added.
 * Function created by Tom Wang.
 */
const addMessage = async (senderEmail, recipientEmail, content) => {
  if (!senderEmail || !recipientEmail || !content) {
    console.error('Missing required fields for adding message:', { senderEmail, recipientEmail, content });
    throw new Error('Missing required fields for adding message.');
  }

  try {
    console.log(`Adding message from ${senderEmail} to ${recipientEmail}:`, content);
    await addDoc(collection(db, 'messages'), {
      sender: senderEmail,
      recipient: recipientEmail,
      content: content.text,
      timestamp: content.timestamp ? Timestamp.fromDate(content.timestamp) : serverTimestamp(), // Use serverTimestamp if content.timestamp is not provided
      drawing: content.drawing || null,
    });
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

/**
 * Listens for real-time updates to messages in Firestore with rate limiting.
 * @param {string} userEmail - The email of the current user.
 * @param {string} recipientEmail - The email of the recipient.
 * @param {function} callback - The callback function to handle new messages.
 * @returns {function} - Unsubscribe function to stop listening for updates.
 * @throws Will throw an error if the messages cannot be retrieved.
 * Function created by Tom Wang.
 */
const listenForMessages = (userEmail, recipientEmail, callback) => {
  if (!userEmail || !recipientEmail) {
    console.error('Missing required fields for listening to messages:', { userEmail, recipientEmail });
    throw new Error('Missing required fields for listening to messages.');
  }

  console.log(`Listening for messages between ${userEmail} and ${recipientEmail}`);

  const q = query(
    collection(db, 'messages'),
    where('sender', 'in', [userEmail, recipientEmail]),
    where('recipient', 'in', [userEmail, recipientEmail]),
    orderBy('timestamp', 'asc')
  );

  // Implement a delay before setting up the snapshot listener
  const delay = 1000; // 1 second delay

  return new Promise((resolve) => {
    setTimeout(() => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs.map(doc => doc.data());
        console.log('Received messages:', messages);
        callback(messages);
      });
      resolve(unsubscribe);
    }, delay);
  });
};

export { addData, getData, updateData, deleteData, addMessage, listenForMessages };

// Firestore.js
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

/**
 * Adds a new document to a specified Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection.
 * @param {Object} data - The data to be added to the collection.
 * @returns {Promise<string>} - The ID of the newly created document.
 * @throws Will throw an error if the document cannot be added.
 */
const addData = async (collectionName, data) => {
  try {
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
 */
const getData = async (collectionName) => {
  try {
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
 */
const updateData = async (collectionName, docId, data) => {
  try {
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
 */
const deleteData = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw error;
  }
};

/**
 * Adds a message to the Firestore messages collection.
 * Function created by Tom Wang.
 * @param {string} sender - The email of the sender.
 * @param {string} recipient - The email of the recipient.
 * @param {string} content - The content of the message.
 * @returns {Promise<void>}
 * @throws Will throw an error if the message cannot be added.
 */
const addMessage = async (sender, recipient, content) => {
  try {
    await addDoc(collection(db, 'messages'), {
      sender,
      recipient,
      content,
      timestamp: serverTimestamp()
    });
  } catch (error) {
    console.error('Error adding message:', error);
    throw error;
  }
};

export { addData, getData, updateData, deleteData, addMessage };

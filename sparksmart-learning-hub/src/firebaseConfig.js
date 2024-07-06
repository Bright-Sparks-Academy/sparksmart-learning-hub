// src/firebaseConfig.js
// Author: Tom Wang

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, updateDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMsiL4J0x7cbie4Tm7QNkt7Cs6dpHFtZo",
  authDomain: "bright-sparks-22e8c.firebaseapp.com",
  projectId: "bright-sparks-22e8c",
  storageBucket: "bright-sparks-22e8c.appspot.com",
  messagingSenderId: "151742280856",
  appId: "1:151742280856:web:1886c4ef1042e16c87cced",
  measurementId: "G-HPEJEXS2G8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the auth service
const auth = getAuth(app);

// Get a reference to the Firestore service
const db = getFirestore(app);

// Get a reference to the storage service
const storage = getStorage(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

/**
 * Signs in a user using Google authentication.
 * Function created by Tom Wang.
 * @returns {Promise<Object>} - The signed-in user object.
 * @throws Will throw an error if the sign-in process fails.
 */
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Ensure Firestore has the user document
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      displayName: user.displayName,
      photoURL: user.photoURL,
      email: user.email
    }, { merge: true });

    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

/**
 * Logs out the currently signed-in user.
 * Function created by Tom Wang.
 * @returns {Promise<void>}
 * @throws Will throw an error if the sign-out process fails.
 */
const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

/**
 * Updates a user profile in Firestore.
 * Function created by Tom Wang.
 * @param {string} uid - The user ID.
 * @param {Object} data - The new user data.
 * @returns {Promise<void>}
 * @throws Will throw an error if the update process fails.
 */
const updateUserProfile = async (uid, data) => {
  try {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, data);
  } catch (error) {
    console.error("Error updating Firestore user document:", error);
    throw error;
  }
};

/**
 * Uploads a user avatar to Firebase Storage.
 * Function created by Tom Wang.
 * @param {File} file - The file to upload.
 * @param {string} userId - The user ID.
 * @returns {Promise<string>} - The download URL of the uploaded file.
 * @throws Will throw an error if the upload process fails.
 */
const uploadAvatar = async (file, userId) => {
  try {
    const storageRef = ref(storage, `avatars/${userId}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error uploading avatar:", error);
    throw error;
  }
};

export { auth, db, signInWithGoogle, logOut, updateUserProfile, uploadAvatar };

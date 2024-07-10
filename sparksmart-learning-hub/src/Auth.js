import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getRole } from "./roles"; // Make sure this is correctly implemented

// Firebase configuration object
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
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

/**
 * Mock user object for testing purposes.
 * This is used in place of a real authenticated user during development.
 * Created by Tom Wang.
 */
const mockUser = {
  email: "testuser@example.com",
  displayName: "Test User",
  uid: "testuid123",
  photoURL: '../assets/user-avatar_6596121.png' // Update this path as needed
};

/**
 * Function to handle sign-in with Google using Firebase authentication.
 * It uses a GoogleAuthProvider to open a sign-in popup and returns the signed-in user.
 * If sign-in is successful, user data is optionally saved to Firestore.
 * Created by Tom Wang.
 * @returns {Promise<User | void>} The signed-in user object or void if an error occurs.
 */
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    console.log("Signed in user:", user);
    // Save user data to Firestore
    await setDoc(doc(db, "users", user.uid), {
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      role: getRole(user.email) // Assuming this function exists and works correctly
    }, { merge: true });
    return user;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

/**
 * Function to handle user sign-out using Firebase authentication.
 * It signs out the current user and logs the action.
 * Created by Tom Wang.
 * @returns {Promise<void>} Resolves when the user is signed out.
 */
const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

/**
 * Function to update a user's profile in Firestore.
 * It updates the user document with the given data, merging with existing data.
 * Created by Tom Wang.
 * @param {string} uid - The user's unique ID.
 * @param {Object} data - The data to update in the user's profile.
 * @returns {Promise<void>} Resolves when the user's profile is updated.
 */
const updateUserProfile = async (uid, data) => {
  const userDocRef = doc(db, "users", uid);
  await setDoc(userDocRef, data, { merge: true });
};

/**
 * Function to upload a user's avatar to Firebase Storage.
 * It uploads the given file to the specified storage reference and returns the download URL.
 * Created by Tom Wang.
 * @param {File} file - The file to upload.
 * @param {string} userId - The user's unique ID.
 * @returns {Promise<string>} The download URL of the uploaded file.
 */
const uploadAvatar = async (file, userId) => {
  const storageRef = ref(storage, `avatars/${userId}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

/**
 * Function to simulate authentication for testing purposes.
 * This is used in place of a real authenticated user during development.
 * Created by Tom Wang.
 * @returns {Promise<Object>} A promise that resolves to the mock user object.
 */
const getMockUser = () => {
  return new Promise((resolve) => {
    resolve(mockUser);
  });
};

// Exporting the functions and mockUser for use in other parts of the application
export { auth, db, signInWithGoogle, logOut, updateUserProfile, uploadAvatar, mockUser, getMockUser };
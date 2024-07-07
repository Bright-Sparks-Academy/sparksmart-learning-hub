import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getRole } from "./roles";

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

// Mock user object for testing purposes
const mockUser = {
  email: "testuser@example.com",
  displayName: "Test User",
  uid: "testuid123",
  photoURL: "/src/assets/user-avatar_6596121.png"
};

// Sign in with Google
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
      role: getRole(user.email)
    }, { merge: true });
    return user;
  } catch (error) {
    console.error("Error during sign-in:", error);
  }
};

// Sign out
const logOut = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Error during sign-out:", error);
  }
};

// Update user profile
const updateUserProfile = async (uid, data) => {
  const userDocRef = doc(db, "users", uid);
  await setDoc(userDocRef, data, { merge: true });
};

// Upload avatar to Firebase Storage
const uploadAvatar = async (file, userId) => {
  const storageRef = ref(storage, `avatars/${userId}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

// Function to simulate authentication for testing purposes
const getMockUser = () => {
  return new Promise((resolve) => {
    resolve(mockUser);
  });
};

export { auth, db, signInWithGoogle, logOut, updateUserProfile, uploadAvatar, mockUser, getMockUser };

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { auth, storage, db } from "../firebaseConfig.js";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  padding: 20px;
  font-family: "Quicksand", sans-serif;
  max-width: 1200px;
  margin: 0 auto;
`;

const SidePanel = styled.div`
  width: 200px;
  margin-right: 20px;
`;

const SideButton = styled.button`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #d3d3d3;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: left;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const MainContent = styled.div`
  flex: 1;
  display: flex;
`;

const ProfileSection = styled.div`
  flex: 2;
  background-color: #ffd900;
  padding: 20px;
  border-radius: 10px;
  margin-right: 20px;
`;

const PerformanceSection = styled.div`
  flex: 1;
  background-color: #ffd900;
  padding: 20px;
  border-radius: 10px;
`;

const AvatarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  background-color: #ffffff;
`;

const Button = styled.button`
  background-color: #000;
  color: #ffd900;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const PerformanceBox = styled.div`
  background-color: #fff;
  height: 50px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const EmailContainer = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin: 8px;
`;

const PhoneNumberContainer = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin: 8px;
`;

const Profile = () => {
  const [user, setUser] = useState(null);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFullName(currentUser.displayName || "");
        // Fetch bio from Firestore if needed
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file && user) {
      try {
        const storageRef = ref(storage, `avatars/${user.uid}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        await updateProfile(user, { photoURL: downloadURL });
        setUser({ ...user, photoURL: downloadURL });
      } catch (error) {
        console.error("Error uploading avatar:", error);
        alert("Failed to upload avatar. Please try again.");
      }
    }
  };

  const handleSave = async () => {
    if (user) {
      try {
        await updateProfile(user, { displayName: fullName });
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { bio: bio });
        setUser({ ...user, displayName: fullName });
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
      alert("Failed to sign out. Please try again.");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <PageContainer>
      <SidePanel>
        <SideButton>
          <Icon src="/path/to/courses-icon.png" alt="Courses" />
          Courses
        </SideButton>
        <SideButton>
          <Icon src="/path/to/settings-icon.png" alt="Settings" />
          Settings
        </SideButton>
        <SideButton
          onClick={() => window.open("https://www.google.com", "_blank")}
        >
          <Icon src="/path/to/support-icon.png" alt="Support" />
          Support
        </SideButton>
      </SidePanel>
      <MainContent>
        <ProfileSection>
          <h2>User Profile</h2>
          <AvatarContainer>
            <Avatar
              src={user.photoURL || "/path/to/default-avatar.png"}
              alt="User Avatar"
            />
          </AvatarContainer>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleAvatarChange}
          />
          <Button onClick={() => fileInputRef.current.click()}>
            Change Avatar
          </Button>
          <Input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
          />
          <Input type="text" value={user.uid} readOnly placeholder="User ID" />
          <TextArea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio..."
          />
          <EmailContainer>Email: {user?.email}</EmailContainer>
          <PhoneNumberContainer>
            Phone Number: {user?.phoneNumber}
          </PhoneNumberContainer>
          <Button onClick={handleSave}>Save Changes</Button>
          <Button onClick={handleLogout}>Log Out</Button>
        </ProfileSection>
        <PerformanceSection>
          <h2>Performance</h2>
          <PerformanceBox />
          <PerformanceBox />
          <PerformanceBox />
          <PerformanceBox />
        </PerformanceSection>
      </MainContent>
    </PageContainer>
  );
};

export default Profile;

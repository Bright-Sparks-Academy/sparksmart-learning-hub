import React, { useState } from 'react';
import styled from 'styled-components';
import { auth, updateProfile, updateUserProfile, logOut } from '../firebaseConfig';

const PageContainer = styled.div`
  margin-top: 80px;
  padding: 2rem;
  font-family: 'Gotham', 'Quicksand', sans-serif;
  background-color: #FFFFFF;
  color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100px;
  height: 100px;
`;

const Heading = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: #000000;
`;

const Subheading = styled.p`
  font-size: 1.5rem;
  color: #FFD900;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #FFD900;
  color: #000000;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 1rem;
  &:hover {
    background-color: #FFC700;
  }
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-top: 1rem;
  font-size: 1rem;
`;

const Profile = ({ user, role }) => {
  const [editingName, setEditingName] = useState(false);
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [name, setName] = useState(user.displayName);
  const [avatar, setAvatar] = useState(user.photoURL);

  const handleUpdateProfile = async () => {
    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: avatar
      });

      // Update Firestore document
      await updateUserProfile(user.uid, {
        displayName: name,
        photoURL: avatar
      });

      setEditingName(false);
      setEditingAvatar(false);
      alert('Profile updated successfully');
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(`Failed to update profile: ${error.message}`);
    }
  };

  const handleLogout = async () => {
    try {
      await logOut();
      window.location.href = '/';
    } catch (error) {
      console.error("Error logging out:", error);
      alert('Failed to log out');
    }
  };

  return (
    <PageContainer>
      <Avatar src={avatar} alt="Avatar" />
      <Heading>{name}</Heading>
      <Subheading>Your Role: {role}</Subheading>
      {editingName ? (
        <>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter new name"
          />
          <Button onClick={handleUpdateProfile}>Save Name</Button>
        </>
      ) : (
        <Button onClick={() => setEditingName(true)}>Edit Name</Button>
      )}
      {editingAvatar ? (
        <>
          <Input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            placeholder="Enter new avatar URL"
          />
          <Button onClick={handleUpdateProfile}>Save Avatar</Button>
        </>
      ) : (
        <Button onClick={() => setEditingAvatar(true)}>Edit Avatar</Button>
      )}
      <Button onClick={handleLogout}>Log Out</Button>
    </PageContainer>
  );
};

export default Profile;

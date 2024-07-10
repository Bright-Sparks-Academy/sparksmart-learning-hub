import React, { useState } from 'react';
import styled from 'styled-components';
import { updateUserProfile, uploadAvatar, auth } from '../firebaseConfig.js';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  font-family: 'Gotham', 'Quicksand', sans-serif;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 2rem auto;
  font-family: 'Quicksand', sans-serif;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-bottom: 1rem;
  font-family: 'Quicksand', sans-serif;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-bottom: 1rem;
  width: 100%;
  font-family: 'Quicksand', sans-serif;
`;

const Button = styled.button`
  background-color: #FFD900;
  border: none;
  padding: 0.75rem 1rem;
  font-weight: bold;
  margin: 0.5rem;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #FFC300;
  }
  font-family: 'Quicksand', sans-serif;
  border-radius: 10px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

const Profile = ({ user, role }) => {
  const [displayName, setDisplayName] = useState(user.displayName);
  const [avatar, setAvatar] = useState(user.photoURL);
  const [error, setError] = useState(null);

  const handleNameChange = async () => {
    try {
      await updateUserProfile(user.uid, { displayName });
      await auth.currentUser.updateProfile({ displayName });
      setError(null);
    } catch (error) {
      setError("Failed to update profile");
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const avatarURL = await uploadAvatar(file, user.uid);
        await updateUserProfile(user.uid, { photoURL: avatarURL });
        await auth.currentUser.updateProfile({ photoURL: avatarURL });
        setAvatar(avatarURL);
        setError(null);
      } catch (error) {
        setError("Failed to update avatar");
      }
    }
  };

  return (
    <ProfileContainer>

      <ProfileImage src={avatar} alt={displayName} />
      <h2>{displayName}</h2>
      <p>Your Role: {role}</p>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Input
        type="text"
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        placeholder="Enter new display name"
      />

      <Button onClick={handleNameChange}>Save Name</Button>
      <Input type="file" accept="image/*" onChange={handleAvatarChange} />
      <Button onClick={() => auth.signOut()}>Log Out</Button>

    </ProfileContainer>
  );
};

export default Profile;

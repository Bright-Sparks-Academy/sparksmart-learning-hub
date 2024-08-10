import React, { useState, useRef, useEffect, useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import userIcon from "../assets/user.png";
import { auth, storage, db } from "../firebaseConfig.js";
import { updateProfile } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.js";
import Modal from '../components/Modal.js';
import { roles, getRole } from '../roles.js';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ffffef;
  width: 99.4vw;
  height: 110vh;
`;

const ProfileTitle = styled.header`
  color: black;
  width: 11.4rem;
  height: 4rem;
  font-size: 2rem;
  font-weight: bold;
  margin-top: 5.5rem;
`;

const ProfilePicture = styled.img`
  width: 3rem;
  height: 3rem;
  margin-top: 0.2rem;
`;

const ProfileName = styled.div`
  display: flex;
  width: 11rem;
  height: 2rem;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 500;
`;

const ProfileInfoContainer = styled.div`
  display: grid;
  height: 32rem;
  width: 95%;
  grid-template: 1fr 1fr / 1.3fr 1fr 1.05fr;
  gap: 10px;
`;

const ProfileItem = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 2rem;
  background-color: #ffd900;
`;

const SectionHeader = styled.header`
  width: 13rem;
  height: 2rem;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 1rem 0 0 1.5rem;
`;

const SectionContent = styled.div`
  height: 100%;
  width: 100%;
`;

const RedButton = styled.button`
  background-color: red;
  height: 3rem;
  width: 8rem;
  font-family: "Quicksand", sans-serif;
  color: white;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  cursor: pointer;
  margin: 0 0 1rem 12rem;
`;

const CourseOptionsButton = styled.button`
  background-color: lightgray;
  height: 1.8rem;
  width: 14rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin: 0.4rem;
  cursor: pointer;
`;

const LongCourseOptionsButton = styled.button`
  height: 1.8rem;
  width: 19rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  margin: 0.4rem;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 23rem;
  width: 100%;
  margin-top: 3rem;
`;

const DoubleButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 4rem;
`;

const AccountSectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 1rem;
  padding: 0.8rem;
  margin: 0 1rem 0 1.7rem;
  font-weight: 500;
`;

const ChangeInfoButton = styled.button`
  background-color: lightgray;
  height: 1.5rem;
  width: 11rem;
  font-family: "Quicksand", sans-serif;
  font-size: 95%;
  font-weight: 500;
  border-width: 0;
  border-radius: 1rem;
  cursor: pointer;
`;

const SelectClassDropdown = styled.select`
  width: 9rem;
  height: 2.5rem;
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  border-radius: 0.3rem;
  margin-left: 3rem;
`;

const CourseSelectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const CheckBox = styled.input`
  width: 1.1rem;
  height: 1.1rem;
  margin-right: 5rem;
  accent-color: black;
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 11rem;
  height: 0.9rem;
  margin-top: 0.3rem;
`;

const SliderRangeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 0.8rem;
`;

const SliderStyles = createGlobalStyle`
  .slider {
    -webkit-appearance: none;
    background: #C5A800;
    border-radius: 3rem;
    outline: none;
    opacity: 0.7;
    width: 11rem;
    height: .4rem;
    accent-color: black;
  }

  input[type=range]::-webkit-slider-thumb {
    -webkit-appearance : none;
    background : black;
    height : .4rem;
    width : 1.7rem;
    border-radius: 1rem;
  }
`;

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const fileInputRef = useRef(null); // Reference to file input
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFullName(user.displayName || "");
    }
  }, [user]);

  function removeEmail(array, stringToRemove) {
    return array.filter(item => item !== stringToRemove);
  }

  const deleteAccount = () => {
    const role = getRole(user.email);
    if (role === "member") roles.members = removeEmail(roles.members, user.email);
    if (role === "admin") roles.admins = removeEmail(roles.admins, user.email);
    if (role === "teacher") roles.teachers = removeEmail(roles.teachers, user.email);
    else if (roles.students.includes(user.email)) {
      roles.students = removeEmail(roles.students, user.email);
    }
    handleLogout();
  };

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
        await updateDoc(userRef, { bio });
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
    <ProfileContainer>
      <SliderStyles />
      <ProfileTitle>User Profile</ProfileTitle>
      <ProfilePicture src={user.photoURL || userIcon} alt="Profile" />
      <ProfileName>{fullName}</ProfileName>

      {/* Avatar Upload */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleAvatarChange}
      />
      <ChangeInfoButton onClick={() => fileInputRef.current.click()}>
        Change Avatar
      </ChangeInfoButton>

      {/* Save Changes Button */}
      <RedButton onClick={handleSave}>
        Save Changes
      </RedButton>

      <ProfileInfoContainer>
        {/* Account Management */}
        <ProfileItem>
          <SectionHeader>Account management</SectionHeader>
          <SectionContent>
            <AccountSectionContainer style={{ padding: "0.6rem" }}>
              User ID: {user.uid}
            </AccountSectionContainer>

            <AccountSectionContainer style={{ padding: "0.6rem" }}>
              <div>Email: </div>
              <ChangeInfoButton>Change Email</ChangeInfoButton>
            </AccountSectionContainer>

            <AccountSectionContainer style={{ padding: "0.6rem" }}>
              <div>Username: </div>
              <Modal field="Username" textField={<input type="text" name="name" required />} />
            </AccountSectionContainer>

            <AccountSectionContainer style={{ padding: "0.6rem" }}>
              <div>Password: </div>
              <Modal field="Password" textField={<input type="password" name="password" required />} />
            </AccountSectionContainer>
          </SectionContent>
          <RedButton onClick={deleteAccount}>Delete Account</RedButton>
        </ProfileItem>

        {/* Course Options */}
        <ProfileItem style={{ gridRow: "span 2" }}>
          <SectionHeader>Course Options</SectionHeader>
          <SectionContent>
            <CourseSelectionContainer>
              <AccountSectionContainer style={{ marginLeft: ".7rem" }}>
                Choose Course
              </AccountSectionContainer>
              <SelectClassDropdown>
                <option value="">Select Class</option>
              </SelectClassDropdown>
            </CourseSelectionContainer>
            <ButtonsContainer>
              <CourseOptionsButton>Request a Change/Addition</CourseOptionsButton>
              <CourseOptionsButton
                style={{
                  backgroundColor: "red",
                  color: "white",
                  width: "11rem",
                }}
              >
                Request to Remove
              </CourseOptionsButton>
              <AccountSectionContainer style={{ marginLeft: "4rem", width: "100%" }}>
                Instructor:{" "}
              </AccountSectionContainer>
              <DoubleButtonContainer>
                <CourseOptionsButton style={{ width: "11rem" }}>
                  Change Instructor
                </CourseOptionsButton>
                <CourseOptionsButton
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    width: "11rem",
                  }}
                >
                  Report a Problem
                </CourseOptionsButton>
              </DoubleButtonContainer>
              <LongCourseOptionsButton style={{ backgroundColor: "#FFFFB0" }}>
                Contact Administrator
              </LongCourseOptionsButton>
              <LongCourseOptionsButton style={{ backgroundColor: "lightgray" }}>
                View Current Course Transcript
              </LongCourseOptionsButton>
              <LongCourseOptionsButton style={{ backgroundColor: "lightgray" }}>
                View Rules and Agreements
              </LongCourseOptionsButton>
              <LongCourseOptionsButton style={{ backgroundColor: "black", color: "white" }}>
                View Post History
              </LongCourseOptionsButton>
            </ButtonsContainer>
          </SectionContent>
        </ProfileItem>

        {/* Preferences */}
        <ProfileItem style={{ gridRow: "span 2" }}>
          <SectionHeader>Preferences</SectionHeader>
          <SectionContent>
            <AccountSectionContainer>
              <div>Language: </div>
              <ChangeInfoButton>Change Language</ChangeInfoButton>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Allow Notifications: </div>
              <CheckBox type="checkbox" />
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Dark Mode: </div>
              <CheckBox type="checkbox" />
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Allow 2FA: </div>
              <CheckBox type="checkbox" />
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Allow Contact Via SMS: </div>
              <CheckBox type="checkbox" />
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Brightness: </div>
              <SliderContainer>
                <input className="slider" type="range" min="0" max="100" />
                <SliderRangeContainer>
                  <span>0</span>
                  <span>100</span>
                </SliderRangeContainer>
              </SliderContainer>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Text Size: </div>
              <SliderContainer>
                <input className="slider" type="range" min="0" max="100" />
                <SliderRangeContainer>
                  <span>0</span>
                  <span>100</span>
                </SliderRangeContainer>
              </SliderContainer>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Mic Volume: </div>
              <SliderContainer>
                <input className="slider" type="range" min="0" max="100" />
                <SliderRangeContainer>
                  <span>0</span>
                  <span>100</span>
                </SliderRangeContainer>
              </SliderContainer>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Speaker Volume: </div>
              <SliderContainer>
                <input className="slider" type="range" min="0" max="100" />
                <SliderRangeContainer>
                  <span>0</span>
                  <span>100</span>
                </SliderRangeContainer>
              </SliderContainer>
            </AccountSectionContainer>
          </SectionContent>
          <RedButton
            style={{ width: "10rem", height: "2.5rem", marginLeft: "8.5rem" }}
            onClick={() => {
              setFullName('');
              setBio('');
              // Reset other preferences if needed
            }}
          >
            Restore Defaults
          </RedButton>
        </ProfileItem>

        {/* User Information */}
        <ProfileItem>
          <SectionHeader>User Information</SectionHeader>
          <SectionContent>
            <AccountSectionContainer>
              <div>Date Joined: </div>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Full Name: </div>
              <ChangeInfoButton onClick={() => setFullName('')}>Change Name</ChangeInfoButton>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Preferred Pronouns: </div>
              <ChangeInfoButton>Change Pronouns</ChangeInfoButton>
            </AccountSectionContainer>

            <AccountSectionContainer>
              <div>Phone Number: </div>
              <ChangeInfoButton>Edit Number</ChangeInfoButton>
            </AccountSectionContainer>
          </SectionContent>
        </ProfileItem>
      </ProfileInfoContainer>
    </ProfileContainer>
  );
};

export default Profile;

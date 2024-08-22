import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f4f4f4;
  color: #333;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

const Header = styled.header`
  font-size: 36px;
  font-weight: bold;
  color: #222;
  margin-bottom: 40px;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  background-color: #C4C4C4;
  border-radius: 50%;
  margin-right: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

const UserName = styled.div`
  font-size: 28px;
  font-weight: 600;
  color: #333;
`;

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 30px;
`;

const Section = styled.div`
  width: 30%;
  background-color: #FFD900;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  p {
    margin: 10px 0;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  button {
    margin: 10px 0;
    padding: 14px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #333;
      color: white;
    }
  }
`;

const ChangeButton = styled.button`
  background-color: #CCCCCC;
  color: #333;

  &:hover {
    background-color: #b3b3b3;
  }
`;

const DangerButton = styled.button`
  background-color: #FF4D4D;
  color: white;

  &:hover {
    background-color: #e60000;
  }
`;

const PreferencesSection = styled(Section)`
  h3 {
    margin-bottom: 15px;
  }

  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    span {
      margin-right: 10px;
    }
  }

  input[type="range"] {
    width: 100%;
  }
`;

const UserProfile = () => {
  return (
    <Container>
      <Header>User Profile</Header>
      <UserContainer>
        <ProfilePicture />
        <UserName>Admin Name</UserName>
      </UserContainer>
      <SectionContainer>
        <Section>
          <h3>Account Management</h3>
          <p>User ID: {`{UserID}`}</p>
          <p>Email: example@site.com</p>
          <p>Username: Username123</p>
          <p>Password: Password123</p>
          <ButtonGroup>
            <ChangeButton>Change Email</ChangeButton>
            <ChangeButton>Change Username</ChangeButton>
            <ChangeButton>Change Password</ChangeButton>
            <DangerButton>Delete Account</DangerButton>
          </ButtonGroup>
        </Section>
        <Section>
          <h3>Course Options</h3>
          <p>Managed Class: Java</p>
          <p>Instructors: 3</p>
          <p>Students: 6</p>
          <ButtonGroup>
            <ChangeButton>Request Change in Class</ChangeButton>
            <ChangeButton>View Instructor Roster</ChangeButton>
            <DangerButton>View Status on Reported Users</DangerButton>
            <ChangeButton>View Connections Status</ChangeButton>
            <ChangeButton>View Connection History</ChangeButton>
            <DangerButton>View Connection Report Status</DangerButton>
            <DangerButton>View Rules and Agreements</DangerButton>
            <DangerButton>View Post History</DangerButton>
          </ButtonGroup>
        </Section>
        <PreferencesSection>
          <h3>Preferences</h3>
          <label>
            <span>Language: English</span>
            <ChangeButton>Change Language</ChangeButton>
          </label>
          <label>
            <span>Allow Notifications:</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label>
            <span>Dark Mode:</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label>
            <span>Allow 2FA:</span>
            <input type="checkbox" defaultChecked />
          </label>
          <label>
            <span>Allow Contact via SMS:</span>
            <input type="checkbox" />
          </label>
          <label>
            <span>Brightness:</span>
            <input type="range" min="0" max="100" />
          </label>
          <label>
            <span>Text Size:</span>
            <input type="range" min="0" max="100" />
          </label>
          <label>
            <span>Mic Volume:</span>
            <input type="range" min="0" max="100" />
          </label>
          <label>
            <span>Speaker Volume:</span>
            <input type="range" min="0" max="100" />
          </label>
          <DangerButton>Restore Defaults</DangerButton>
        </PreferencesSection>
      </SectionContainer>
    </Container>
  );
};

export default UserProfile;

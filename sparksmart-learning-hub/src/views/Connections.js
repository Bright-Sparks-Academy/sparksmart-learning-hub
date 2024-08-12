import React, { useState, useEffect, useContext } from "react";
import styled, { createGlobalStyle } from "styled-components";
import userIcon from "../assets/user.png";

const ScrollbarStyles = createGlobalStyle`
  ::-webkit-scrollbar {
    width: 1rem;
  }
  
  ::-webkit-scrollbar-track {
    border-radius: 10px;
  }
  
  ::-webkit-scrollbar-thumb {
    background: lightgray;
    border-radius: 10px;
  }
`;

const ConnectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fffaed;
  width: 99.4vw;
  height: 100vh;
`;

const ConnectionsTitle = styled.header`
  color: black;
  height: 3rem;
  width: 15rem;
  font-size: 2.5rem;
  font-weight: bold;
  padding: 7rem 0 1rem 0;
`;

const SectionContainer = styled.div`
  display: grid;
  width: 90%;
  height: 80%;
  grid-template: 1fr / 1fr 1.8fr;
  gap: 25px;
  margin-bottom: 1rem;
`;

const Section = styled.div`
  border-radius: 1rem;
  background-color: #ffd900;
`;

const SectionHeader = styled.div`
  display: inline-block;
  font-weight: 650;
  font-size: 1.4rem;
  color: black;
  margin: 0.8rem;
`;

const ScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  direction: rtl;
  border-radius: 1rem;
  width: 25rem;
  height: 24rem;
  background-color: white;
`;

const EditConnectionButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background-color: lightgray;
  height: 2.5rem;
  width: 80%;
  margin-left: 2.5rem;
  border-radius: 1.5rem;
  border-width: 0;
  cursor: pointer;
`;

const ConnectionContainer = styled.div`
  display: flex;
  align-items: center;
  height: 6rem;
  width: 23rem;
  border-radius: 1rem;
  margin-top: 0.5rem;
  background-color: lightgray;
  direction: ltr;
`;

const CurrentConnectionInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const CurrentConnectionInfo = styled.span`
  font-weight: 800;
`;

const UserIcon = styled.img`
  height: 3.6rem;
  width: 3.6rem;
  margin-left: 1rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  height: 2rem;
`;

const ConnectionButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  height: 90%;
  width: 5.5rem;
  margin: 0 0.3rem 0 0.3rem;
  border-radius: 1rem;
  border-width: 0;
  cursor: pointer;
`;

const CreateConnectionContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 99%;
  height: 85%;
`;

const WhiteBackground = styled.div`
  background-color: white;
  margin-left: 1.5rem;
  border-radius: 1rem;
  height: 27rem;
  width: 25rem;
`;

const ManageButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 5.5rem;
`;

const CreateConnectionButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  height: 2.5rem;
  width: 10rem;
  margin: 0 0.3rem 0 0.3rem;
  border-radius: 3rem;
  border-width: 0;
  cursor: pointer;
`;

const Label = styled.span`
  display: block;
  padding-left: 2rem;
  font-weight: 650;
`;

const ProfileSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 33%;
`;

const ConnectionInfo = styled.span`
  display: block;
  font-weight: 650;
`;

const ViewButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  background-color: black;
  color: white;
  height: 1.7rem;
  width: 6rem;
  border-radius: 3rem;
  border-width: 0;
  cursor: pointer;
`;

const LetterGrade = styled.h1`
  margin: 0;
`;

const NumberGrade = styled.h4`
  margin: 0;
`;

const SelectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  margin-left: 1rem;
`;

const CreateButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  margin-top: 2rem;
  gap: 0.5rem;
`;

const CreateButton = styled.button`
  font-family: "Quicksand", sans-serif;
  font-size: 1rem;
  font-weight: 600;
  height: 2.2rem;
  width: 80%;
  border-radius: 3rem;
  border-width: 0;
  cursor: pointer;
`;

const ConnectionsPage = () => {
  return (
    <ConnectionsContainer>
        <ScrollbarStyles />
        <ConnectionsTitle>Connections</ConnectionsTitle>
        <SectionContainer>
            <Section>
              <SectionHeader>Current Connections</SectionHeader>
              <WhiteBackground>
                <ScrollContainer>
                  <ConnectionContainer>
                    <UserIcon src={userIcon} alt='Profile'/>
                    <CurrentConnectionInfoContainer>
                      <CurrentConnectionInfo>Instructor: </CurrentConnectionInfo>
                      <CurrentConnectionInfo>Student: </CurrentConnectionInfo>
                      <CurrentConnectionInfo>Status: {/* Either active, terminated, or pending */}</CurrentConnectionInfo>
                      <ButtonContainer>
                        <ConnectionButton style={{ backgroundColor: 'black', color: 'white'}}>View</ConnectionButton>
                        <ConnectionButton style={{ backgroundColor: 'red', color: 'white' }}>Report</ConnectionButton>
                        <ConnectionButton style={{ backgroundColor: '#ffd900' }}>Terminate</ConnectionButton>
                      </ButtonContainer>
                    </CurrentConnectionInfoContainer>
                  </ConnectionContainer>
                </ScrollContainer>
                <EditConnectionButton>Edit Connection</EditConnectionButton>
              </WhiteBackground>
            </Section>

            <Section>
                <SectionHeader>Create Connection</SectionHeader>
                <CreateConnectionContainer>
                  <WhiteBackground>
                    <ManageButtonContainer>
                      <CreateConnectionButton style={{ backgroundColor: '#ffd900' }}>Managed Students</CreateConnectionButton>
                      <CreateConnectionButton style={{ backgroundColor: 'black', color: 'white' }}>Managed Teachers</CreateConnectionButton>
                    </ManageButtonContainer>
                    <Label>Mangaged Students:</Label>
                    <ScrollContainer style={{height: '20rem' }}>
                      <ConnectionContainer>
                        <ProfileSectionContainer>
                          <UserIcon src={userIcon} style={{ marginLeft: '0' }} alt='Profile'/>
                          <ConnectionInfo>Student A</ConnectionInfo>
                        </ProfileSectionContainer>
                        <ProfileSectionContainer style={{ alignItems: 'flex-start' }}>
                          <ConnectionInfo>Class:</ConnectionInfo>
                          <ConnectionInfo>Assignments:</ConnectionInfo>
                          <ConnectionInfo>Joined:</ConnectionInfo>
                          <ViewButton>View</ViewButton>
                        </ProfileSectionContainer>
                        <ProfileSectionContainer>
                          <LetterGrade>A</LetterGrade>
                          <NumberGrade>99.28%</NumberGrade>
                        </ProfileSectionContainer>
                      </ConnectionContainer>
                    </ScrollContainer>
                  </WhiteBackground>

                  <SelectionContainer>
                    <div>
                      <ConnectionInfo>Selected Instructor:</ConnectionInfo>
                      <ConnectionContainer>
                        <ProfileSectionContainer>
                          <UserIcon src={userIcon} style={{ marginLeft: '0' }} alt='Profile'/>
                          <ConnectionInfo>Instructor A</ConnectionInfo>
                        </ProfileSectionContainer>
                        <ProfileSectionContainer style={{ alignItems: 'flex-start' }}>
                          <ConnectionInfo>Class:</ConnectionInfo>
                          <ConnectionInfo>Recordings:</ConnectionInfo>
                          <ConnectionInfo>Students:</ConnectionInfo>
                          <ViewButton>View</ViewButton>
                        </ProfileSectionContainer>
                        <ProfileSectionContainer>
                          <ConnectionInfo>Class Avg</ConnectionInfo>
                          <LetterGrade>B</LetterGrade>
                          <NumberGrade>99.28%</NumberGrade>
                        </ProfileSectionContainer>
                      </ConnectionContainer>
                    </div>

                    <div>
                      <ConnectionInfo>Selected Student:</ConnectionInfo>
                      <ConnectionContainer>
                        <ProfileSectionContainer>
                          <UserIcon src={userIcon} style={{ marginLeft: '0' }} alt='Profile'/>
                          <ConnectionInfo>Student B</ConnectionInfo>
                        </ProfileSectionContainer>
                        <ProfileSectionContainer style={{ alignItems: 'flex-start' }}>
                          <ConnectionInfo>Class:</ConnectionInfo>
                          <ConnectionInfo>Assignments: {/* Number of assignments */}</ConnectionInfo>
                          <ConnectionInfo>Joined:</ConnectionInfo>
                          <ViewButton>View</ViewButton>
                        </ProfileSectionContainer>
                        <ProfileSectionContainer>
                          <LetterGrade>C+</LetterGrade>
                          <NumberGrade>79.28%</NumberGrade>
                        </ProfileSectionContainer>
                      </ConnectionContainer>
                    </div>

                    <CreateButtonContainer>
                      <CreateButton style={{ backgroundColor: 'lightgray' }}>Connection Options</CreateButton>
                      <CreateButton style={{ backgroundColor: 'yellowgreen' }}>Establish Connection</CreateButton>
                      <CreateButton style={{ backgroundColor: 'red', color: 'white' }}>Clear Selection</CreateButton>
                    </CreateButtonContainer>
                  </SelectionContainer>
                </CreateConnectionContainer>
            </Section>
        </SectionContainer>
    </ConnectionsContainer>
  );
};

export default ConnectionsPage;

import React from 'react'
import styled from 'styled-components';
import logo from '../assets/lightbulb.png';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #FFD700;
`;

const Card = styled.div`
  background-color: #f5f5dc;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Logo = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 1rem;
`;

const Heading = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.2rem;
  font-family: 'Quicksand', sans-serif;
`;

const InputFieldDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
//   margin-bottom: 20px;
    margin-top: 2rem;
  gap: 30px; /* Adjust the gap as needed */

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const Username = styled.input`
    font-family: 'Quicksand', sans-serif;
    border-radius: 5px;
    border: none;
    font-size: 0.85rem;
    padding: 9px 16px;

    &:hover, &:focus {
      border: 2px solid black;
  }
`;

const Password = styled.input`
    font-family: 'Quicksand', sans-serif;
    border-radius: 5px;
    border: none;
    font-size: 0.85rem;
    padding: 9px 16px;

    &:hover, &:focus {
      border: 2px solid black;
  }
`;

const Button = styled.button`
  font-family: 'Quicksand', sans-serif;
  background-color: #d3d3d3;
  color: #000000;
  border: none;
  border-radius: 30px;
  padding: 0.85rem 1.7rem;
  font-size: 0.85rem;
  font-weight: bold;
  margin-top: 2rem;
  width: 200px;
  cursor: pointer;
  &:hover {
    background-color: #c0c0c0;
  }
`;

const SignUpLink = styled.p`
    cursor: pointer;
    font-size: 0.8rem;
    color: blue;
    font-weight: bold;
`

const ErrorMessage = styled.p`
  color: red;
  margin-top: 1rem;
`;

// const RoleButton = styled(Button)`
//   background-color: #FFD900;
//   margin: 0.5rem;
// `;

const StudentLogin = () => {

    const handleSignupRedirect = () => {
        window.location.href = 'https://tally.so/r/mO4r8A';
    };

  return (
    <PageContainer>
        <Card>
            <Logo src={logo} alt="Lightbulb Logo" />
            <Heading>Student Login</Heading>
            <InputFieldDiv>
                <Username
                    placeholder='Enter your username'
                />
                <Password
                    placeholder="Enter your password"
                />
            </InputFieldDiv>
            <Button>Login</Button>
            <SignUpLink onClick={handleSignupRedirect}>Sign up</SignUpLink>
        </Card>
    </PageContainer>
  )
}

export default StudentLogin

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import lightbulbIcon from '../assets/lightbulb.png';

const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #000000;
  color: #FFD900;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #FFD900;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #FFFFFF;
  }
`;

const LoginButton = styled(Link)`
  color: #FFD900;
  text-decoration: none;
  margin-right: 2rem;
  font-weight: bold;
  &:hover {
    color: #FFFFFF;
  }
`;

const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

const NavBar = ({ user }) => (
  <NavBarContainer>
    <NavLinks>
      <NavLink to="/">
        <img src={lightbulbIcon} alt="Home" style={{ width: '30px', height: '30px' }} />
      </NavLink>
    </NavLinks>
    {user ? (
      <ProfileLink to="/profile">
        <ProfileImage src={user.photoURL} alt={user.displayName} />
      </ProfileLink>
    ) : (
      <LoginButton to="/login">Login</LoginButton>
    )}
  </NavBarContainer>
);

export default NavBar;

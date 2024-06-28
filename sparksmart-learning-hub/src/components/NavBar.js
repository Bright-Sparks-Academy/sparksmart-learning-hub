import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #000000;
  color: #FFD900;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #FFD900;
  text-decoration: none;
  font-weight: bold;
  margin-right: 2rem;
  &:hover {
    color: #FFFFFF;
  }
`;

const LoginButton = styled(Link)`
  color: #FFD900;
  margin-right: 5rem;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    color: #FFFFFF;
  }
`;

const ProfileImg = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5rem;
`;

const NavBar = ({ user }) => (
  <NavBarContainer>
    <NavLinks>
      <NavLink to="/">Home</NavLink>
    </NavLinks>
    {user ? (
      <NavLink to="/profile">
        <ProfileImg src={user.photoURL} alt={user.displayName} />
      </NavLink>
    ) : (
      <LoginButton to="/login">Login</LoginButton>
    )}
  </NavBarContainer>
);

export default NavBar;

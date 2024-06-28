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
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const NavLink = styled(Link)`
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
  font-weight: bold;
  &:hover {
    color: #FFFFFF;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin-right: 10px;
`;

const NavBar = ({ user, role }) => (
  <NavBarContainer>
    <NavLinks>
      <NavLink to="/">Home</NavLink>
      {user && role !== 'member' && <NavLink to={`/${role}/dashboard`}>Dashboard</NavLink>}
      {user && <NavLink to="/profile">Profile</NavLink>}
    </NavLinks>
    {user ? (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Avatar src={user.photoURL} alt="Avatar" />
        <NavLink to="/profile">{user.displayName}</NavLink>
        <LoginButton to="/logout">Logout</LoginButton>
      </div>
    ) : (
      <LoginButton to="/login">Login</LoginButton>
    )}
  </NavBarContainer>
);

export default NavBar;

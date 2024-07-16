import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import lightbulbIcon from '../assets/lightbulb.png';
import GlobalStyle from '../GlobalStyles.js'; // Import GlobalStyle

/**
 * NavBarContainer is the main container for the navigation bar.
 * It sets the position, width, background color, text color, display style, alignment, padding, box shadow, and z-index.
 * Created by Tom Wang.
 */
const NavBarContainer = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  color: #FFD900;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

/**
 * NavLinks is a styled-component for the container of the navigation links.
 * It sets the display style and gap between the links.
 * Created by Tom Wang.
 */
const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

/**
 * NavLink is a styled-component for individual navigation links.
 * It sets the display style, alignment, color, text decoration, and font weight.
 * It also changes the color on hover and conditionally applies bold font weight if the link is active.
 * @param {boolean} isActive - Indicates if the link is the current active page.
 * Created by Tom Wang.
 */
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #000;
  text-decoration: none;
  font-weight: ${props => props.isActive ? 'bold' : 'normal'};
  &:hover {
    font-weight: bold;
  }
`;

/**
 * LoginButton is a styled-component for the login button.
 * It sets the color, text decoration, margin, and font weight.
 * It also changes the color on hover.
 * Created by Tom Wang.
 */
const LoginButton = styled(Link)`
  color: #FFD900;
  text-decoration: none;
  margin-right: 2rem;
  font-weight: bold;
  &:hover {
    color: #FFFFFF;
  }
`;

/**
 * ProfileLink is a styled-component for the profile link.
 * It sets the display style, alignment, and margin.
 * Created by Tom Wang.
 */
const ProfileLink = styled(Link)`
  display: flex;
  align-items: center;
  margin-right: 2rem;
`;

/**
 * ProfileImage is a styled-component for the profile image.
 * It sets the size and border radius of the image.
 * Created by Tom Wang.
 */
const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;

/**
 * NavBar component renders the navigation bar.
 * It includes navigation links, login button, and profile image based on the user's authentication status.
 * The current active page link is highlighted with a bold font.
 * @param {Object} user - The current authenticated user.
 * Created by Tom Wang.
 */
const NavBar = ({ user }) => (
  <NavBarContainer>
    <NavLinks>
      <NavLink to="/">
        <img src={lightbulbIcon} alt="Home" style={{ width: '50px', height: '50px' }} />
      </NavLink>
      {user && (
        <>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/messaging">Messaging</NavLink>
          <NavLink to="/homework">Homework</NavLink>
          <NavLink to="/diagnostic-test">Diagnostic Test</NavLink> {/* Add Diagnostic Test link */}
          <NavLink to="/ai-learning-plans">AI Learning Plans</NavLink> {/* Add AI Learning Plans link */}
          <NavLink to="/recordings-page">Recordings</NavLink> {/* Add AI Learning Plans link */}
        </>
      )}
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

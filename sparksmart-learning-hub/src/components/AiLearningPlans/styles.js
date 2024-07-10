import styled from 'styled-components';

/**
 * Styled component for the page container.
 * Sets up the basic layout and styling for the AI Learning Plans page.
 */
export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f9f9f9;
`;

/**
 * Styled component for the header of the page.
 * Defines the styling for the header text.
 */
export const Header = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
  color: #FFD900;
`;

/**
 * Styled component for the content wrapper.
 * Provides styling for the content area where the questionnaire or learning plan will be displayed.
 */
export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

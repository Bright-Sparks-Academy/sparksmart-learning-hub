import { createGlobalStyle } from 'styled-components';

/**
 * GlobalStyle component to define global styles for the application.
 * It includes basic styles for the body and scrollbar customization.
 * Created by Danny Chan.
 * Comments added by Tom Wang.
 */
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Quicksand', sans-serif; // Use Quicksand font for the entire application
    background-color: #FFFFFF; // Set the background color to white
    color: #000000; // Set the text color to black
  }

  ::-webkit-scrollbar {
    width: 8px; // Set the width of the scrollbar
  }

  ::-webkit-scrollbar-track {
    background: #000000; // Set the background color of the scrollbar track to black
  }

  ::-webkit-scrollbar-thumb {
    background: #FFD900; // Set the color of the scrollbar thumb to yellow
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #FFD900; // Keep the color of the scrollbar thumb yellow on hover
  }
`;

export default GlobalStyle;

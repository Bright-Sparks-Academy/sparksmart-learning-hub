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
    width: 8px; /* Adjust the width of the scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1; /* Light gray background for the scrollbar track */
    border-radius: 10px; /* Rounded corners */
  }

  ::-webkit-scrollbar-thumb {
    background: #888; /* Gray color for the scrollbar thumb */
    border-radius: 10px; /* Rounded corners */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker gray when hovering over the scrollbar thumb */
  }
`;

export default GlobalStyle;

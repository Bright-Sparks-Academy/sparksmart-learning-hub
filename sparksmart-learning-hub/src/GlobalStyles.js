import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Gotham', 'Quicksand', sans-serif;
    background-color: #FFFFFF;
    color: #000000;
    overflow-x: hidden;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #000000;
  }

  ::-webkit-scrollbar-thumb {
    background: #FFD900;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #FFD900;
  }
`;

export default GlobalStyle;

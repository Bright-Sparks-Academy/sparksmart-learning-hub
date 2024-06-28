import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Gotham:wght@400;700&family=Quicksand:wght@400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Gotham', 'Quicksand', sans-serif;
    background-color: #FFFFFF;
    color: #000000;
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

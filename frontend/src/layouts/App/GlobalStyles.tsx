import { createGlobalStyle } from 'styled-components';
import Jalnan from '@src/assets/fonts/JalnanOTF.otf';
const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Jalnan";
  src: url(${Jalnan});

}
  * {
    font-family: "Jalnan";
      padding: 0;
      margin: 0;
      box-sizing: border-box;
  }
  body {
    background-color: #fef5e2;
    width: 100%;
    height: 100vh;
  }
`;

export default GlobalStyle;

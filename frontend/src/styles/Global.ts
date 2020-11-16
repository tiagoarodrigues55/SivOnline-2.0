import {createGlobalStyle} from 'styled-components'
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  div{
    border-radius: 10px
  }
//   *:not(body){
//     margin-left: 5px;
//   }
  html, body, #root {
    max-width: 1600px;
    margin: 0 auto;
    height: 100%;
    background-image: url('/assets/background.jpg');
    padding:5px;
  }
  div.components{
    margin:0;
  }


 
  *, button, input {
    border: 0;
    outline: 0;
    font-family:  Verdana, Geneva, Tahoma, sans-serif;
  }
 
  :root {
    --primary: ${props => props.theme.primary};
    --secondary: ${props => props.theme.secondary};
    --tertiary: ${props => props.theme.tertiary};
    --quaternary: ${props => props.theme.quaternary};
    --quinary: ${props => props.theme.quinary};
    --senary: ${props => props.theme.senary};
 
    
    --white: #fff;
    --gray: #8a8c90;
    --chat-input: rgb(64,68,75);
    --symbol: #74777a;
    --notification: #f84a4b;
    --discord: #6e86d6;
    --mention-detail: #f9a839;
    --mention-message: #413f3f;
    --link: #5d80d6;
    --rocketseat: #6633cc;
  }

`;

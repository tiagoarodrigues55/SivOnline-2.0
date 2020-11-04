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
    background-color: #6600FF;
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
    --primary: #BEC5C7;
    --secondary:  rgba(190, 197, 199, 0.73);
    --tertiary: #F4AD5E;
    --quaternary: #96989D;
    --quinary: #C4C4C4;
    --senary: rgba(129, 129, 137, 0.6);
    
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
  /* :root {
    --primary: #fff;
    --secondary: #fff;
    --tertiary: #fff
    --quaternary: #fff;
    --quinary: #fff;
    --senary: #fff;
    
    --white: #fff;
    --gray: #fff;
    --chat-input: #fff
    --symbol: #fff;
    --notification: #fff;
    --discord: #fff;
    --mention-detail: #fff;
    --mention-message: #fff;
    --link: #fff;
    --rocketseat: #fff;
  } */
`;

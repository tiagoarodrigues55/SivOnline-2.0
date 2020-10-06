import {createGlobalStyle} from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  *:not(body){
    margin-left: 5px;
  }
  html, body, #root {
    height: 100%;
    margin-bottom: 5px;
    background-color: #F0FFFF;
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
    --primary: #36393f;
    --secondary: #6495ED;
    --tertiary: #5F9EA0;
    --quaternary: #292b2f;
    --quinary: #393d42;
    --senary: #828386;
    
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
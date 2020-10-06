import styled from 'styled-components'


export default styled.div`
grid-area: CH;
display: flex;
align-items: center;
/* background-color: var(--primary); */

  li{
    list-style: none;
  }
div#chat{
  margin:0;
  height: 100%;
  width: 100%;
  h2{
    text-align: center;
  width:100%;
  margin:0;
border:solid 1px black;
  }
}
section{
  /* background-color: var(--secondary); */
  margin:0;
  border: solid 1px black;
  height: 98%;
  border-radius: 2px;
  width: 100%;
}
form{
  margin:0;
  height: 100%;
}

div#messages{
  height: 77%;
  overflow-y: scroll;
  ::-webkit-scrollbar { /* Sem Barra de rolagem */
    display: none;
  }
}
input{
  /* background-color: var(--tertiary); */

  align-self:baseline;
  width:97%;
  padding:5px;
  border-radius:2px;
  border: solid 1px black;
}
div#contats{
  max-height:250px;
  overflow-y: scroll;
  ::-webkit-scrollbar { /* Sem Barra de rolagem */
    display: none;
  }
}
`
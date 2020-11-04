import styled from 'styled-components'


export default styled.div`
height: 90%;
max-height: 335px;
justify-content: flex-end;
align-content: flex-start;
grid-area: CH;
display: flex;
align-items: center;
/* background-color: var(--primary); */

  li{
    list-style: none;
  }

form{
  max-width: 300px;
  margin-left: 10px;
  height: 100%;
  width:100%;
}
div.titulo{
  background-color: var(--quinary);
  margin:0;
  height:40px;
  width:100%;
  border-radius: 8px 8px 0 0px;
  padding:7px;
  text-align: center;
}
div#messages{
  /* background-color: var(--primary); */
  background-color: #D8D9DC;
  border-radius: 0px 0px 8px 8px;
  height: 88%;
 
}
div.input-wrapper {
max-width: 90%;
margin: 0 auto;

  input{
    width:100%;
    height: 34px;
    padding:5px;
    border-radius:10px;
  }
}
div#contats{
  height:100%;
  overflow-y: auto;
  ::-webkit-scrollbar { /* Sem Barra de rolagem */
    display: auto;
  }
  background-color: var(--secondary);
  padding:8px;
  border-radius: 8px;

}
`
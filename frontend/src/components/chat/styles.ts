import styled from 'styled-components'


export default styled.div`
grid-area: CH;
display: flex;
align-items: center;
/* background-color: var(--primary); */

  li{
    list-style: none;
  }

form{
  margin:0;
  height: 100%;
  width:100%;
}
div.titulo{
  background-color: var(--quinary);
  margin:0;
  height:40px;
  width:100%;
  border-radius: 0px 8px 0px 0px;
  padding:7px;
  text-align: center;
}
div#messages{
  background-color: var(--primary);
  border-radius: 0px 0px 8px 0px;
  height: 89%;
 
}
input{
 
  width:400px;
  padding:5px;
  border-radius:10px;
}
div#contats{
  height:100%;
  overflow-y: auto;
  ::-webkit-scrollbar { /* Sem Barra de rolagem */
    display: auto;
  }
  background-color: var(--secondary);
  padding:8px;
  border-radius: 8px 0px 0px 8px;

}
`
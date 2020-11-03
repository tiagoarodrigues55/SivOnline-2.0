import styled from 'styled-components'

//Colocar limite de espaço junto a uma barra de rolagem
export default styled.div`
grid-area: SL;
display: flex;
flex-direction: column;
align-items: center;
padding:3px;
li{
  list-style: none;
  margin-top: 7px;
}

#unvisible{
  display:none;
}
button{
  color:black;
  margin-top:3px;
  width:50%;
  height:13%; 
  align-self: center;
  background-color: var(--tertiary);
  border-radius:5px;
  margin-bottom:2px;
}

div.box{
}

ul{
  width:97%;
  background-color: var(--quinary);
  height:250px;
  border-radius: 0px 0px 8px 8px;

  display: flex;
flex-direction: column;
  max-height:90%;
  overflow-y: scroll;
    ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    /* background-color: ; */
    border-radius: 4px;
  }
}
div.titulo{
  margin:0;
  background-color: var(--quaternary);
  height:40px;
  width:97%;
  border-radius: 8px 8px 0px 0px;
  padding:7px;
  text-align: center;
}

`
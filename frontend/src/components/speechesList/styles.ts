import styled from 'styled-components'

//Colocar limite de espaço junto a uma barra de rolagem
export default styled.div`
grid-area: SL;
display: flex;
flex-direction: column;

/* border: solid 1px gray; */
/* background-color:var(--secondary); */

align-items: center;
li{
  list-style: none;
  margin-top: 7px;
}

#unvisible{
  display:none;
}
button{
  width:50%;
  height:15%; 
  align-self: flex-start;
  background-color: var(--secondary);
  border-radius:5px;
  margin-bottom:2px;
}

/* div.separator{
  margin:1px 0px;
  height:1px;
  width:100%;
  background-color: var(--secondary);
} */
div.box{
  border:solid 1px gray;
}
div#speechesList{
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

`
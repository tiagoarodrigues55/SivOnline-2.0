import styled from 'styled-components'


export default styled.div`
grid-area: CC;
display: flex;
flex-direction: column;

/* background-color: var(--primary); */
margin-top: 20px;
  li{
    list-style: none;
    p{
    display: inline-block;
    }
  }




  overflow-y: scroll;
  ::-webkit-scrollbar { /* Sem Barra de rolagem */
    display: none;
  }



.author{
  color: red;
}
.destiny{
  color: green;
}
.content{
  color: grey;
}
`
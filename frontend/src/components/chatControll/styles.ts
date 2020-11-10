import styled from 'styled-components'


export default styled.div`
grid-area: CC;
display: flex;
flex-direction: column;
padding: 20px;
background-color: var(--primary);
margin-top: 20px;
  li{
    list-style: none;
    p{
    display: inline-block;
    }
  }




  overflow-y: auto;
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
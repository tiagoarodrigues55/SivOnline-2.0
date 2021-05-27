import styled from  'styled-components'

export const Div = styled.div`

#open{
  background: var(--quaternary);
  width:600px;
  height:300px;
  border-radius: 1em;
  padding: 5em;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  button{
  margin-top:4px;
  width:25%;
  height:18%; 
  align-self: flex-start;
  border-radius:10px;
  margin:5px;
}
ul{
  overflow-y: auto;
  ::-webkit-scrollbar { /* Sem Barra de rolagem */
    display: auto;
  }
}
}
 
  #none{
    display: none;
  }
 
`
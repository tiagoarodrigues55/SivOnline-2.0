import styled from 'styled-components'


export default styled.div`
grid-area: AD;
display: flex;
  div.docs{
display: flex;
width:100%;
    flex-direction:row;

  overflow-x: scroll;
  ::-webkit-scrollbar { 
    display: none;
  }
  div{
    display: inline-block;
    justify-content: space-between;
    margin-right:50px;
  }
  }
`
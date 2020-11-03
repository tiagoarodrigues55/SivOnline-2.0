import styled from 'styled-components'


export default styled.div`
  grid-area: AD;
  display: flex;
  h3{
    padding:10px;
  }
  div.docs{
    display: flex;
    width:99vw;
    flex-direction:row;

    overflow-x: auto;
    ::-webkit-scrollbar { 
      display: none;
    }
  div.doc{
    white-space: nowrap;
    margin-right:100px;
    padding:10px;
  }
  }
`

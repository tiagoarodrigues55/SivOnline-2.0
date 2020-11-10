import styled from 'styled-components'


export default styled.div`
grid-area: VD;
display: flex;
flex-direction: column;
align-items: center;
/* background-color:var(--quaternary); */
img{
  width:90%; 
  height:90%;
}
div{
display:flex;
flex-direction: row;
padding-top:10px;
button{
height:30px;
background:#4444df;
padding:3px;
  /* align-self: flex-start */
}
}
  select{
  padding: 3px;
  background-color: var(--tertiary);
  margin-right: 5px;
  border-radius:5px;
}
button{
  margin-top:4px;
  width:80px;
  height:30px; 
  align-self: flex-start;
  border-radius:10px;
}
}

`
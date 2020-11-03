import styled from 'styled-components'


export default styled.div`
/* background-color: var(--primary); */
grid-area: VT;
display: flex;
align-items: center;
flex-direction: column;
/* border: solid 1px gray; */

div.LastVote{
  display:flex;
flex-direction: column;
background-color: var(--primary);
height:50px;
width:500px;
border-radius: 5px 5px 0px 0px;

}
div.votes{
  width:500px;
  height:100px;
  background-color: var(--secondary);
  border-radius: 0px 0px 5px 5px;

}
div#button{
  margin-top: -20px;
}
button{
  padding: 6px;
}
#disable{
  display: none;
}
h1{
  font-size:20px;
}
#favorable{
  background-color: green;
}
#against{
  background-color: red;
}
div#favorVotes{
  width:48%;
  float: left;
}
div#againstVotes{
  width:48%;
  float: right;
}
h3{
  width:100%;
}

`
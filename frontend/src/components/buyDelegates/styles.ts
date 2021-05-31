import styled from 'styled-components'


export default styled.div`
grid-area: BD;
display: flex;
align-items: top;
margin-top:20px;
div.delegates{
  background-color: var(--secondary);
  overflow-y: auto;
    ::-webkit-scrollbar {
    display:auto;
  }

  ::-webkit-scrollbar-thumb {
    display:auto;

  }
}
/* border: solid 1px gray; */
/* background-color:var(--tertiary); */
select{
  padding: 3px;
  background-color: var(--tertiary);
  margin-right: 3px;
  border-radius:5px;
}
input{
  width:98%;
  padding:10px;
  /* background-color:var(--tertiary); */
  margin-top: 3px;
  border-radius:15px;
}
button{
  margin-top:4px;
  width:25%;
  height:18%; 
  align-self: flex-start;
  border-radius:10px;
}
div{
  width:500px;
  height:130px;
  padding:2px;
  margin:2px;
  border: 1px black solid;
}
ul{
  margin-left:15px;
}
li{
  margin:8px;
}
p{
  text-align: right;
}

`
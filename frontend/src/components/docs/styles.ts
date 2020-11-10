import styled from 'styled-components'


export default styled.div`
grid-area: DC;
display: flex;
flex-direction:row;
li{
  list-style: none;
}
padding:10px;
div.Docs{
  flex-direction:column;
}
div.titlePrivateDocs{
  background-color: var(--senary);
  border-radius: 5px 0px 0px 0px;
  width:250px;
  height:40px;
  padding:7px;
  text-align: center;
}
div.titlePublicDocs{
  background-color: var(--senary);
  border-radius: 0px 5px 0px 0px;
  width:250px;
  height:40px;
  padding:7px;
  text-align: center;
}
div.titlePublicDocsModerator{
  background-color: var(--senary);
  border-radius: 0px 5px 0px 0px;
  width:550px;
  height:40px;
  padding:7px;
  text-align: center;
}
div.privates{
  background-color: var(--secondary);
  border-radius: 0px 0px 0px 5px;
  width:250px;
  min-height:100px;
  padding:7px;
}
div.public{
  background-color: var(--secondary);
  border-radius: 0px 0px 5px 0px;
  width:250px;
  min-height:100px;
  padding:7px;
}
div.publicModerator{
  background-color: var(--secondary);
  border-radius: 0px 0px 5px 0px;
  width:550px;
  min-height:100px;
  padding:7px;
}
div.createDoc{
  padding:10px;
  
}
input{
    border-radius:8px;
    padding:5px;
    margin-bottom:5px;
  }
  button{
    border-radius: 8px;
    padding:10px;
  background-color: var(--tertiary);

  }


`
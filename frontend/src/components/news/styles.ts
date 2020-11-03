import styled from 'styled-components'


export default styled.div`
grid-area: NS;
background-color: var(--quinary) ;
display: flex;
flex-direction: column;
    overflow-y: auto;
    ::-webkit-scrollbar {
    display:auto;
  }

  ::-webkit-scrollbar-thumb {
    display:auto;

  }


h1{
  font-size: 17px;
  margin-top: 6px;
}
h3{
  font-size: 13px;
  margin-top: 3px;
}
div.organize{
  align-self:flex-start;
  /* background-color: var(--quinary); */
  border-radius: 5px;
  margin-top:3px;
  padding:1px;
  h1{
    font-size: 18px;
  margin-top: 6px;
  }
}
align-items: center;

div.separator{
  margin:3px 0px;
  height:1px;
  width:100%;
  background-color: var(--secondary);
}
div.article{
width:100%;
}
div.iconBall{
  width:12px;
  height:12px;
  border-radius:50%;
  background-color:red;
  display:flex;
  flex-direction:row;
  margin-left:10px;
}
div#titleOrganize{
  display:flex;
  align-items:center;
  flex-direction:row;
  h1{
max-width:200px;
margin:0;
flex-direction:row;
  justify-content:space-between;
  }
}


`
import React from 'react';
import {Redirect} from 'react-router-dom'

import Chat from '../../../components/chat'
import ChatControll from '../../../components/chatControll'
import AllDocs from '../../../components/allDocs'
import {Grid} from './Layout'


function Layout() {


  const representation_type = localStorage.getItem('representation_type')
  if(representation_type !== 'Staff'){
    return(
      <Redirect to="Login" />
    )
  }

  return (
    <>

    <Grid>
      <AllDocs/>
      <Chat/>
      <ChatControll/>
    </Grid>
    </>
  );
}

export default Layout;

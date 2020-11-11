import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom'

import Chat from '../../../components/chat'
import ChatControll from '../../../components/chatControll'
import AllDocs from '../../../components/allDocs'
import {Grid} from './Layout'
import api from '../../../services/api'


interface NewVote{
  title: string,
  description: string,
  link?: string
}
function Layout() {
  const token = localStorage.getItem('token')
  const representation = localStorage.getItem('representation')


  if( representation==='null'){
    console.log('sem token ou representação')
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

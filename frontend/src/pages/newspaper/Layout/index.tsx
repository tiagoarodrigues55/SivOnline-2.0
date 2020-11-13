import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom'

import Post from '../../../components/post'
import Chat from '../../../components/chat'
import Docs from '../../../components/docs'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import Video from '../../../components/video'
import Votes from '../../../components/votes'
import {Grid} from './Layout'
import api from '../../../services/api'

function Layout() {
  const token = localStorage.getItem('token')
  const representation = localStorage.getItem('representation')
  // useEffect(()=>{
  //   api.get('getUserInfo', {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}}).then(res=>{
  //   })
  // },[])
  if(representation==='null'){
    console.log('sem token ou representação')
    return(
      <Redirect to="Login" />
    )
  }
  return (
    <Grid>
      <Video newspaper={true}/>
      <SpeechesList newspaper/>
      <News/>
      <Chat/>
      <Post/>
      <Votes/>
      <Docs/>
    </Grid>
  );
}

export default Layout;

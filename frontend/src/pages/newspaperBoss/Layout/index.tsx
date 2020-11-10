import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom'

import Post from '../../../components/post'
import PostsPreview from '../../../components/postsPreview'
import Chat from '../../../components/chat'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import Video from '../../../components/video'
import {Grid} from './Layout'
import api from '../../../services/api'

function Layout() {
  const token = localStorage.getItem('token')
  const representation = localStorage.getItem('representation')
 
  if(representation==='null'){
    console.log('sem token ou representação')
    return(
      <Redirect to="Login" />
    )
  }
  return (
    <Grid>
      <Video newspaperBoss/>
      <SpeechesList/>
      <News/>
      <Chat/>
      <Post/>
      <PostsPreview/>
    </Grid>
  );
}

export default Layout;

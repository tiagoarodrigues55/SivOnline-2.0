import React from 'react';
import {Redirect} from 'react-router-dom'

import Post from '../../../components/post'
import PostsPreview from '../../../components/postsPreview'
import Chat from '../../../components/chat'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import Video from '../../../components/video'
import {Grid} from './Layout'

function Layout() {
  const representation_type = localStorage.getItem('representation_type')
  if(representation_type !== 'Chefe de imprensa'){
    return(
      <Redirect to="Login" />
    )
  }
  return (
    <Grid>
      <Video newspaperBoss/>
      <SpeechesList newspaper/>
      <News/>
      <Chat/>
      <Post/>
      <PostsPreview/>
    </Grid>
  );
}

export default Layout;

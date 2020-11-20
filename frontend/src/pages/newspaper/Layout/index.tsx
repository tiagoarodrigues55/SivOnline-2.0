import React from 'react';
import {Redirect} from 'react-router-dom'

import Post from '../../../components/post'
import Chat from '../../../components/chat'
import Docs from '../../../components/docs'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import Video from '../../../components/video'
import Votes from '../../../components/votes'
import {Grid} from './Layout'

function Layout() {

  const representation_type = localStorage.getItem('representation_type')
  if(representation_type !== 'Imprensa'){
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

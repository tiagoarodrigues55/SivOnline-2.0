import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom'

import Actions from '../../../components/actions'
import Chat from '../../../components/chat'
import Docs from '../../../components/docs'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import Video from '../../../components/video'
import Votes from '../../../components/votes'
import NewVote from '../../../components/votes/NewVote'
import {Grid} from './Layout'
import {Div} from './Styles'
import {useSocket} from '../../../socket'

interface NewVote{
  title: string,
  description: string,
  link?: string
}
function Layout() {
const socket = useSocket()

  const representation = localStorage.getItem('representation')
 
  const [newVote, setNewVote] = useState<NewVote>({title: 'Titulo', description: 'Descrição', link: 'http://localhost:3000/login'})
  const [display, setDisplay] = useState<string>('none')
  const representation_type = localStorage.getItem('representation_type')

  useEffect(()=>{
    socket.on('newVote', (vote: NewVote)=>{
      setNewVote(vote)
      setDisplay('open')

    })
    socket.on('finishVote', ()=>{
      setNewVote({title: '', description: '', link: ''})
      setDisplay('none')

    })
  },[])
 
  if(representation_type !== 'Delegado'){
    return(
      <Redirect to="Login" />
    )
  }

  function sendResponseN(){
    socket.emit('responseN', representation)
    setDisplay('none')
  }
  
  function sendResponseY(){
    socket.emit('responseY', representation)
    setDisplay('none')

  }

  return (
    <>
    <Div>
      <div id={display}>
      <h1>{newVote.title}</h1>
  <h2>{newVote.description}</h2>
  <a href={newVote.link}>Documento</a>
  <button onClick={sendResponseY}>Afavor</button>
  <button onClick={sendResponseN}>Contra</button>
      </div>

    </Div>
    <Grid>
      <Video/>
      <SpeechesList/>
      <News/>
      <Chat/>
      <Actions/>
      <Votes/>
      <Docs/>
    </Grid>
    </>
  );
}

export default Layout;

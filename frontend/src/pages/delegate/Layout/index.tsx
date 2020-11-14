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
import api from '../../../services/api'
import {useSocket} from '../../../socket'
const socket = useSocket()

interface NewVote{
  title: string,
  description: string,
  link?: string
}
function Layout() {
  const token = localStorage.getItem('token')
  const representation = localStorage.getItem('representation')
  const [newVote, setNewVote] = useState<NewVote>({title: 'Titulo', description: 'Descrição', link: 'http://localhost:3000/login'})
  const [display, setDisplay] = useState<string>('none')

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


    socket.on('newVote', (vote: NewVote)=>{
      setNewVote(vote)
      setDisplay('open')

    })
    socket.on('finishVote', ()=>{
      setNewVote({title: '', description: '', link: ''})
      setDisplay('none')

    })

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

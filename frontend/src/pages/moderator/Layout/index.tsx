import React, {useEffect, useState} from 'react';

import Actions from '../../../components/actions'
import Chat from '../../../components/chat'
import Docs from '../../../components/docs'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import Video from '../../../components/video'
import Votes from '../../../components/votes'
// import Teste from '../Testes.js'
import {Grid} from './Layout'
import {Div} from './Styles'
import api from '../../../services/api'
import {Redirect} from 'react-router-dom'
import io from 'socket.io-client'

const socket = io(process.env.SOCKET_URL || 'I hate typescript')

function Layout() {
  const token = localStorage.getItem('token')
  const representation = localStorage.getItem('representation')
  const [favorables, setFavorables] = useState<string[]>([])
  const [againsts, setAgainsts] = useState<string[]>([])
  const [display, setDisplay] = useState<string>('none')
  // useEffect(()=>{
  //   api.get('getUserInfo', {headers: {Authorization : `Bearer ${localStorage.getItem('token')}`}}).then(res=>{
  //     alert(`Bem vindo ${res.data.username}`)
  //   })
  // },[])
  if( representation==='null'){
    console.log('sem token ou representação')
    return(
      <Redirect to="Login" />
    )
  }

  socket.on('favorables', (representations: string[])=>{
    setFavorables(representations)
    setDisplay('open')

  })
  socket.on('againsts', (representations: string[])=>{
    setAgainsts(representations)
    setDisplay('open')

  })

  function finishVoteY(){
    socket.emit('finishVote', {
      favorables,
      againsts,
      decision: 'passa'
    })
    setDisplay('none')

  }
  function finishVoteN(){
    socket.emit('finishVote', {
      favorables,
      againsts,
      decision: 'não passa'
    })
    setDisplay('none')

  }
  return (
    <>
    <Div >
      <div id={display}>
      <h3>Favoráveis</h3>
      <ul>
        {favorables.map(representation=>(
          <li key={representation}>{representation}</li>
        ))}
      </ul>
      <h3>Contrários</h3>
      <ul>
        {againsts.map(representation=>(
          <li key={representation}>{representation}</li>
        ))}
      </ul>
      <button onClick={finishVoteY}>Votação passa</button>
      <button onClick={finishVoteN}>Votação não passa</button>
      </div>
     
    </Div>
    <Grid>
      <Video moderator />
      <SpeechesList moderator />
      <News moderator />
      <Chat moderator />
      <Actions moderator/>
      <Votes moderator />
      <Docs moderator />
    </Grid>
    </>
  );
}

export default Layout;

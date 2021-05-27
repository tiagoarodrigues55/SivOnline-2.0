import React, {useEffect, useState} from 'react';

import Actions from '../../../components/actions'
import Chat from '../../../components/chat'
import Docs from '../../../components/docs'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import Video from '../../../components/video'
import Votes from '../../../components/votes'
import BuyDelegates from '../../../components/buyDelegates'
// import Teste from '../Testes.js'
import {Grid} from './Layout'
import {Div} from './Styles'
import {Redirect} from 'react-router-dom'
import {useSocket} from '../../../socket'

function Layout() {
const socket = useSocket()

  const [favorables, setFavorables] = useState<string[]>([])
  const [againsts, setAgainsts] = useState<string[]>([])
  const [display, setDisplay] = useState<string>('none')
  const representation_type = localStorage.getItem('representation_type')
  useEffect(()=>{
    socket.on('favorables', (representations: string[])=>{
      setFavorables(representations)
      setDisplay('open')
  
    })
    socket.on('againsts', (representations: string[])=>{
      setAgainsts(representations)
      setDisplay('open')
  
    })
  
  },[])
  if(representation_type !== 'Mesa'){
    return(
      <Redirect to="Login" />
    )
  }


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
      <BuyDelegates moderator />
    </Grid>
    </>
  );
}

export default Layout;

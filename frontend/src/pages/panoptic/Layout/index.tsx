import React, {useEffect, useState} from 'react';

import Actions from '../../../components/actions'
import Chat from '../../../components/chat'
import AllDocs from '../../../components/allDocs'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import Video from '../../../components/video'
import {Grid} from './Layout'
import {Div} from './Styles'
import api from '../../../services/api'
import {Redirect} from 'react-router-dom'
import {useSocket} from '../../../socket'


function Layout() {
const socket = useSocket()


  
  const [favorables, setFavorables] = useState<string[]>([])
  const [againsts, setAgainsts] = useState<string[]>([])
  const [display, setDisplay] = useState<string>('none')
  const representation_type = localStorage.getItem('representation_type')
  // if(representation_type !== 'Panóptico'){
  //   return(
  //     <Redirect to="Login" />
  //   )
  // }

  socket.on('favorables', (representations: string[])=>{
    setFavorables(representations)
    setDisplay('open')

  })
  socket.on('againsts', (representations: string[])=>{
    setAgainsts(representations)
    setDisplay('open')

  })

  
  
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
  
      </div>
     
    </Div>
    <Grid>
      <Video moderator />
      <SpeechesList moderator />
      <News moderator />
      <Chat moderator />
      <Actions moderator/>
      <AllDocs limit/>
    </Grid>
    </>
  );
}

export default Layout;

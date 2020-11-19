import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom'

import Actions from '../../../components/actions'
import Chat from '../../../components/chat'
import Docs from '../../../components/docs'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import Video from '../../../components/video'
import Intervention from '../../../components/intervention'
import {Grid} from './Layout'
import {Div} from './Styles'
import {useSocket} from '../../../socket'


const Layout = ()=> {
const socket = useSocket()

 
  const [favorables, setFavorables] = useState<string[]>([])
  const [againsts, setAgainsts] = useState<string[]>([])
  const [display, setDisplay] = useState<string>('none')
  const representation_type = localStorage.getItem('representation_type')
  if(representation_type !== 'Intervenção'){
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
      <Docs/>
      <Intervention/>
    </Grid>
    </>
  );
}

export default Layout;

import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom'

import BuyDelegates from '../../../components/buyDelegates'
import Votes from '../../../components/votes'
import Chat from '../../../components/chat'
import News from '../../../components/news'
import SpeechesList from '../../../components/speechesList'
import {Grid} from './Layout'
import {Div} from './Styles'
import {useSocket} from '../../../socket'


const Layout = ()=> {
  const socket = useSocket()
 
  const [favorables, setFavorables] = useState<string[]>([])
  const [againsts, setAgainsts] = useState<string[]>([])
  const [display, setDisplay] = useState<string>('none')

  const representation_type = localStorage.getItem('representation_type')
  if(representation_type !== 'Investidor'){
    return(
      <Redirect to="Login" />
    )
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
  
      </div>
     
    </Div>
    <Grid>
      <BuyDelegates/>
      <SpeechesList newspaper />
      <News/>
      <Chat moderator />
      <Votes/>
    </Grid>
    </>
  );
}

export default Layout;

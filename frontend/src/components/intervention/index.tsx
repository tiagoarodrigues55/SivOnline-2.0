import React from 'react'
import Styles from './styles'
import {useSocket} from '../../socket'

const Index: React.FC = () => {
  const socket = useSocket()
  function AddUser(){
    socket.emit('AddUser')
  }
  function CyberAtack(){
    socket.emit('intervention')
  }
  function InativeChat(){
    socket.emit('inativeChat')
  }
  function InativeNews(){
    socket.emit('inativeNews')
  }
  return (
    <Styles>
      <button onClick={AddUser}>Adicionar Brasil</button>
      <br/>
      <button onClick={CyberAtack}>Ataque cibernético</button>
      <br/>
      <button onClick={InativeChat}>Inativar chat</button>
      <br/>
      <button onClick={InativeNews}>Inativar as notícias</button>
    </Styles>
  )
}

export default Index

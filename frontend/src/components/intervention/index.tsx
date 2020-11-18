import React, {useState} from 'react'
import Styles from './styles'
import {useSocket} from '../../socket'

const Index: React.FC = () => {
  
  const [chat, setChat] = useState('Inativar chat')
  const [news, setNews] = useState('Inativar notícias')
  const socket = useSocket()
  function AddUser(){
    socket.emit('AddUser')
  }
  function CyberAtack(){
    socket.emit('intervention')
  }
  function InactiveChat(){
    if(chat === 'Inativar chat'){
      socket.emit('inactiveChat')
      setChat('Ativar chat')
      localStorage.setItem('chatButton', 'Ativar chat')
    }else{
      socket.emit('activeChat')
      setChat('Inativar chat')
      localStorage.setItem('chatButton', 'Inativar chat')

    }
  }
  function InactiveNews(){
    if(news === 'Inativar notícias'){
      socket.emit('inactiveNews')
      setNews('Ativar notícias')
      localStorage.setItem('newsButton', 'Ativar notícias')

    }else{
      socket.emit('activeNews')
      setNews('Inativar notícias')
      localStorage.setItem('newsButton', 'Inativar notícias')

    }
  }

  return (
    <Styles>
      <button onClick={AddUser}>Adicionar Brasil</button>
      <br/>
      <button onClick={CyberAtack}>Ataque cibernético</button>
      <br/>
  <button onClick={InactiveChat}>{localStorage.getItem('chatButton') || 'Inativar chat'} </button>
      <br/>
  <button onClick={InactiveNews}>{localStorage.getItem('newsButton') || 'Inativar notícias'}</button>
    </Styles>
  )
}

export default Index

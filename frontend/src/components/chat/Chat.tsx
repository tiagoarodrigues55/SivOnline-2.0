import React, {useState, useEffect, useCallback, useRef} from 'react';
import Ul from './Li'
import {useSocket} from '../../socket'


interface Props{
  contat: string,
  haveMessages: Function
}
interface Messages{
  content: string,
  my: string
}

// interface useRefProps {

// }

interface MessageType{
  author: string,
  destiny: string,
  content: string
}
const user = localStorage.getItem('representation')


const Chat: React.FC<Props> = ({contat, haveMessages}) => {
const socket = useSocket()
const chatScroll = useRef<any>();
  
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Messages[]>([])
  useEffect(()=>{
    socket.on('previousEmits', (msgs: {previousMessages: Messages[]}) =>{
      setMessages(msgs.previousMessages)
      console.log(msgs.previousMessages)
    })
    socket.on('previousMessages', (msgs: Messages[])=>{
      setMessages(msgs)
    })
    socket.on('receivedMessage', (msg:MessageType)=>{
      if(msg.destiny === user && msg.author === contat){
        setMessages([...messages, {content: msg.content, my: 'notMine'}])
      }
      if(msg.destiny === user && msg.author !== contat){
        haveMessages(msg.author)
      }
     
    })
  },[])

  useEffect(()=>{
    
    socket.emit('changeContat', {
      user,
      contat
    })
  
  },[contat])
  
  const sendMessage = useCallback((e) => {
    e.preventDefault();
    if(!message){
      return
    }
       setMessage('')
       setMessages([...messages, {content : message, my: 'mine' }])
    socket.emit('sendMessage', {
      author: user,
      destiny: contat,
      content:message
    })
  }, [message]);
useEffect(()=>{
  chatScroll.current.scrollIntoView( { behavior: 'smooth', block: 'end' });

}, [messages])
 if(!contat){
   contat = 'Brasil'
 }

  return (
        <form onSubmit={sendMessage}>
          <div className="titulo">
          <h2>{contat}</h2>

          </div>
        <div id="messages">
          <Ul>
             {messages ? messages.map(message=>(
                <li className={message.my}><p>{message.content}</p></li>
                  )): <li>Não rolou</li>}
                  <div ref={chatScroll}></div>
          </Ul>
          <div className="input-wrapper">
            <input placeholder="Digite sua mensagem" onChange={e => setMessage(e.target.value)} value={message} type="text"/>
          </div>

          </div>
        </form>
  )
}

export default Chat;
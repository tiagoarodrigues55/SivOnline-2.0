import React, {useState, useEffect, useCallback} from 'react';
import io from 'socket.io-client'
import Ul from './Li'
interface Props{
  contat: string,
  haveMessages: Function
}
interface Messages{
  content: string,
  my: string
}

interface MessageType{
  author: string,
  destiny: string,
  content: string
}
const user = localStorage.getItem('representation')
const socket = io('http://localhost:3001')
const Chat: React.FC<Props> = ({contat, haveMessages}) => {
  
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Messages[]>([])
  socket.on('previousMessages', (msgs: Messages[]) =>{
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
  useEffect(()=>{
    socket.emit('changeContat', {
      user,
      contat
    })
  },[contat])
  
  const sendMessage = useCallback((e) => {
    if(!message){
      return
    }
    e.preventDefault();
       setMessage('')
       setMessages([...messages, {content : message, my: 'mine' }])
    socket.emit('sendMessage', {
      author: user,
      destiny: contat,
      content:message
    })
  }, [message]);

 if(!contat){
   contat = 'Brasil'
 }

  return (
    <div id="chat"> 
      <section>
        <form onSubmit={sendMessage}>
        <h2>{contat}</h2>
        <div id="messages">
          <Ul>
             
             {messages ? messages.map(message=>(
                <li className={message.my}><p>{message.content}</p></li>
                  )): <li>Não rolou</li>}
          </Ul>
          </div>
        <input onChange={e => setMessage(e.target.value)} value={message} type="text"/>
        </form>
      </section>
    </div>
  )
}

export default Chat;
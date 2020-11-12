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
const representation_type = localStorage.getItem('representation_type')
const socket = io(process.env.SOCKET_URL || 'I hate typescript')

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
        <form onSubmit={sendMessage}>
          <div className="titulo">
          <h2>{contat}</h2>

          </div>
        <div id="messages">
          <Ul>
             {messages ? messages.map(message=>(
                <li className={message.my}><p>{message.content}</p></li>
                  )): <li>Não rolou</li>}
          </Ul>
          <div className="input-wrapper">
            <input placeholder="Digite sua mensagem" onChange={e => setMessage(e.target.value)} value={message} type="text"/>
          </div>

          </div>
        </form>
  )
}

export default Chat;
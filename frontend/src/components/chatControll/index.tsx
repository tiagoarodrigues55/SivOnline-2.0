import React, {useState, useEffect, useCallback} from 'react';
import io from 'socket.io-client'
import Div from './styles'



interface MessageType{
  author: string,
  destiny: string,
  content: string
}
const socket = io('http://localhost:3001')
const ChatControll: React.FC = () => {
  
  const [messages, setMessages] = useState<MessageType[]>([
    { author: "Teste",
      destiny: "Teste",
      content: "Testetstetste  ettstste  tete teevvet ss"},
    { author: "Teste",
      destiny: "Teste",
      content: "Testetstetste  ettstste  tete teevvet ss"},
    { author: "Teste",
      destiny: "Teste",
      content: "Testetstetste  ettstste  tete teevvet ss"},
  ])
 
  socket.on('receivedMessage', (msg:MessageType)=>{
    const {author, destiny, content} = msg
      setMessages([...messages, {
        author,
        destiny,
        content
      }])
  })

  return (
          <Div>
            <ul>
             {messages ? messages.map(message=>(
                <li><p className="author">{message.author}</p><p> para </p><p className="destiny">{message.destiny}</p><p> dizendo: </p><p className="content">{message.content}</p></li>
                  )): <li>Não rolou</li>}
            </ul>
          </Div>
  )
}

export default ChatControll;
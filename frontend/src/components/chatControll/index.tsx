import React, {useState, useEffect} from 'react';
import Div from './styles'
import {useSocket} from '../../socket'



interface MessageType{
  author: string,
  destiny: string,
  content: string
}


const ChatControll: React.FC = () => {
const socket = useSocket()
  
  const [messages, setMessages] = useState<MessageType[]>([])
 useEffect(()=>{
  socket.on('receivedMessage', (msg:MessageType)=>{
    const {author, destiny, content} = msg
      setMessages([...messages, {
        author,
        destiny,
        content
      }])
  })

 }, [])

  return (
          <Div>
            <ul>
             {messages ? messages.map(message=>(
                <li><p className="author">{message.author} </p><p>  para  </p><p className="destiny"> {message.destiny} </p> <p>  dizendo:  </p> <p className="content"> {message.content} </p> </li>
                  )): <li>Não rolou</li>}
            </ul>
          </Div>
  )
}

export default ChatControll;
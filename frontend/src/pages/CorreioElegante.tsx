import React, {useState, useEffect} from 'react'
import {useSocket} from '../socket'

export default function CorreioElegante() {
  const socket = useSocket()

  const [messages, setMessages] = useState<string[]>()
  useEffect(()=>{
    socket.emit('CorreioElegante')
    socket.on('CorreioElegante', (msgs:string[])=>{
      setMessages(msgs)
    })
  },[])
  return (
    <div>
      {messages?.map(msg=>(
        <div key={msg}>{msg}</div>
      ))}
    </div>
  )
}

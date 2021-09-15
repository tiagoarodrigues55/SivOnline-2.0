import {useSocket} from '../../socket'
import React, {useState, useEffect} from 'react';


export default function Aplausos(){
  const socket = useSocket()
  return(
    <button onClick={()=>socket.emit("aplauso")}>
      Aplauso
    </button>
  )
}

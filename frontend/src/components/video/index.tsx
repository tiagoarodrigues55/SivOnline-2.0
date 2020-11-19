import React, {useState, ChangeEvent, FormEvent} from 'react'
import Styles from './styles'
import Jitsi from './Jitsi'
import Chronometer from '../Chronometer/index.js'
import {useSocket} from '../../socket'

interface Props{
  moderator?: boolean,
  newspaper?: boolean,
  newspaperBoss?: boolean,
}
const Video: React.FC<Props> = ({moderator, newspaper, newspaperBoss}) =>{
  const socket = useSocket()

  const user = localStorage.getItem('representation') || "Brasil"
  const group : number = Number(localStorage.getItem('newspaper_group')) || 0

  const [roomName, setRoomName] = useState('SivOnline100')
  const [password, setPassword] = useState('Tiago2003')
  const [speechesTime, setSpeechesTime] = useState(90)
  const [time, setTime] = useState(90)
  const [selectedRoom, setSelectedRoom] = useState('')
  const salasImprensa = ['The_Guardian', 'El_País', 'Le_Monde', 'Brasil_de_Fato']
  const [room, setRoom] = useState(false)

  function handleSelectRoom(event: ChangeEvent<HTMLSelectElement>){
    const action = event.target.value
    setSelectedRoom(action)
  }
  function handleSubmit(event: FormEvent){
    event.preventDefault()
    setRoomName(selectedRoom)
    setRoom(true)
  }
  if(moderator){
    return (
      <Styles className="components">
        <Jitsi moderator user={user} roomName={roomName} password={password}/>
        <Chronometer socket={socket} moderator startCount={speechesTime}/>
        
      </Styles>
    )
  }
  if(newspaper){
    return(
      <Styles className="components">
        <Jitsi newspaper user={user} roomName={salasImprensa[group]} password={password}/>

    </Styles>
    )
  }
  if(newspaperBoss){
    return(
      <Styles className="components">
        {room ? <Jitsi newspaper user={user} roomName={roomName} password={password}/> : null}
      <form onSubmit={handleSubmit}>
        <select value={selectedRoom} onChange={handleSelectRoom}>
          <option  value=''>Escolha uma sala</option>
              {salasImprensa.map(room=>(
          <option value={room}>{room}</option>
          ))}
        </select>
    <button type="submit">Enviar</button>
  </form>
  </Styles>
     
    )
  }
  return(
    <Styles className="components">
        <Jitsi user={user} roomName={roomName} password={password}/>
        <Chronometer socket={socket} startCount={speechesTime}/>

    </Styles>
    )
}
export default Video

import React, {useState} from 'react'
import Styles from './styles'
import Jitsi from './Jitsi'
import Chronometer from '../Chronometer/index.js'
interface Props{
  moderator?: boolean
}

const Video: React.FC<Props> = ({moderator}) =>{

  const user = localStorage.getItem('representation') || "Brasil"

  const [roomName, setRoomName] = useState('SivOnline100')
  const [password, setPassword] = useState('Tiago2003')
  const [speechesTime, setSpeechesTime] = useState(90)
  const [time, setTime] = useState(90)


  if(moderator){
    return (
      <Styles className="components">
        <Jitsi moderator user={user} roomName={roomName} password={password}/>
        <Chronometer moderator startCount={speechesTime}/>
        <form onSubmit={()=>setSpeechesTime(time)}>
        <input onChange={(e)=>setTime(Number(e.target.value))} type="number"/>
        </form>
      </Styles>
    )
  }
  return(
    <Styles className="components">
        <Jitsi user={user} roomName={roomName} password={password}/>
        <Chronometer startCount={speechesTime}/>

    </Styles>
    )
}
export default Video

import React, {useState} from 'react'
import Styles from './styles'
import Jitsi from './Jitsi'
interface Props{
  moderator?: boolean
}

const Video: React.FC<Props> = ({moderator}) =>{

  const user = localStorage.getItem('representation') || "Brasil"

  const [roomName, setRoomName] = useState('SivOnline100')
  const [password, setPassword] = useState('Tiago2003')
  const [onCall, setOnCall] = useState(false)


  if(moderator){
    return (
      <Styles className="components">
        <Jitsi moderator user={user} roomName={roomName} password={password}/>
        
      </Styles>
    )
  }
  return(
    <Styles className="components">
        <Jitsi user={user} roomName={roomName} password={password}/>

    <button>Aplausos virtuais</button>
    </Styles>
    )
}
export default Video

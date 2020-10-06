import React, {useState} from 'react'
import Styles from './styles'
import Jitsi from 'react-jitsi'

interface Props{
  moderator?: boolean
}
const user = localStorage.getItem('representation')

const Video: React.FC<Props> = ({moderator}) =>{


  const [roomName, setRoomName] = useState('SivOnline100')
  const [password, setPassword] = useState('Tiago2003')
  const [onCall, setOnCall] = useState(false)


  if(moderator){
    return (
      <Styles className="components">
       <>
      <h1>Create a Meeting</h1>
      <input type='text' placeholder='Room name' value={roomName} onChange={e => setRoomName(e.target.value)} />
      <button onClick={() => setOnCall(true)}> Let&apos;s start!</button>
    </>
        
      </Styles>
    )
  }
  return(
    <Styles className="components">

    <Jitsi
      roomName={roomName}
      displayName={user || 'Tiago'}
      // password={password}
      onAPILoad={JitsiMeetAPI => console.log('Good Morning everyone!')}
    />
    <button>Aplausos virtuais</button>
    </Styles>
    )
}
export default Video

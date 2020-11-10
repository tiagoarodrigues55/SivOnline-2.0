import React, {useState, useEffect} from 'react';
import Chat from './Chat'
import Styles from './styles'
import api from '../../services/api'
import { AiFillBulb } from "react-icons/ai";
import io from 'socket.io-client'

interface Props{
  moderator?: boolean
}
interface Messages{
  content: string,
  my: boolean
}
interface User{
representation: string,
representation_type: string
}
const socket = io('http://localhost:3001')

const Chats: React.FC<Props> = ({moderator}) => {
  const [haveMessage, sethaveMessage] = useState('')
  const [contats, setContats] = useState<string[]>([])
  const [contatsForModerator, setContatsForModerator] = useState<string[]>([])
  const [siglas, setSiglas] = useState<string[]>([
    
  ])
  useEffect(()=>{
    socket.emit('getUsers')

  },[])
socket.on('getUsers', (users: User[]) =>{
  const Contats = ['Mesa-Tiago', 'Mesa-Pedro', 'Staff-Técnico', 'Staff-Acadêmico']
  const Siglas = ['Mes-T', 'Mes-P', 'Sta-T', 'Sta-A']
  const ContatsForModerator = ['Mesa-Tiago', 'Mesa-Pedro', 'Staff-Técnico', 'Staff-Acadêmico', 'Chefe de Staff', 'Chefe de imprensa', 'Artur', 'Pablo', 'Intervenção']
  for(let i of users){
    if(i.representation === localStorage.getItem('representation')){

    }else{
    if(i.representation_type === "Delegado"){
      Contats.push(i.representation)
      Siglas.push(i.representation.substr(0,3).toUpperCase())
      ContatsForModerator.push(i.representation)
    }
  }
  }

  setContatsForModerator(ContatsForModerator)
  setContats(Contats)
  setSiglas(Siglas)
})
// api.get('/getUsers').then(users=>{
//   const Contats = ['Mesa-Tiago', 'Mesa-Pedro', 'Staff-Técnico', 'Staff-Acadêmico']
//   const Siglas = ['Mes-T', 'Mes-P', 'Sta-T', 'Sta-A']
//   const ContatsForModerator = ['Mesa-Tiago', 'Mesa-Pedro', 'Staff-Técnico', 'Staff-Acadêmico', 'Chefe de Staff', 'Chefe de imprensa', 'Artur', 'Pablo', 'Intervenção']
//   for(let i of users.data){
//     if(i.representation === localStorage.getItem('representation')){

//     }else{
//     if(i.representation_type === "Delegado"){
//       Contats.push(i.representation)
//       Siglas.push(i.representation.substr(0,3).toUpperCase())
//       ContatsForModerator.push(i.representation)
//     }
//   }
//   }

//   setContatsForModerator(ContatsForModerator)
//   setContats(Contats)
//   setSiglas(Siglas)
// })

  const [contat, setContat] = useState('')
  function renderContat(contat: string){
    //exibir component Chat
    setContat(contat)
  }
  function haveMessages(contat:string){
    sethaveMessage(contat)
  }

  if (moderator){
    return (
      <Styles className="components">
        <ul id="contats">
        {contatsForModerator.map(contat=>(
          <div className="contat">
  
          <li onClick={()=>renderContat(contat)} key={contat}>{contat}</li>{contat===haveMessage ? <AiFillBulb/>:null}
          </div>
       
        ))}
        </ul>
        
        <Chat haveMessages={haveMessages} contat={contat}/>
      </Styles>
    )
  }

  return (
    <Styles className="components">
      <div id="contats">
      {contats.map(contat=>(
        <div className="contat">

        <li onClick={()=>renderContat(contat)} key={contat}>{contat}{contat===haveMessage ? <AiFillBulb/>:null}</li>
        </div>
     
      ))}
      </div>
      
      <Chat haveMessages={haveMessages}  contat={contat}/>
    </Styles>
  )
}

export default Chats;
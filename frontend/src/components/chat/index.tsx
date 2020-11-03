import React, {useState, useEffect} from 'react';
import Chat from './Chat'
import Styles from './styles'
import { AiFillBulb } from "react-icons/ai";

interface Props{
  moderator?: boolean
}
interface Messages{
  content: string,
  my: boolean
}

const Chats: React.FC<Props> = ({moderator}) => {
  const [haveMessage, sethaveMessage] = useState('')
  const [contats, setContats] = useState([
    "diário",
    'Argentina',
    'Brasil',
    'Estados Unidos',
    'França',
    'Geórgia',
    'Holanda',
    'Israel',
    'Japão',
    'Staff',
    'Imprensa'
  ])
  const [siglas, setSiglas] = useState([
    "dia",
    'ARG',
    'BRA',
    'USA',
    'FRA',
    'GEO',
    'HOL',
    'ISR',
    'JAP',
    'STAFF',
    'IMP'
  ])

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
        {contats.map(contat=>(
          <div className="contat">
  
          <li onClick={()=>renderContat(contat)} key={contat}>{contat}</li>{contat===haveMessage ? <AiFillBulb/>:null}
          </div>
       
        ))}
        <li onClick={()=>renderContat("Popup")}>Popup</li>
        <li onClick={()=>renderContat("Mensagem Geral")}>Mensagem Geral</li>
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
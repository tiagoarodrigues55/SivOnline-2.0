import React, {useState, useEffect} from 'react';
import Chat from './Chat'
import Styles from './styles'
import api from '../../services/api'
import { AiFillBulb } from "react-icons/ai";
import {useSocket} from '../../socket'

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
interface Contats{
  Delegado: string[],
  Staff: string[],
  Mesa: string[],
  Imprensa: string[],
  Chefe: string[],
  Panóptico: string[],
}

const Chats: React.FC<Props> = ({moderator}) => {
const socket = useSocket()
const chat = () =>{
  if(localStorage.getItem('chat')==='Ativar'){
    return true
  }else{
    return false
  }
}
  const [haveMessage, sethaveMessage] = useState<string[]>([])
  const [inactive, setInactive] = useState(chat)
  const [contats, setContats] = useState<Contats>({
    Delegado: [],
    Staff: [],
    Mesa: [],
    Imprensa: [],
    Chefe: [],
    Panóptico: [],
  })


  useEffect(()=>{
    socket.emit('getUsers')

  },[])
  socket.on('inactiveChat', ()=>{
    console.log('inactiveChat')
    setInactive(true)
    localStorage.setItem('chat', 'Ativar')
  })
  socket.on('activeChat', ()=>{
    console.log('activeChat')
    setInactive(false)
    localStorage.setItem('chat', 'Inativar')
  })
socket.on('getUsers', (users: User[]) =>{
  // const Contats = ['Mesa-Tiago', 'Mesa-Pedro', 'Staff-Técnico', 'Staff-Acadêmico']
  const Contats : Contats = {Delegado: [], Mesa: [], Imprensa: [], Staff: [], Panóptico: [], Chefe: []}
  Contats.Delegado = ['Correio Elegante']
  Contats.Mesa = ['Correio Elegante']
  Contats.Imprensa = ['Correio Elegante']
  Contats.Chefe = ['Correio Elegante']
  Contats.Panóptico = ['Correio Elegante']
  Contats.Staff = ['Correio Elegante', 'Fernanda Issa']
  for(let i of users){
    if(i.representation === localStorage.getItem('representation')){
    }else{
      Contats.Mesa.push(i.representation)
      if(i.representation_type === "Delegado"){
        Contats.Delegado.push(i.representation)
        Contats.Staff.push(i.representation)
      }else{
        if(i.representation_type === "Imprensa"){
          Contats.Imprensa.push(i.representation)
          Contats.Chefe.push(i.representation)
          Contats.Staff.push(i.representation)

        }else{
          if(i.representation_type === "Staff"){
            Contats.Delegado.push(i.representation)
            Contats.Staff.push(i.representation)
            Contats.Imprensa.push(i.representation)
            Contats.Chefe.push(i.representation)
            Contats.Panóptico.push(i.representation)

          }else{
            if(i.representation_type === "Mesa"){
              Contats.Delegado.push(i.representation)
              Contats.Staff.push(i.representation)
              Contats.Imprensa.push(i.representation)
              Contats.Chefe.push(i.representation)
              Contats.Panóptico.push(i.representation)
            }else{
              if(i.representation_type === "Panóptico"){
                Contats.Panóptico.push(i.representation)
                Contats.Chefe.push(i.representation)

              }else{
                if(i.representation_type === "Chefe de imprensa"){
                  Contats.Imprensa.push(i.representation)
                  Contats.Panóptico.push(i.representation)
                  Contats.Mesa.push(i.representation)
  
                }
              }
            }
          }
        }
      }
  }
  }
console.log(Contats)
Contats.Delegado.sort()
Contats.Chefe.sort()
Contats.Staff.sort()
Contats.Imprensa.sort()
Contats.Panóptico.sort()
Contats.Mesa.sort()
  setContats(Contats)

})

  const [contat, setContat] = useState('')
  function renderContat(contat: string){
    //exibir component Chat
    setContat(contat)
    let contats = haveMessage.filter(cont=>{
      if(cont!==contat){
        return true
      }else{
        return false
      }
    })
    sethaveMessage(contats)
  }
  function haveMessages(contat:string){
    sethaveMessage([...haveMessage, contat])
  }

  if (moderator){
    return (
      <Styles className="components">
        <div id="contats">
        {localStorage.getItem('representation_type') === "Panóptico"? contats.Panóptico.map(contat=>(
        <div className="contat">

        <li onClick={()=>renderContat(contat)} key={contat}>{contat}{haveMessage.indexOf(contat)!==-1 ? <AiFillBulb/>:null}</li>
        </div>
     
      )): null}
        {localStorage.getItem('representation_type') === "Intervenção"? contats.Panóptico.map(contat=>(
        <div className="contat">

        <li onClick={()=>renderContat(contat)} key={contat}>{contat}{haveMessage.indexOf(contat)!==-1 ? <AiFillBulb/>:null}</li>
        </div>
     
      )): null}
        { localStorage.getItem('representation_type') === "Mesa"? contats.Mesa.map(contat=>(
          <div className="contat">
  
          <li onClick={()=>renderContat(contat)} key={contat}>{contat}</li>{haveMessage.indexOf(contat)!==-1 ? <AiFillBulb/>:null}
          </div>
       
        )): null}
        </div>
        
        <Chat haveMessages={haveMessages} contat={contat}/>
      </Styles>
    )
  }
if(inactive){
  return(
    <Styles>Chat inativo...</Styles>
  )
}
  return (
    <Styles className="components">
      <div id="contats">
      {localStorage.getItem('representation_type') === "Delegado"? contats.Delegado.map(contat=>(
        <div className="contat">

        <li onClick={()=>renderContat(contat)} key={contat}>{contat}{haveMessage.indexOf(contat)!==-1 ? <AiFillBulb/>:null}</li>
        </div>
     
      )): null}
      {localStorage.getItem('representation_type') === "Imprensa"? contats.Imprensa.map(contat=>(
        <div className="contat">

        <li onClick={()=>renderContat(contat)} key={contat}>{contat}{haveMessage.indexOf(contat)!==-1 ? <AiFillBulb/>:null}</li>
        </div>
     
      )): null}
      {localStorage.getItem('representation_type') === "Staff"? contats.Staff.map(contat=>(
        <div className="contat">

        <li onClick={()=>renderContat(contat)} key={contat}>{contat}{haveMessage.indexOf(contat)!==-1 ? <AiFillBulb/>:null}</li>
        </div>
     
      )): null}
      {localStorage.getItem('representation_type') === "Panóptico"? contats.Panóptico.map(contat=>(
        <div className="contat">

        <li onClick={()=>renderContat(contat)} key={contat}>{contat}{haveMessage.indexOf(contat)!==-1 ? <AiFillBulb/>:null}</li>
        </div>
     
      )): null}
      {localStorage.getItem('representation_type') === "Chefe de imprensa"? contats.Chefe.map(contat=>(
        <div className="contat">

        <li onClick={()=>renderContat(contat)} key={contat}>{contat}{haveMessage.indexOf(contat)!==-1 ? <AiFillBulb/>:null}</li>
        </div>
     
      )): null}
      </div>
      
      <Chat haveMessages={haveMessages}  contat={contat}/>
    </Styles>
  )
}

export default Chats;
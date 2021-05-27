import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import {useSocket} from '../../socket'
import Styles from './styles'


interface Props{
  moderator?: boolean
}

interface User{
  representation: string,
  username: string,
  id: number,
  email: string,
  password: string,
  value: number,
  representation_type: string,
  }
const user : string = localStorage.getItem('representation') || ''

const BuyDelegates: React.FC<Props> = ({moderator}) => {
  const socket = useSocket()

  const [selectedAction, setSelectedAction] = useState({type:'ação', action: ''})
  const [delegates, setDelegates] = useState<User[]>([])

  useEffect(()=>{
    socket.on('getDelegates', (delegates : User[]) =>{
      setDelegates(delegates)
    })
  },[])

  function handleSubmit(event: FormEvent){
    event.preventDefault()
    const action = selectedAction.action
    socket.emit('newAction', {
      title: action,
      type: selectedAction.type,
      representation: user
    })
    alert(`${selectedAction.type} enviada com sucesso!`)
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
  }
  function handleSelectAction(event: ChangeEvent<HTMLSelectElement>){
    const action = event.target.value
    const type = event.target.className
    setSelectedAction({type, action})
  }
  function Buy(delegateId:number){
    const quantity = 10
    var value = 0
    delegates.map(res=>{
      if(res.id === delegateId){
        value = res.value}})
    socket.emit('BuyDelegate', {quantity, value, delegateId, capitalist:user})
  }

    return (
      <Styles className="components">
        <div className="delegates">
          <ul>
            {delegates ? delegates.map(delegate=>(
              <>
              <li key={delegate.id}> V$ {delegate.value},00
              <button onClick={()=>Buy(delegate.id)}>Comprar</button>
              </li>
              </>
            )): null}
           
          </ul>
        </div>
      </Styles>
      )
 
}

export default BuyDelegates;
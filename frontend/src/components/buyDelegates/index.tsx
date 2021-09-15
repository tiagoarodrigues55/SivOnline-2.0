import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants';
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
let user = ''
if (typeof window !== "undefined") {
  user = window.localStorage.getItem('representation') || ''
}

const BuyDelegates: React.FC<Props> = ({moderator}) => {
  const socket = useSocket()

  const [selectedAction, setSelectedAction] = useState({type:'ação', action: ''})
  const [delegates, setDelegates] = useState<User[]>([
    {  representation: 'Brasil',
      username: 'Tiago',
      id: 123,
      email: 'tanto faz',
      password: 'tanto faz',
      value: 30,
      representation_type: 'Delegate',}
  ])
  const [updateMoney, setMoney] = useState(0)

  useEffect(()=>{
    socket.on('getDelegates', (delegates : User[]) =>{
      setDelegates(delegates)
      console.log(delegates[0])
    })
    socket.on('getCurrentMoney', (money : number)=>{
      setMoney(money)
    })
    socket.on('noMoney', ()=>{
      alert('Fundos insuficientes')
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
    var val: number = +event.target.value
    setQuantity(val)
    val = 1
  }

  const quantities = [1,2,3,4,5,6,7,8,9,10]
  const [quantity, setQuantity] = useState(1)
  function Buy(delegateId:number){
    var value = 0
    delegates.map(res=>{
      if(res.id === delegateId){
        value = res.value
      }
    })
    socket.emit('BuyDelegate', {quantity, value, delegateId, capitalist:user})
    setQuantity(1)
  }

  return (
    <Styles className="components">
      <div className="delegates">
        <p>V$ {updateMoney},00</p>
        <ul>
          <select value={quantity} onChange={handleSelectAction}>
                  <option  value= '1'>Escolha a quantidade</option>
                  {quantities.map(quantity=>(
                    <option value={quantity}>{quantity}</option>
                  ))}
          </select>
          {delegates ? delegates.map(delegate=>(
            <>
              <li key={delegate.id}>
                {delegate.username} ({delegate.representation}): V$ {delegate.value * quantity},00 
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
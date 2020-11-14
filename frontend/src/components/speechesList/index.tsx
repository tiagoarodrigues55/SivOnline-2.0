import React, {useState, useEffect} from 'react';
import Styles from './styles'
import {useSocket} from '../../socket'


interface Props{
  moderator?: boolean,
  newspaper?: boolean
}
interface Speech{
  position: number,
  flag: string,
  name: string
}


const SpeechesList: React.FC<Props> = ({moderator, newspaper}) => {
const socket = useSocket()

  const user : string = localStorage.getItem('representation') || ''

  const [delegations, setDelegations] = useState<Speech[]>([
  ])
  const [buttonState, setButtonState] = useState('visible')
  const [timeOfSpeech, setTimeOfSpeech] = useState(90)
  socket.on('previousEmits', (data : {speechesList: string[]})=>{
    const List = data.speechesList.map(i=>({position: data.speechesList.indexOf(i)+1, flag: 'icon', name: i}))

    setDelegations(List)
  })
  socket.on('setSpeechesTime', (res:number)=>{
    setTimeOfSpeech(res)
  })
  useEffect(() => {
    if(delegations.map(i=>i.name).indexOf(user)!==-1){
      setButtonState('unvisible')
    }else{
      setButtonState('visible')
    }
  }, [delegations])
  socket.on('setSpeechesList', (list : string[])=>{
      const List = list.map(i=>({position: list.indexOf(i)+1, flag: 'icon', name: i}))
      setDelegations(List)
  })
  function handleSpeechList(){
    socket.emit('newSubscribe', user)
  }
  function removeDelegation(){
    socket.emit('removeSubscribe')
  }
 if(!delegations[0] && moderator === true){
return(
  <div>Não há inscrições</div>
)
 }
  return(
    <Styles className="components">
        <div className="titulo">Lista de Discursos</div>
      <ul>
        {delegations.map(delegation=>(
          <div className="box">
            <li key={delegation.position}>{delegation.name} -{` ${Math.round(delegation.position * timeOfSpeech / 60)} minutos`}</li>
            <div className="separator"></div>

          </div>
        ))}
       
      </ul>
     {moderator ? <button onClick={removeDelegation}>{`Remover ${delegations[0].name} da lista`}</button> : null}
     {moderator || newspaper ? null: <button id={buttonState} onClick={handleSpeechList}>Inscreva-se na lista</button>}
      
      

    </Styles>
  );
}

export default SpeechesList;
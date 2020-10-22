import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import Styles from './styles'
import io from 'socket.io-client'

interface Props{
  moderator?: boolean
}
interface action{
  title: string,
  description: string,
  type: string,
  representation: string
}
const socket = io('http://localhost:3001')
const user : string = localStorage.getItem('representation') || ''

const Actions: React.FC<Props> = ({moderator}) => {
  const [selectedAction, setSelectedAction] = useState({type:'ação', action: ''})
  const [actions, setActions] = useState<action[]>([])
  const [formData, setFormData] = useState({
    text: ''
  })
  const moções = [
    {value:'tempo>', text:'aumento do tempo de discurso'},
    {value:'tempo<', text:'diminuição do tempo de discurso'},
    {value:'>lista', text:'abertura da lista de discursos'},
    {value:'<lista', text:'fechamento da lista de discursos'},
    {value:'>seção', text:'abrir seção'},
    {value:'<seção', text:'fechar seção'}
  ]
  const questões = [
    {value: 'ordem', text:'ordem'}, 
    {value:'pp', text:'privilégio pessoal'}, 
    {value:'dúvida', text:'dúvida'}
  ]
  const placeholder = `descreva sua ${selectedAction.type} para analisarmos a relevância`
  useEffect(()=>{
    socket.on('setActions', (actions : action[]) =>{
      setActions(actions)
    })
  },[])

  function handleSubmit(event: FormEvent){

    const {text} = formData
    const action = selectedAction.action
    socket.emit('newAction', {
      title: action,
      type: selectedAction.type,
      description: text,
      representation: user
    })
    alert(`${selectedAction.type} enviada com sucesso!`)
  }
  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
    setFormData({text: value})
  }
  function handleSelectAction(event: ChangeEvent<HTMLSelectElement>){
    const action = event.target.value
    const type = event.target.className
    setSelectedAction({type, action})
  }
  function removeAction(action : action){
    socket.emit('removeAction', action)
  }

  if (moderator){
    return (
      <Styles className="components">
        <div>
          <ul>
            {actions ? actions.map(action=>(
              <>
              <li key={action.description}>{action.type}: <strong>{action.title}</strong> <br/> {action.description} {`[${action.representation}]`} 
              <button onClick={()=>removeAction(action)}>remove</button>
              </li>
              </>
            )): null}
           
          </ul>
        </div>
      </Styles>
      )
  }
  return (
  <Styles className="components">
  <form onSubmit={handleSubmit}>
    <select className="moção" value={selectedAction.type==='moção'?selectedAction.action:''} onChange={handleSelectAction} id="moção">
    <option  value=''>Escolha um tipo de moção</option>

    {moções.map(moc=>(
      <option value={moc.value}>{moc.text}</option>
    ))}
    </select>
    <select className="questão" value={selectedAction.type==='questão'?selectedAction.action:''} onChange={handleSelectAction} id="questão">
    <option value=''>Escolha um tipo de questão</option>

    {questões.map(quest=>(
      <option value={quest.value}>{quest.text}</option>
    ))}
    </select>
    <input type="text" onChange={handleInputChange} placeholder={placeholder}/>
    <button type="submit">Enviar</button>
  </form>
  </Styles>
  )
}

export default Actions;
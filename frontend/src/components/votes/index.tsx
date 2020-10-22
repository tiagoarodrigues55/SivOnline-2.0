import React, {useState, FormEvent, ChangeEvent, useEffect} from 'react';
import NewVote from './NewVote'
import Styles from './styles'
import io from 'socket.io-client'

const socket = io('http://localhost:3001')

interface Props{
  moderator?: boolean
}
interface LastVote{
  title: string,
  favorables: string[],
  againsts: string[],
  decision: string,
}
interface NewVote{
  title: string,
  description: string,
  link?: string
}
const Votes: React.FC<Props> = ({moderator}) => {

  const [lastVote, setLastVote] = useState<LastVote>()
  
  const [newVote, setNewVote] = useState<NewVote>({
    title: '',
    description: '',
    link: ''
  })
  useEffect(()=>{
    socket.on('lastVote', (lastVote : LastVote) =>{
      setLastVote(lastVote)
    })
  },[])
  function handleSubmit(event: FormEvent){
    const {title, description, link} = newVote
    socket.emit('newVote', {
      title,
      description,
      link
    })
  }
  socket.on('finishVote', (lastVote : LastVote) =>{
    setLastVote(lastVote)
    console.log(lastVote)

  })
  function handleTitle(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
    setNewVote({title: value, description: newVote.description, link: newVote.link})
  }
  function handleDescription(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
    setNewVote({title: newVote.title, description: value, link: newVote.link})
  }
  function handleLink(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
    setNewVote({title: newVote.title, description: newVote.description, link: value})
  }

  if(moderator){
    return (
      <Styles className="components">
        <form onSubmit={handleSubmit}>
          <input onChange={handleTitle} placeholder="Título" type="text"/>
          <input onChange={handleDescription} placeholder="descrição" type="text"/>
          <input onChange={handleLink} placeholder="Link do documento"  type="text"/>
          <button type="submit">Enviar</button>
        </form>
      </Styles>
    )
  }
  if(!lastVote){
    return(
      <div>

      </div>
    )
  }
  return (
    <Styles className="components">
     <div className="LastVote">
        <h1>{lastVote.title}</h1>
        <div id="votes">
          <div id="favorVotes">
            <h2>Votos a favor</h2>
              <ul>
              {lastVote.favorables.map(vote=>(
                <li key={vote}>{vote}</li>
              ))}
              </ul>
          </div>
          <div id="againstVotes">
            <h2>Votos contra</h2>
            <ul>
              {lastVote.againsts.map(vote=>(
              <li key={vote}>{vote}</li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <h3>{`Essa moção ${lastVote.decision} por ${lastVote.favorables.length} votos a ${lastVote.againsts.length}`}</h3>
        </div>
      </div>
    </Styles>
  )
}

export default Votes;
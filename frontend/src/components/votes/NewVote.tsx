import React, { useState } from 'react';


interface Props{
  moderator?: boolean
  vote: Vote
}
interface Vote{
  title: string,
  description: string,
  link?: string
}
const NewVote: React.FC<Props> = ({moderator, vote}) => {

  const [favorableVotes, setFavorableVotes] = useState<String[]>()
  const [againstVotes, setagainstVotes] = useState<String[]>()
  if(moderator){
    return(
      <div>
        <h1>Favoraveis</h1>
        <ul>
          {favorableVotes?.map((representation: String)=>(
            <li>{representation}</li>
          ))}
        </ul>
        <h1>Contrários</h1>
        <ul>
          {againstVotes?.map((representation: String)=>(
            <li>{representation}</li>
          ))}
        </ul>
      </div>
    )
  }
  return(
    <div>
      <h1>{vote.title}</h1>
      <h2>{vote.description}</h2>
      <a href={vote.link}>vote.link</a>
    </div>
  )
}

export default NewVote;
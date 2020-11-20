import React, {useState, useEffect, } from 'react';
import Styles from './styles'
import {AiFillFileText} from "react-icons/ai";
import {useSocket} from '../../socket'

interface Doc{
  name: string,
  link: string,
  user?: string
}

interface Props{
  limit?:boolean
}
const AllDocs: React.FC<Props> = ({limit}) => {
  const socket = useSocket()

  const [docs, setDocs] = useState<Doc[]>([])
  useEffect(()=>{
    socket.on("newDoc", (doc : Doc)=>{
      setDocs([...docs, doc])
    })
  },[])
 
if(limit){
  return(
    <Styles className="components">
    <div id="docs">
    <h3>Documentos</h3>
    <div className='docs2'>
      {docs.map(doc=>(
          <div className="doc">{doc.name} - {doc.user}
          <a target="_blank" rel="noopener noreferrer" href={doc.link}><AiFillFileText/></a>
          </div>
      ))}
    </div>
    </div>

  </Styles>
  )
}
  return (
    <Styles className="components">
      <div id="docs">
      <h3>Documentos</h3>
      <div className='docs'>
        {docs.map(doc=>(
            <div className="doc">{doc.name} - {doc.user}
            <a target="_blank" rel="noopener noreferrer" href={doc.link}><AiFillFileText/></a>
            </div>
        ))}
      </div>
      </div>
 
    </Styles>
  )
}

export default AllDocs;
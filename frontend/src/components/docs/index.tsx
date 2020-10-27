import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import Styles from './styles'
import {AiFillFileText} from "react-icons/ai";
import io from 'socket.io-client'
const socket = io('http://localhost:3001')
interface Props{
  moderator?: boolean
}
interface Doc{
  name: string,
  link: string,
  user?: string
}


const Docs: React.FC<Props> = ({moderator}) => {
  const user = localStorage.getItem('representation') || "Brasil"

  const [privateDocs, setPrivateDocs] = useState<Doc[]>([])
  const [publicDocs, setPublicDocs] = useState<Doc[]>([])
  const [privateLink, setPrivateLink] = useState<String>()
  const [publicLink, setPublicLink] = useState<String>()
  const [privateName, setPrivateName] = useState<String>()
  const [publicName, setPublicName] = useState<String>()
  socket.on("setPublicDocs", (docs : Doc[])=>{
    console.log(docs)
    setPublicDocs(docs)
  })
 
  socket.on("setPrivateDocs", (docs : Doc[])=>{
    const userDocs = filterDocs(docs)
    setPrivateDocs(userDocs)
  })
  function filterDocs(docs : Doc[]){
    let userDocs = []
    for(let i of docs){
      if(i.user===user){
        userDocs.push(i)
      }
    }
    return userDocs
  }
  function handlePrivateName(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
    setPrivateName(value)
  }
  function handlePrivateLink(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
    setPrivateLink(value)
  }

  function handlePublicName(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
    setPublicName(value)
  }
  function handlePublicLink(event: ChangeEvent<HTMLInputElement>){
    const {value} = event.target
    setPublicLink(value)
  }
  function handlePrivateDoc(event: FormEvent){
    event.preventDefault()
    socket.emit('newPrivateDoc', {
      name: privateName,
      link: privateLink,
      user
    })
    alert("Documento enviado com sucesso")
  }
  function handlePublicDoc(event: FormEvent){
    event.preventDefault()
    socket.emit('newPublicDoc', {
      name: publicName,
      link: publicLink,
    })
    alert("Documento enviado com sucesso")
  }

  if(moderator){
    return (
      <Styles className="components">
        <div id="privateDocs">
        <h3>Documentos privados</h3>
     <ul>
        {privateDocs.map(doc=>(
          <div className="doc">
            <li>{doc.name}
            <a target="_blank" rel="noopener noreferrer" href={doc.link}><AiFillFileText/></a>
            </li>
          </div>
        ))}
      </ul>
        </div>
        <div id="publicDocs">
        <h3>Documentos públicos</h3>
        <ul>
          {publicDocs.map(doc=>(
            <div className="doc">
              <li>{doc.name}
              <a target="_blank" rel="noopener noreferrer" href={doc.link}><AiFillFileText/></a>
              </li>
            </div>
          ))}
        </ul>
        </div>
            <div id="createDoc">
            <form onSubmit={handlePublicDoc}>
              <input onChange={handlePublicName} type="text" placeholder="Nome do documento"/>
              <input onChange={handlePublicLink} type="text" placeholder="Link para o documento"/>
              <button type="submit">Enviar</button>
            </form>
            </div>
        
      </Styles>
    )
  }

  return (
    <Styles className="components">
      <div id="privateDocs">
      <h3>Documentos privados</h3>
      <ul>
        {privateDocs.map(doc=>(
          <div className="doc">
            <li>{doc.name}
            <a target="_blank" rel="noopener noreferrer" href={doc.link}><AiFillFileText/></a>
            </li>
          </div>
        ))}
      </ul>
      </div>
      <div id="publicDocs">
      <h3>Documentos públicos</h3>
      <ul>
        {publicDocs.map(doc=>(
          <div className="doc">
            <li>{doc.name}
            <a target="_blank" rel="noopener noreferrer" href={doc.link}><AiFillFileText/></a>
            </li>
          </div>
        ))}
      </ul>
      </div>
          <div id="createDoc">
            <form onSubmit={handlePrivateDoc}>
              <input onChange={handlePrivateName} type="text" placeholder="Nome do documento"/>
              <input onChange={handlePrivateLink} type="text" placeholder="Link para o documento"/>
              <button type="submit">Enviar</button>
            </form>
          </div>
      
    </Styles>
  )
}

export default Docs;
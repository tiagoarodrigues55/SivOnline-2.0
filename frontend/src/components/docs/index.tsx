import React, {useState} from 'react';
import Styles from './styles'
import {AiFillFileText} from "react-icons/ai";

interface Props{
  moderator?: boolean
}
const Docs: React.FC<Props> = ({moderator}) => {
 
  const [privateDocs, setPrivateDocs] = useState([
    {name: 'Documento1', 
    link: 'https://docs.google.com/document/d/1FYlvqzYqU8xQj-FQSFTdzIGH4hpxkZVzQhg6ewiwJQI/edit'},
    {name: 'Documento2', 
    link: 'https://docs.google.com/document/d/1FYlvqzYqU8xQj-FQSFTdzIGH4hpxkZVzQhg6ewiwJQI/edit'},
    {name: 'Documento3', 
    link: 'https://docs.google.com/document/d/1FYlvqzYqU8xQj-FQSFTdzIGH4hpxkZVzQhg6ewiwJQI/edit'}
  ])
  const [publicDocs, setPublicDocs] = useState([
    {name: 'Documento1', 
    link: 'https://docs.google.com/document/d/1FYlvqzYqU8xQj-FQSFTdzIGH4hpxkZVzQhg6ewiwJQI/edit'},
    {name: 'Documento2', 
    link: 'https://docs.google.com/document/d/1FYlvqzYqU8xQj-FQSFTdzIGH4hpxkZVzQhg6ewiwJQI/edit'},
    {name: 'Documento3', 
    link: 'https://docs.google.com/document/d/1FYlvqzYqU8xQj-FQSFTdzIGH4hpxkZVzQhg6ewiwJQI/edit'}
  ])
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
            <div 
        id="createDoc"
        >
  <a 
        target="_blank" 
        rel="noopener noreferrer"
        href="https://docs.google.com/document/d/1IYdNxLMLs4f1g2glrxRnS8hQPVVgDjjyB4tyUH4eB6Y/edit" 
        >
          Criar novo documento
          </a>
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
          <div 
      id="createDoc"
      >
<a 
      target="_blank" 
      rel="noopener noreferrer"
      href="https://docs.google.com/document/d/1IYdNxLMLs4f1g2glrxRnS8hQPVVgDjjyB4tyUH4eB6Y/edit" 
      >
        Criar novo documento
        </a>
          </div>
      
    </Styles>
  )
}

export default Docs;
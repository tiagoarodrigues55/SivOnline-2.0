// import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import React, {useCallback, FormEvent, useState, ChangeEvent} from 'react'
import {useDropzone} from 'react-dropzone'
import Styles from './styles'
import io from 'socket.io-client'
// import Dropzone from 'react-dropzone'


const socket = io('http://localhost:3001')
const user : string = localStorage.getItem('representation') || ''

const Post: React.FC = () => {
  const [post, setPost] = useState({title: '', description: ''})
  // const onDrop = useCallback(acceptedFiles => {
  //   // Do something with the files
  // }, [])
  // const {getRootProps, acceptedFiles, getInputProps, isDragActive} = useDropzone({onDrop})
  const {getRootProps, acceptedFiles, getInputProps} = useDropzone()

 function handleSubmit(event: FormEvent){
  socket.emit('post', {
    title: post.title,
    description: post.description,
    // file
  })
  // acceptedFiles.map(file=>{
  //   socket.emit('post', {
  //     title: post.title,
  //     description: post.description,
  //     // file
  //   })
  // })
 }
 function handleTitle(event: ChangeEvent<HTMLInputElement>){
  const {value} = event.target
  setPost({title: value, description: post.description})
}
 function handleDescription(event: ChangeEvent<HTMLInputElement>){
  const {value} = event.target
  setPost({title: post.title, description: value})
}
 const files = acceptedFiles.map(file => {
  console.log(file) 
  return(
  <li key={file.name}>
    {file.name} - {file.size} bytes
  </li>
)});
  return (
  <Styles className="components">
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleTitle} placeholder="Título"/>
      <input type="text" onChange={handleDescription} placeholder="Descrição"/>
    <div {...getRootProps({className: 'dropzone'})}>
      <input {...getInputProps()} />
      Clique aqui para adicionar arquivos
       </div>
  <ul>{files}</ul>

    <button type="submit">Enviar</button>
    </form>
  
  </Styles>
  )
}

export default Post;
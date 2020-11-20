// import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import React, {FormEvent, useState, ChangeEvent} from 'react'
import Styles from './styles'
import {useSocket} from '../../socket'




const user : string = localStorage.getItem('representation') || ''

const Post: React.FC = () => {
const socket = useSocket()

  const [post, setPost] = useState({title: '', description: '', link: ''})
 

 function handleSubmit(event: FormEvent){
   event.preventDefault()
   alert('Seu artigo foi enviado com sucesso')
   if(localStorage.getItem('representation')==='Pedro José'){
     console.log(user)
    socket.emit('post', {
      title: post.title,
      description: post.description,
      link: post.link
    })
  }else{
    console.log(user)

    socket.emit('postsPreview', {
      title: post.title,
      description: post.description,
      link: post.link,
      representation: localStorage.getItem('representation')
    })
  }

 }
 function handleTitle(event: ChangeEvent<HTMLInputElement>){
  const {value} = event.target
  setPost({title: value, description: post.description, link: post.link})
}
 function handleDescription(event: ChangeEvent<HTMLInputElement>){
  const {value} = event.target
  setPost({title: post.title, description: value, link: post.link})
}
 function handleLink(event: ChangeEvent<HTMLInputElement>){
  const {value} = event.target
  setPost({title: post.title, description: post.description, link: value})
}

  return (
  <Styles className="components">
    <form onSubmit={handleSubmit}>
      <input type="text" onChange={handleTitle} placeholder="Título"/>
      <input type="text" onChange={handleDescription} placeholder="Descrição"/>
      <input type="text" onChange={handleLink} placeholder="Link"/>


    <button type="submit">Enviar</button>
    </form>
  
  </Styles>
  )
}

export default Post;
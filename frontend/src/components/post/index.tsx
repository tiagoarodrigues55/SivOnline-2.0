// import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import React, {useCallback, FormEvent, useState, ChangeEvent} from 'react'
import Styles from './styles'
import io from 'socket.io-client'


const socket = io('http://177.8.161.242:3001')

const user : string = localStorage.getItem('representation') || ''

const Post: React.FC = () => {
  const [post, setPost] = useState({title: '', description: '', link: ''})
 

 function handleSubmit(event: FormEvent){
   event.preventDefault()
   alert('Seu artigo foi enviado com sucesso')
   if(user==='Pedro José'){
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
      representation: user
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
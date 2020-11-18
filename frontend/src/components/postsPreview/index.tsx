import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import Styles from './styles'
import {useSocket} from '../../socket'


interface post{
  title: string,
  description: string,
  link: string,
  representation: string
}
const PostsPreview: React.FC = () => {
const socket = useSocket()

  const [posts, setPosts] = useState<post[]>([])
  socket.on('PreviousEmits', (data : {postsPreview : post[]})=>{
    setPosts(data.postsPreview)
  })
  useEffect(()=>{
    socket.on('setPostsPreview', (posts : post[]) =>{
      setPosts(posts)
    })
  },[])
  function removePost(post : post){
    socket.emit('removePostPreview', post)
  }
    return (
      <Styles className="components">
        <div>
          <ul>
            {posts ? posts.map(post=>(
              <>
              <li key={post.description}><a href={post.link}><strong>{post.title}</strong> <br/> {post.description} {`[${post.representation}]`} </a>
              <button onClick={()=>removePost(post)}>remove</button>
              </li>
              </>
            )): null}
          </ul>
        </div>
      </Styles>
      )
  }
export default PostsPreview;
import React, {useState, useRef, useEffect} from 'react';
import Article from './Article'
import Styles from './styles'

import {useSocket} from '../../socket'

interface Props{
  moderator?: boolean
}
interface Post{
  title: string,
  description: string,
  link: string
}


const News: React.FC<Props> = ({moderator}) => {
  //feed com notícias estáticas (iframe)
  //anúncios fixados da mesa
const socket = useSocket()
const news = () =>{
  if(localStorage.getItem('news')==='Inativar'){
    return true
  }else{
    return false
  }
}
const newsScroll = useRef<any>();

  const [articles, setArticles] = useState<Post[]>([])
  const [inactive, setInactive] = useState(news)
 
  useEffect(()=>{
    socket.on('PreviousEmits', (data : {posts : Post[]})=>{
    
      setArticles(data.posts)
    })
    socket.on('posts', (posts : Post[])=>{
      setArticles(posts)
    })
    socket.on('inactiveNews', ()=>{
      setInactive(true)
      localStorage.setItem('news', 'Inativar')
  
    })
    socket.on('activeNews', ()=>{
      setInactive(false)
      localStorage.setItem('news', 'Ativar')
  
    })
  },[])


  useEffect(()=>{
    newsScroll.current.scrollIntoView( { behavior: 'smooth', block: 'end' });
  }, [articles])
 if(inactive){
   return(
     <Styles>Não temos comunicação com a imprensa...
                  <div ref={newsScroll}></div>

     </Styles>
   )
 }
  return (
    <Styles className="components">

      {articles.map(article=>(
        <div className="article">
        <Article 
        title={article.title} 
        introduction={article.description} />
        <a target="_blank" href={article.link}>Link</a>

        <div className="separator"></div>

        </div>
       
      ))}
                  <div ref={newsScroll}></div>

     
    </Styles>
  )
}

export default News;
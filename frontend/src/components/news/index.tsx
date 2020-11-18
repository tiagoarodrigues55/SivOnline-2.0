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
  let articles2 = []
  for(let i = 1; articles.length; i++){
    articles2.push(articles[articles.length-i])
  }
  console.log(articles2)
},[articles])

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
  useEffect(()=>{
    newsScroll.current.scrollIntoView( { behavior: 'smooth', block: 'start' });
  
  }, [articles])
 if(inactive){
   return(
     <Styles>Não temos comunicação com a imprensa...</Styles>
   )
 }
  return (
    <Styles className="components">
                  <div ref={newsScroll}></div>

      {articles.map(article=>(
        <div className="article">
        <Article 
        title={article.title} 
        introduction={article.description} />
        <a href={article.link}>Link</a>

        <div className="separator"></div>
        </div>
       
      ))}
      {/* {organizeNews.map(organizeNew=>(
        <div id="mesa" className="article">
        <OrganizeNew title={organizeNew.title} communicate={organizeNew.communicate} />
        <div className="separator"></div>
        </div>


      ))} */}
    </Styles>
  )
}

export default News;
import React, {useState} from 'react';
import Article from './Article'
import Styles from './styles'

import {useSocket} from '../../socket'

interface Props{
  moderator?: boolean
}
interface Post{
  title: string,
  description: string
}


const News: React.FC<Props> = ({moderator}) => {
  //feed com notícias estáticas (iframe)
  //anúncios fixados da mesa
const socket = useSocket()
 
  const [articles, setArticles] = useState<Post[]>([])
  const [inative, setInative] = useState(false)
  socket.on('previousEmits', (data : {posts : Post[]})=>{
    setArticles(data.posts)
  })
  socket.on('posts', (posts : Post[])=>{
    console.log(posts)
    setArticles(posts)
  })
  socket.on('inativeNews', ()=>{
    setInative(true)
  })
 if(inative){
   return(
     <Styles>Não temos comunicação com a imprensa...</Styles>
   )
 }
  return (
    <Styles className="components">
      {articles.map(article=>(
        <div className="article">
        <Article 
        title={article.title} 
        introduction={article.description} />

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
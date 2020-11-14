import React, {useState} from 'react';
import Article from './Article'
import OrganizeNew from './OrganizeNew'
import {useSocket} from '../../socket'
const socket = useSocket()

import Styles from './styles'
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
 
  const [articles, setArticles] = useState<Post[]>([])
  socket.on('previousEmits', (data : {posts : Post[]})=>{
    setArticles(data.posts)
  })
  socket.on('posts', (posts : Post[])=>{
    console.log(posts)
    setArticles(posts)
  })

 
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
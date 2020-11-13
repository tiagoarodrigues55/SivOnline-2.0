import React, {useState} from 'react';
import Article from './Article'
import OrganizeNew from './OrganizeNew'
import io from 'socket.io-client'

import Styles from './styles'
interface Props{
  moderator?: boolean
}
interface Post{
  title: string,
  description: string
}
const socket = io(process.env.REACT_APP_SOCKET_URL || '') 


const News: React.FC<Props> = ({moderator}) => {
  //feed com notícias estáticas (iframe)
  //anúncios fixados da mesa
 
  const [articles, setArticles] = useState<Post[]>([])
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
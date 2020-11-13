import React from 'react';

// import { Container } from './styles';
interface Props{
  title: string,
  introduction: string,
}

const Article: React.FC<Props> = ({title,  introduction}) => {
  return (
    <div>
      <h1>{title}</h1>
      <p>{introduction}</p>
    </div>
  );
}

export default Article;
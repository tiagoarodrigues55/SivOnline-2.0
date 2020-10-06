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
      <h3>{introduction}</h3>
    </div>
  );
}

export default Article;
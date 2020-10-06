import React from 'react';

// import { Container } from './styles';
interface Props{
  title: string,
  communicate: string
}

const OrganizeNew: React.FC<Props> = ({title, communicate}) => {
  return (
    <div className="organize">
      <div id="titleOrganize">
      <h1>{title}</h1>
      <div className="iconBall"></div>
      </div>
      <h3>{communicate}</h3>
    </div>
  )
}

export default OrganizeNew;
import React, {useState} from 'react';

import Global from './styles/Global'
import Routes from './routes'
import {Background} from './components/backgroundImg/styles'
import * as dotenv from 'dotenv';
import SocketProvider from './socket'
import {useSocket} from './socket'
// const { ThemeProvider } = require('styled-components')
import {ThemeProvider} from 'styled-components'
dotenv.config();
function App() {
  const [theme, setTheme] = useState({
    primary: '#BEC5C7',
    secondary:  'rgba(190, 197, 199, 0.73)',
    tertiary: '#F4AD5E',
    quaternary: '#96989D',
    quinary: '#C4C4C4',
    senary: 'rgba(129, 129, 137, 0.6)',
    backgroundImg: 0
  })
  const socket = useSocket()

  socket.on('intervention', ()=>{
    let number = 0
    var interventionFunction = setInterval(()=>{
      let colors = ['red', 'blue', 'gray', 'green','red', 'blue', 'gray', 'green','red', 'blue', 'gray', 'green','red', 'blue', 'gray', 'green','red', 'blue', 'gray', 'green',]
      setTheme({
        primary: colors[number],
        secondary:  colors[number+1],
        tertiary: colors[number+2],
        quaternary: colors[number+3],
        quinary: colors[number+4],
        senary: colors[number+5],
        backgroundImg: 1
      })
      number++
  }, 300);
  setTimeout(()=>{
    clearInterval(interventionFunction)
    setTheme({
      primary: '#BEC5C7',
      secondary:  'rgba(190, 197, 199, 0.73)',
      tertiary: '#F4AD5E',
      quaternary: '#96989D',
      quinary: '#C4C4C4',
      senary: 'rgba(129, 129, 137, 0.6)',
      backgroundImg: 0
    })

  }, 20000)
  })
  return (
    <div className="App" >
      <ThemeProvider theme={theme}>
      
      <SocketProvider>
      <Global/>
     <Routes/>
     <Background theme={theme} />
     </SocketProvider>
     </ThemeProvider>

    </div>
  );
}

export default App;

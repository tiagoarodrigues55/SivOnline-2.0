import React, {useEffect, useState} from 'react';

import Global from './styles/Global'
import Routes from './routes'
import {Background} from './components/backgroundImg/styles'
import SocketProvider from './socket'
import {useSocket} from './socket'
import {ThemeProvider} from 'styled-components'
const themeColors = {
  primary: '#BEC5C7',
  secondary:  'rgba(190, 197, 199, 0.73)',
  tertiary: '#F4AD5E',
  quaternary: '#96989D',
  quinary: '#C4C4C4',
  senary: 'rgba(129, 129, 137, 0.6)',
  backgroundImg: 0
}

function App() {
  const [theme, setTheme] = useState(themeColors)
  const socket = useSocket()
  useEffect(()=>{
    socket.on('intervention', ()=>{

      let number = 0
      var interventionFunction = setInterval(()=>{
        let colors = ['red', 'blue', 'gray', 'green','red', 'blue', 'gray', 'green','red', 'blue', 'gray', 'green','red', 'blue', 'gray', 'green','red', 'blue', 'gray', 'green',]
        const toggleTheme = {
          primary: colors[number],
          secondary:  colors[number+1],
          tertiary: colors[number+2],
          quaternary: colors[number+3],
          quinary: colors[number+4],
          senary: colors[number+5],
          backgroundImg: 1
        }
        setTheme(toggleTheme)
        number++
    }, 300);
    setTimeout(()=>{
      clearInterval(interventionFunction)
      setTheme(themeColors)
  
    }, 20000)
    })
    
  },[])


  
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

import React from 'react';

import Global from './styles/Global'
import Routes from './routes'
import {Background} from './components/backgroundImg/styles'
import * as dotenv from 'dotenv';
import SocketProvider from './socket'
dotenv.config();
function App() {
  return (
    <div className="App" >
      <SocketProvider>
      <Global/>
     <Routes/>
     <Background/>
     </SocketProvider>
    </div>
  );
}

export default App;

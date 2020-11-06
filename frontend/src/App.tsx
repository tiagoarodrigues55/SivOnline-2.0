import React from 'react';

import Global from './styles/Global'
import Routes from './routes'
import {Background} from './components/backgroundImg/styles'
function App() {
  return (
    <div className="App" >
      <Global/>
     <Routes/>
     <Background/>
    </div>
  );
}

export default App;

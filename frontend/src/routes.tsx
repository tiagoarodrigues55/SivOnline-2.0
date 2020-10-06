import {Route, BrowserRouter} from 'react-router-dom'
import DelegatePage from './pages/delegate/Layout/index'
import ModeratorPage from './pages/moderator/Layout/index'
import NewspaperPage from './pages/newspaper/Layout/index'
import Login from './pages/login/index'
import React from 'react'

const Routes = () =>{
 

  return (
    <BrowserRouter>
    <Route exact component={DelegatePage} path="/Delegate"/>
    <Route exact component={ModeratorPage} path="/Moderator"/>
    <Route exact component={NewspaperPage} path="/Newspaper"/>
    <Route exact component={Login} path="/Login"/>
    </BrowserRouter>

  )
  

}
export default Routes
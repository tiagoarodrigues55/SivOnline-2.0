import {Route, BrowserRouter} from 'react-router-dom'
import DelegatePage from './pages/delegate/Layout/index'
import PanopticPage from './pages/panoptic/Layout/index'
import StaffPage from './pages/staff/Layout/index'
import ModeratorPage from './pages/moderator/Layout/index'
import NewspaperPage from './pages/newspaper/Layout/index'
import NewspaperBossPage from './pages/newspaperBoss/Layout/index'
import InterventionPage from './pages/intervention/Layout/index'
import Login from './pages/login/index'
import React from 'react'


const Routes = () =>{

  return (
    <BrowserRouter>
    <Route exact component={StaffPage} path="/Staff"/>
    <Route exact component={PanopticPage} path="/Panoptic"/>
    <Route exact component={DelegatePage} path="/Delegate"/>
    <Route exact component={ModeratorPage} path="/Moderator"/>
    <Route exact component={NewspaperPage} path="/Newspaper"/>
    <Route exact component={NewspaperBossPage} path="/NewspaperBoss"/>
    <Route exact component={Login} path="/Login"/>
    <Route exact component={InterventionPage} path="/Intervention"/>
    </BrowserRouter>

  )
  
}
export default Routes
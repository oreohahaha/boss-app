import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './views/login';
import Register from './views/register';
import AuthRoute from './component/authroute';
import BossInfo from './views/bossinfo';
import GeniusInfo from './views/geniusinfo';
import DashBoard from "./views/dashboard";

function Boss() {
  return <h1>Boss</h1>
}

function Genius() {
  return <button>Genius</button>
}

function Msg() {
  return <h1>Msg</h1>
}
function User() {
  return <h1>User</h1>
}


class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <AuthRoute/>
            <Switch>
              <Route path={'/login'} component={Login}/>
              <Route path={'/register'} component={Register}/>
              <Route path={'/bossinfo'} component={BossInfo}/>
              <Route path={'/geniusinfo'} component={GeniusInfo}/>
              <Route path={'/'} render={() => {
                return (
                  <DashBoard>
                    <Switch>
                      <Route path={'/boss'} component={Boss} />
                      <Route path={'/genius'} component={Genius} />
                      <Route path={'/me'} component={User} />
                      <Route path={'/message'} component={Msg} />
                    </Switch>
                  </DashBoard>
                )
              }} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;

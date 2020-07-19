import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import ListMessage from './containers/ListMessage/ListMessage';
import PostMessage from './containers/PostMessage/PostMessage';
import Logout from './containers/Auth/Logout/Logout'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Auth} />
        <Route path="/logout" component={Logout} />
        <Route path="/listmessage" component={ListMessage} />
        <Route path="/postmessage" component={PostMessage} />
      </Switch>
    </Router>
  );
}

export default App;

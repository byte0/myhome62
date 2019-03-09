import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';
import 'semantic-ui-css/semantic.min.css'

import Login from './login';
import Main from './module/main';
import AuthCheck from './auth';

function Info() {
  return <div>Info</div>;
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Main}/>
          <AuthCheck path='/abc' component={Info}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

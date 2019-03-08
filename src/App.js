import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './App.css';

function Login() {
  return <div>Login</div>;
}

function Main() {
  return <div>Main</div>;
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Main}/>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

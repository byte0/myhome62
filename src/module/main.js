// 整体布局
import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Route, Link, Switch } from "react-router-dom";

import './main.css';

class Main extends React.Component {
  render() {
    return (
      <div className='home-container'>
        <div className="home-content">
          <Switch>
            <Route path='/home/main' render={()=><div>home</div>}/>
            <Route path='/home/info' render={()=><div>info</div>}/>
            <Route path='/home/chat' render={()=><div>chat</div>}/>
            <Route path='/home/my' render={()=><div>my</div>}/>
          </Switch>
        </div>
        <div className="home-menu">
          <Grid columns={4} divided>
            <Grid.Row>
              <Grid.Column>
                <Link to='/home/main'>
                  <div className="placeholder">
                    <i className='iconfont icon-all'></i>
                    <div>菜单</div>
                  </div>
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Link to='/home/info'>
                  <div className="placeholder">
                    <i className='iconfont icon-all'></i>
                    <div>菜单</div>
                  </div>
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Link to='/home/chat'>
                  <div className="placeholder">
                    <i className='iconfont icon-all'></i>
                    <div>菜单</div>
                  </div>
                </Link>
              </Grid.Column>
              <Grid.Column>
                <Link to='/home/my'>
                  <div className="placeholder">
                    <i className='iconfont icon-all'></i>
                    <div>菜单</div>
                  </div>
                </Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    );
  }
}

export default Main;

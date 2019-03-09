import React from 'react';
import { Input } from 'semantic-ui-react'
import './index.css';

class Main extends React.Component {
  render() {
    return (
      <div className='main-container'>
        <div className="main-searchbar">
          <Input fluid icon='search' placeholder='请输入搜索内容...' />
        </div>

      </div>
    );
  }
}

export default Main;
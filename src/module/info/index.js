import React from 'react';
import { Tab } from 'semantic-ui-react';
import './index.css';

class Info extends React.Component {
  render() {
    const panes = [
      { menuItem: '资讯', render: () => <Tab.Pane>资讯</Tab.Pane>},
      { menuItem: '头条', render: () => <Tab.Pane>头条</Tab.Pane>},
      { menuItem: '问答', render: () => <Tab.Pane>问答</Tab.Pane>}
    ];
    return (
      <div className='find-container'>
        <div className="find-topbar">资讯</div>
        <div className="find-content">
          <Tab panes={panes}/>
        </div>
      </div>
    );
  }
}

export default Info;
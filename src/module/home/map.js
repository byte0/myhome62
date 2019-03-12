import React from 'react';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Mymap extends React.Component {
  handle = () => {
    // 回退路由：主页
    let {history} = this.props;
    history.goBack();
  }
  render() {
    return (
      <div className = 'map-house' >
        <div className = "map-house-title">
          <Icon onClick={this.handle} name = 'angle left' size = 'large'/> 地图找房 
        </div> 
        <div className = "map-house-content" id='allmap'></div>
      </div>
    );
  }
}

export default withRouter(Mymap);
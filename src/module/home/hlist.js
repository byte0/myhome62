import React from 'react';
import { Icon,Item } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Hlist extends React.Component {

  handle = () => {
    // 回退到原来位置：主页
    let {history} = this.props;
    // 向前回退一步
    history.goBack();
  }

  render() {
    let query = this.props.location.state.query;
    return (
      <div className = 'house-list'>
        <div className = "house-list-title">
          <Icon onClick={this.handle} name = 'angle left' size = 'large'/>
          {query.mname}
        </div> 
        <div className = "house-list-content">
          <Item.Group divided unstackable>
            列表
          </Item.Group>
        </div>
      </div>
    );
  }
}

export default withRouter(Hlist);

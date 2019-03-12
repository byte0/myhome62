import React from 'react';
import { Icon,Item } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import cfg from '../../common';

class Hlist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: []
    }
  }
  handle = () => {
    // 回退到原来位置：主页
    let {history} = this.props;
    // 向前回退一步
    history.goBack();
  }

  componentWillUnmount() {
    // 回收一些资源
    console.log('out')
  }

  componentDidMount = async () => {
    // 调用后台接口获取列表数据
    let type = this.props.location.state.query.type;
    let ret = await axios.post('homes/list', {
      home_type: type
    });
    this.setState({
      listData: ret.data.data
    });
  }

  render() {
    let query = this.props.location.state.query;
    let listContent = this.state.listData.map(item=>{
      return (
        <Item key={item.id}>
          <Item.Image src={cfg.baseURL+'public/home.png'}/>
          <Item.Content>
            <Item.Header>{item.home_name}</Item.Header>
            <Item.Meta>
              <span className='cinema'>{item.home_desc}</span>
            </Item.Meta>
            <Item.Description>
              {item.home_tags}
            </Item.Description>
            <Item.Description>{item.home_price}</Item.Description>
          </Item.Content>
        </Item>
      );
    });
    return (
      <div className = 'house-list'>
        <div className = "house-list-title">
          <Icon onClick={this.handle} name = 'angle left' size = 'large'/>
          {query.mname}
        </div> 
        <div className = "house-list-content">
          <Item.Group divided unstackable>
            {listContent}
          </Item.Group>
        </div>
      </div>
    );
  }
}

export default withRouter(Hlist);

import React from 'react';
import { Input, Grid, Icon } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css';
import axios from 'axios';

// 菜单组件
function Menu(props) {
  let {menuData} = props;
  let menuContent = menuData.map(item=>{
    return (
      <Grid.Column key={item.id}>
        <div className='home-menu-item'>
          <Icon name='home' size='big' />
        </div>
        <div>{item.menu_name}</div>
      </Grid.Column>
    );
  });
  return (
    <Grid columns={4} divided>
      <Grid.Row>
        {menuContent}
      </Grid.Row>
    </Grid>
  );
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipe: [],
      menu: []
    }
  }


  loadData = (pathName, dataName) => {
    axios.post(pathName).then(res=>{
      this.setState({
        // ES6支持对象属性名是动态的
        [dataName]: res.data.data.list
      });
    });
  }

  componentDidMount() {
    // 调用接口加载轮播图数据
    this.loadData('/homes/swipe', 'swipe');
    // 调用接口加载菜单数据
    this.loadData('/homes/menu', 'menu');
    
  }

  render() {
    
    return (
      <div className='home-container'>
        <div className="home-topbar">
          <Input fluid icon='search' placeholder='请输入搜索内容...' />
        </div>
        <div className="home-content">
          {/*轮播图*/}
          <ImageGallery 
            showFullscreenButton={false}
            showPlayButton={false}
            showThumbnails={false}
            items={this.state.swipe} />
          {/*菜单*/}
          <div>
            <Menu menuData={this.state.menu}/>
          </div>

        </div>
      </div>
    );
  }
}

export default Main;
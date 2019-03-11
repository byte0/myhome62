import React from 'react';
import { Input } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css';
import axios from 'axios';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipe: []
    }
  }

  componentDidMount() {
    // 调用接口加载数据
    axios.post('homes/swipe').then(res=>{
      this.setState({
        swipe: res.data.data.list
      });
    });
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

            
        </div>
      </div>
    );
  }
}

export default Main;
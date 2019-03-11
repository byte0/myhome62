import React from 'react';
import { Input, Grid, Icon, Item, Button } from 'semantic-ui-react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import './index.css';
import axios from 'axios';
import cfg from '../../common';

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

// 资讯组件
function Info(props) {
  let {infoData} = props;
  let infoContent = infoData.map(item=>{
    return (
      <Item.Header key={item.id}>
        <span>限购 ●</span>
        <span>{item.info_title}</span>
      </Item.Header>
    );
  });
  return (
    <Item.Group unstackable>
      <Item className='home-msg-img' >
        <Item.Image size='tiny' src={cfg.baseURL + 'public/zixun.png'} />
        <Item.Content verticalAlign='top'>
          {infoContent}
          <div className="home-msg-more">
            <Icon name='angle right' size='big' />
          </div>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

// 问答组件
function Faq(props) {
  let {faqData} = props;
  let faqContent = faqData.map(item=>{
    // 把逗号分隔形式的字符串分隔成数组
    let arr = item.question_tag.split(',');
    // 根据数组的内容生成Button按钮
    let btns = arr.map((item,index)=>{
      return <Button key={index} basic color='green' size='mini'>{item}</Button>
    });
    return (
      <li key={item.question_id}>
        <div>
          <Icon name='question circle outline' />
          <span>{item.question_name}</span>
        </div>
        <div>
          {btns}
          <div>{item.atime} ● <Icon name='comment alternate outline' /> {item.qnum}</div>
        </div>
      </li>
    );
  });
  return (
    <div className='home-ask'>
      <div className='home-ask-title'>好客问答</div>
      <ul>
        {faqContent}
      </ul>
    </div>
  ); 
}

// 房源组件
function House(props) {
  let {houseData} = props;
  let newHouse = [];
  let oldHouse = [];
  let hireHouse = [];
  houseData.forEach(item=>{
    let houseItem = (
      <Item key={item.id}>
        <Item.Image src={cfg.baseURL+'public/home.png'}/>
        <Item.Content>
          <Item.Header>{item.home_name}</Item.Header>
          <Item.Meta>
            <span className='cinema'>{item.home_desc}</span>
          </Item.Meta>
          <Item.Description>
            {item.home_tags.split(',').map((tag,index)=>{return <Button key={index} basic color='green' size='mini'>{tag}</Button>})}
          </Item.Description>
          <Item.Description>{item.home_price}</Item.Description>
        </Item.Content>
      </Item>
    );
    // 根据home_type进行分类：1、表示新房；2、表示二手房；3、表示租房
    if(item.home_type === 1) {
      // 新房
      newHouse.push(houseItem);
    }else if(item.home_type === 2) {
      // 二手房
      oldHouse.push(houseItem);
    }else{
      // 租房
      hireHouse.push(houseItem);
    }
  });
  return (
    <div>
      <div>
        <div className='home-hire-title'>最新开盘</div>
        <Item.Group divided unstackable>
          {newHouse}
        </Item.Group>
      </div>
      <div>
        <div className='home-hire-title'>二手精选</div>
        <Item.Group divided unstackable>
          {oldHouse}
        </Item.Group>
      </div>
      <div>
        <div className='home-hire-title'>组一个家</div>
        <Item.Group divided unstackable>
          {hireHouse}
        </Item.Group>
      </div>
    </div>
  );
}

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      swipe: [],
      menu: [],
      info: [],
      faq: [],
      house: []
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
    // 调用接口加载资讯数据
    this.loadData('/homes/info', 'info');
    // 调用接口加载问答数据
    this.loadData('/homes/faq', 'faq');
    // 调用接口加载房源数据
    this.loadData('/homes/house', 'house');
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
          {/*资讯*/}
          <div className="home-msg">
            <Info infoData={this.state.info}/>
          </div>
          {/*问答*/}
          <div>
            <Faq faqData={this.state.faq}/>
          </div>
          {/*房源*/}
          <div>
            <House houseData={this.state.house}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
import React from 'react';
import './index.css';
import './chat.css';
import axios from 'axios';
import { Form, Icon, Button, TextArea } from 'semantic-ui-react';
import cfg from '../../common';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoData: []
    }
  }
  componentDidMount = async () => {
    let { from_user, to_user } = this.props.chatInfo;

    // 获取聊天信息列表
    let ret = await axios.post('chats/info', {
      from_user: from_user,
      to_user: to_user
    });
    this.setState({
      infoData: ret.data.data.list
    });
  }

  render() {
    let { username, from_user } = this.props.chatInfo;
    let { close } = this.props;
    let infoContent = this.state.infoData.map(item=>{
      // 控制聊天记录的样式
      let currentUser = parseInt(sessionStorage.getItem('uid'), 10);
      let cls = currentUser===item.from_user? 'chat-info-left':'chat-info-right';
      return (
        <li key={item.id} className={cls}>
          <img src={cfg.baseURL + item.avatar} alt=""/>
          <span>{item.chat_msg}</span>
        </li>
      )
    });
    return (
      <div className='chat-window'>
        <div className="chat-window-title">
          <Icon onClick={close} name='angle left' className='chat-ret-btn' size='large'/>
          <span>{username}</span>
        </div>
        <div className="chat-window-content">
          <ul>
            {infoContent}
          </ul>
        </div>
        <div className="chat-window-input">
          <Form>
            <TextArea placeholder='请输入内容...' />
            <Button >关闭</Button>
            <Button primary >发送</Button>
          </Form>
        </div>
      </div>
    );
  }
}

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      openFlag: false,  // 控制聊天窗口的显示和隐藏
      chatInfo: {}
    }
  }

  componentDidMount = async () => {
    // 调用接口
    let ret = await axios.post('chats/list');
    this.setState({
      listData: ret.data.data.list
    });
  }

  // 关闭聊天窗口
  closeChatWindow = () => {
    this.setState({
      openFlag: false
    });
  }
  
  // 打开聊天窗口
  showChatWindow = (item) => {
    this.setState({
      openFlag: true,
      chatInfo: {
        from_user: item.from_user,
        to_user: item.to_user,
        avatar: item.avatar,
        username: item.username
      }
    });
  }

  render() {
    let listContent = this.state.listData.map(item=>{
      return (
        <li key={item.id} onClick={this.showChatWindow.bind(this, item)}>
          <div className="avarter">
            <img src={item.avatar} alt="avarter"/>
            <span className="name">{item.username}</span>
            <span className="info">{item.chat_msg}</span>
            <span className="time">{item.ctime}</span>
          </div>
        </li>
      );
    });
    return (
      <div className='chat-container'>
        <div className="chat-title">聊天</div>
        <div className="chat-list">
          <ul>
            {listContent}
          </ul>
        </div>
        {this.state.openFlag && <ChatWindow close={this.closeChatWindow} chatInfo={this.state.chatInfo}/>}
      </div>
    );
  }
}

export default Chat;
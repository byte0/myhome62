import React from 'react';
import './index.css';
import './chat.css';
import axios from 'axios';
import { Form, Icon, Button, TextArea } from 'semantic-ui-react';
import cfg from '../../common';
// 导入Websocket通信相关文件
import handle, {IMEvent} from './wsclient';

class ChatWindow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      infoData: [],
      client: null,
      msgContent: ''
    }
  }

  // 接收服务器聊天数据
  receiveMsg = (data) => {
    if(data.content === '对方不在线') {
      // 对方没在线
      return ;
    }
    // 更新本地列表数据
    let arr = [...this.state.infoData];
    arr.push(JSON.parse(data.content));
    this.setState({
      infoData: arr
    });
  }

  // 发送聊天消息到服务器
  sendMsg = () => {
    let {to_user,from_user,avatar} = this.props.chatInfo;
    let {infoData, client, msgContent} = this.state;
    // 封装消息数据包
    let pdata = {
      id: Math.random() + '',
      from_user: from_user,
      to_user: to_user,
      avatar: avatar,
      chat_msg: msgContent
    }
    // 把数据发送出去
    client.emitEvent(IMEvent.MSG_TEXT_SEND,JSON.stringify(pdata));
    // 本地消息更新
    let arr = [...this.state.infoData];
    arr.push(pdata);
    this.setState({
      infoData: arr,
      msgContent: ''
    });
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

    /*
      1、当打开聊天窗口的时候，初始化聊天链接
      2、处理消息发送
      3、处理消息接收
    */
    let currentUserID = sessionStorage.getItem('uid');
    // wsclient表示Websocket对象，用于实现聊天
    let wsclient = handle(currentUserID, (data) => {
      // 参数data表示服务器返回的数据
      this.receiveMsg(data);
    });
    // 更新聊天客户端对象
    this.setState({
      client: wsclient
    });
  }

  handleMsgContent = (event) => {
    this.setState({
      msgContent: event.target.value
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
            <TextArea value={this.state.msgContent} onChange={this.handleMsgContent} placeholder='请输入内容...' />
            <Button >关闭</Button>
            <Button onClick={this.sendMsg} primary >发送</Button>
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
            <img src={cfg.baseURL + item.avatar} alt="avarter"/>
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
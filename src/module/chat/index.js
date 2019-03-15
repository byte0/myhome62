import React from 'react';
import './index.css';
import axios from 'axios';

class Chat extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      listData: []
    }
  }

  componentDidMount = async () => {
    // 调用接口
    let ret = await axios.post('chats/list');
    this.setState({
      listData: ret.data.data.list
    });
  }
  render() {
    let listContent = this.state.listData.map(item=>{
      return (
        <li key={item.id} >
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
      </div>
    );
  }
}

export default Chat;
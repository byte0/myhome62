const config = {
  wsBaseUrl: 'ws://47.96.21.88:8087'
};
// 消息数据包格式
class DataPacket {
  constructor(message) {
    // 消息格式转化为对象
    if(typeof(message) === "string"){
      try {
        this._data = JSON.parse(message);
      } catch (error) {
        this._data = undefined;
      }
    } else if(typeof(message) === "object"){
      this._data = message;
    }
  }

  get data() {
    return this._data
  }

  get content() {
    return this._data["content"]
  }

  get type() {
      return this._data["type"];
  }
  
  set type(type) {
      this._data["type"] = type;
  }

  get rawMessage() {
      return JSON.stringify(this._data);
  }
}

// 消息名称常量
const IMEvent = {
  CONNECTED: "connected",         // 已连接
  DISCONNECTED: "disconnected",   // 断开连接
  MSG_TEXT_SEND: "msg_text_send", // 发送消息
  MSG_TEXT_REC: "msg_text_rec",   // 接收消息
  USER_REG: "user_reg",           // 用户注册
}

// Websocket通信基础功能封装
class IMClient {
  constructor(url) {
    // Websocket连接地址
    this._url = url;
    // 自定义事件存储对象
    this._handlers = {};
    // 连接状态位
    this._isOpened = false;
    // socket实例对象
    this._socket = null;
    
    // 添加链接监听
    this.addEventListener(IMEvent.CONNECTED, () => {
      this._isOpened = true;
    })
    
    // 添加断开监听
    this.addEventListener(IMEvent.DISCONNECTED, () => {
      this._isOpened = false;
    })
  }

  // 连接
  connect() {
    if (!this._socket) {
      this._socket = new WebSocket(this._url);
      this._socket.onmessage = (evt) => {
        this.onMessage(evt.data);
      }
      this._socket.onopen = (ws) => {
        this.onOpen(ws);
      }
      this._socket.onclose = ws => {
        this.onClose(ws);
      }
      this._socket.onerror = ws => {
        this.onError(ws);
      };
    }
  }

  // 消息接收
  onMessage(message) {
    if (typeof message === "string") {
      this.dispatchMessage(message);
    }
  }

  // 打开回调
  onOpen() {
    this.emitEvent(IMEvent.CONNECTED);
  }

  // 关闭回调
  onClose() {
    this._socket = undefined;
    this.emitEvent(IMEvent.DISCONNECTED);
  }

  // 出现错误回调
  onError() {
    this._socket = undefined;
  }

  // 向服务器发送数据包
  sendDataPacket(dataPacket) {
    if (this._isOpened) {
      this._socket.send(dataPacket.rawMessage);
    } 
  }

  /**
   * 发射事件
   * @param {string} type 事件类型
   * @param {参数列表} args 传递事件参数
   */
  emitEvent(type, ...args) {
    if (this._handlers[type] && this._handlers[type].length > 0) {
      let handlers = this._handlers[type];
      for (var i = 0; i < handlers.length; i++) {
        handlers[i].call(this, ...args);
      }
    }
  }

  /**
   * 添加事件监听
   * @param {string} type 事件类型
   * @param {Function} callback 事件处理函数
   */
  addEventListener(type, handler) {
    if (!this._handlers[type]) {
      this._handlers[type] = [];
    }
    this._handlers[type].push(handler);
  }

  /**
   * 移除事件
   * @param {string} type 事件类型
   * @param {*} callback 
   */
  removeEventListener(type, handler) {
    if (this._handlers[type] && this._handlers[type].length > 0) {
      let handlers = this._handlers[type];
      for (var i = handlers.length - 1; i >= 0; i--) {
        if (handler === handlers[i]) {
          handlers.splice(i, 1);
        }
      }
    }
  }

  /**
   * 消息封装成数据包
   */
  dispatchMessage(message) {
    let dataPacket = new DataPacket(message);
    if (dataPacket.data) {
      this.dispatchDataPacket(dataPacket);
    }
  }

  /**
   * 处理数据包
   */
  dispatchDataPacket(dataPacket) {
    this.emitEvent(dataPacket.type, dataPacket);
  }
}

// 实际消息处理功能
const handle = (currentUser, handleMsg) => {
  // 创建Websocket客户端
  const client = new IMClient(config.wsBaseUrl);

  // 注册身份
  client.addEventListener(IMEvent.CONNECTED, () => {
    // 创建消息数据包
    let dataPacket = new DataPacket({
      type: IMEvent.USER_REG,
      content: currentUser
    })
    client.sendDataPacket(dataPacket)
  })
  
  // 发送消息
  client.addEventListener(IMEvent.MSG_TEXT_SEND, data => {
    // 创建消息数据包
    let dataPacket = new DataPacket({
      type: IMEvent.MSG_TEXT_SEND,
      content: data
    })
    client.sendDataPacket(dataPacket)
  })

  // 接收消息
  client.addEventListener(IMEvent.MSG_TEXT_REC, data => {
    handleMsg(data)
  })
  
  // 连接Websocket
  client.connect();
  return client;
}

export {IMEvent};
export default handle;

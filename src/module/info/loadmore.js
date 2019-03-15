import React from 'react';
import Tloader from 'react-touch-loader';
import { Item, Icon, Button, Modal, TextArea } from 'semantic-ui-react';
import './loadmore.css';
import axios from 'axios';

// 封装弹窗组件
class QuestionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: ''
    }
  }

  handleInfo = (event) => {
    this.setState({
      info: event.target.value
    });
  }

  submit = async () => {
    // 完成提交
    let ret = await axios.post('infos/question', {
      question: this.state.info
    });
    if(ret.data.meta.status !== 200) {
      // alert(ret.data.meta.msg);
      alert('服务器发生错误，请与管理员联系 daniu@qq.com');
    }
    // 隐藏弹窗
    this.props.close();
  }

  render() {
    // open是状态位：控制弹窗的显示或者隐藏
    // close是一个函数，隐藏弹窗的时候触发
    let { open, close } = this.props;
    return (
      <div>
        <Modal size='small' open={open} onClose={close}>
          <Modal.Header>发表评论</Modal.Header>
          <Modal.Content>
            <TextArea value={this.state.info} onChange={this.handleInfo} style={{width:'100%'}} placeholder='Tell us more' />
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={close}>取消</Button>
            <Button positive onClick={this.submit} icon='checkmark' labelPosition='right' content='发表' />
          </Modal.Actions>
        </Modal>
      </div>
    );
  }

}

class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,   // 是否还有更多数据
      initializing: 1, // 开始进度条
      pagenum: 0,      // 开始的记录条数
      pagesize: 2,     // 每次加载条数
      listData: [],    // 列表数据
      total: 0,        // 列表总长度
      openFlag: false, // 控制弹窗显示或者隐藏
    }
  }

  // 关闭弹窗
  closeWindow = () => {
    this.setState({
      openFlag: false
    });
  }

  // 显示弹窗
  showWindow = () => {
    this.setState({
      openFlag: true
    });
  }
  
  // 通用列表加载方法封装
  loadData = async (flag) => {
    let {param} = this.props;
    let {pagenum, pagesize} = this.state;
    // 加载数据列表
    let ret = await axios.post('infos/list', {
      type: param.type,
      pagenum: pagenum,
      pagesize: pagesize
    });

    let arr = [...this.state.listData];
    // 判断是刷新还是加载更多
    if(flag === 1) {
      // 刷新:覆盖原来的
      arr = [...ret.data.data.list.data];
    }else{
      // 加载更多：在原来的基础上添加
      arr.push(...ret.data.data.list.data);
    }
    // 更新数据
    this.setState({
      listData: arr,
      total: ret.data.data.list.total,
      initializing: 2
    });
  }

  componentDidMount = async () => {
    this.loadData(1);
  }

  // 实现刷新操作：本质上就是把pagenum重置为0，然后刷新数据
  refresh = (resolve) => {
    console.log('refresh')
    this.setState({
      pagenum: 0
    }, () => {
      // 刷新列表,必须在回调函数中进行
      this.loadData(1);
    });
    // 必须显示的调用resolve，表示任务完成
    resolve();
  }

  // 实现加载更多操作:就是每次加载，要累加pagenum，并且每次加载要更新listData;还要处理hasMore判断是否还有更多数据
  loadMore = (resolve) => {
    console.log('loadMore')
    let pn = this.state.pagenum + this.state.pagesize;
    this.setState({
      pagenum: pn,
      hasMore: pn < this.state.total
    }, () => {
      // 重新加载列表
      this.loadData(2);
    });
    // 必须显示的调用resolve，表示任务完成
    resolve();
  }

  // 生成列表内容
  produceList = (type) => {
    let listContent = [];
    this.state.listData.forEach(item=>{
      let itemInfo = null;
      if(type === 1 || type === 2) {
        itemInfo = (
          <Item key={item.id}>
            <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png' />
            <Item.Content verticalAlign='middle'>
              <Item.Header className='info-title'>{item.info_title}</Item.Header>
              <Item.Meta>
                <span className='price'>$1200</span>
                <span className='stay'>1 Month</span>
              </Item.Meta>
            </Item.Content>
          </Item>
        );
      }else if(type === 3) {
        // 问答模块
        itemInfo = (
          <li key={item.id}>
            <div className='title'>
              <span className='cate'>
                <Icon color='green' name='users' size='small' />
                思维
              </span>
              <span>
                {item.question_name}
              </span>
            </div>
            {item.answer_content&&(
              <div className='user'>
                <Icon circular name='users' size='mini'/>
                {item.username} 的回答
              </div>
            )}
            <div className="info">
              {item.answer_content}
            </div>
            <div className="tag">
              {item.question_tag&&item.question_tag.split(',').map((tag,index)=>{return <span key={index}>{tag}X</span>})}
              <span>{item.qnum?item.qnum:0}个回答</span>
            </div>
          </li>
        );
      }
      listContent.push(itemInfo);
    });
    // 包装一下列表模板
    if(type === 1 || type === 2) {
      return (
        <Item.Group unstackable>
          {listContent}
        </Item.Group>
      );
    } else {
      return (
        <div>
          <QuestionModal open={this.state.openFlag} close={this.closeWindow}/>
          <div className='info-ask-btn'>
            <Button onClick={this.showWindow} fluid color='green'>快速提问</Button>
          </div>
          <ul className='info-ask-list'>{listContent}</ul>
        </div>
      );
    }
  }

  render() {
    let { hasMore, initializing } = this.state;
    let { param } = this.props;
    return (
      <div className="view">
        <Tloader className="main"
          onRefresh={this.refresh}
          onLoadMore={this.loadMore}
          hasMore={hasMore}
          initializing={initializing}>
          <ul>
            {this.produceList(param.type)}
          </ul>
        </Tloader>
      </div>
    );
  }
}

export default LoadMore;

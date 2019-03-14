import React from 'react';
import Tloader from 'react-touch-loader';
import { Item } from 'semantic-ui-react';
import './loadmore.css';
import axios from 'axios';

class LoadMore extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true,   // 是否还有更多数据
      initializing: 1, // 开始进度条
      pagenum: 0,      // 开始的记录条数
      pagesize: 2,     // 每次加载条数
      listData: [],    // 列表数据
      total: 0         // 列表总长度
    }
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
      }
      listContent.push(itemInfo);
    });
    return listContent;
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
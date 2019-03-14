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

  componentDidMount = async () => {
    let {param} = this.props;
    let {pagenum, pagesize} = this.state;
    // 加载数据列表
    let ret = await axios.post('infos/list', {
      type: param.type,
      pagenum: pagenum,
      pagesize: pagesize
    });
    // 更新数据
    this.setState({
      listData: ret.data.data.list.data,
      total: ret.data.data.list.total,
      initializing: 2
    });
  }

  // 实现刷新操作
  refresh = (resolve) => {
    console.log('refresh')
    resolve();
  }

  // 实现加载更多操作
  loadMore = (resolve) => {
    console.log('loadMore')
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

import React from 'react';
import { Tab, Item } from 'semantic-ui-react';
import './index.css';
import axios from 'axios';
import LoadMore from './loadmore';

// class InfoContent extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       infoData: [],
//       pagenum: 0,
//       pagesize: 2,
//       type: 1
//     }
//   }
//   componentDidMount = async () => {
//     // 加载数据
//     let ret = await axios.post('infos/list', {
//       pagenum: this.state.pagenum,
//       pagesize: this.state.pagesize,
//       type: this.state.type
//     });
//     this.setState({
//       infoData: ret.data.data.list.data
//     });
//   }
//   render() {
//     let infoContent = this.state.infoData.map(item=>{
//       return (
//         <Item key={item.id}>
//           <Item.Image size='small' src='http://47.96.21.88:8086/public/1.png' />
//           <Item.Content verticalAlign='middle'>
//             <Item.Header className='info-title'>{item.info_title}</Item.Header>
//             <Item.Meta>
//               <span className='price'>$1200</span>
//               <span className='stay'>1 Month</span>
//             </Item.Meta>
//           </Item.Content>
//         </Item>
//       );
//     });
//     return (
//       <div>
//         {infoContent}
//       </div>
//     );
//   }
// }

function InfoContent() {
  let param = {
    type: 1
  };
  return <LoadMore param={param}/>;
}
function TopContent() {
  let param = {
    type: 2
  };
  return <LoadMore param={param}/>;
}
function FaqContent() {
  let param = {
    type: 3
  };
  return <LoadMore param={param}/>;
}
// class TopContent extends React.Component {
//   render() {
//     return (
//       <div>
//         头条内容
//       </div>
//     );
//   }
// }

// class FaqContent extends React.Component {
//   render() {
//     return (
//       <div>
//         问答内容
//       </div>
//     );
//   }
// }

class Info extends React.Component {
  render() {
    const panes = [
      { menuItem: '资讯', render: () => <Tab.Pane><InfoContent/></Tab.Pane>},
      { menuItem: '头条', render: () => <Tab.Pane><TopContent/></Tab.Pane>},
      { menuItem: '问答', render: () => <Tab.Pane><FaqContent/></Tab.Pane>}
    ];
    return (
      <div className='find-container'>
        <div className="find-topbar">资讯</div>
        <div className="find-content">
          <Tab panes={panes}/>
        </div>
      </div>
    );
  }
}

export default Info;
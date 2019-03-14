import React from 'react';
import { Icon } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

class Mymap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      xy: [{
        'x': 116.43244,
        'y': 39.929986
      }, {
        'x': 116.424355,
        'y': 39.92982
      }, {
        'x': 116.423349,
        'y': 39.935214
      }, {
        'x': 116.350444,
        'y': 39.931645
      }, {
        'x': 116.351684,
        'y': 39.91867
      }, {
        'x': 116.353983,
        'y': 39.913855
      }, {
        'x': 116.357253,
        'y': 39.923152
      }, {
        'x': 116.349168,
        'y': 39.923152
      }, {
        'x': 116.354954,
        'y': 39.935767
      }, {
        'x': 116.36232,
        'y': 39.938339
      }, {
        'x': 116.374249,
        'y': 39.94625
      }, {
        'x': 116.380178,
        'y': 39.953053
      }]
    }
  }

  handle = () => {
    // 回退路由：主页
    let {history} = this.props;
    history.goBack();
  }

  initMap = () => {
    // 百度地图API功能
    // 全局作用域中的成员要通过window进行访问
    let BMap = window.BMap;
    // 创建Map实例
    let map = new BMap.Map("allmap"); 
    // 初始化地图,设置中心点坐标和地图缩放级别   
    map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
    // 添加地图类型控件
    // map.addControl(new BMap.MapTypeControl({
    //   mapTypes:[
    //     window.BMAP_NORMAL_MAP,
    //     window.BMAP_HYBRID_MAP
    //   ]}));   
    // 设置地图显示的城市 此项是必须设置的
    // map.setCurrentCity("上海");    
    // map.centerAndZoom("北京",15);      
    // 开启鼠标滚轮缩放    
    // map.enableScrollWheelZoom(true); 

    // var point = new BMap.Point(116.404, 39.915);
    // map.centerAndZoom(point, 15);
    // var marker = new BMap.Marker(point);  // 创建标注
    // map.addOverlay(marker);               // 将标注添加到地图中
    // marker.setAnimation(window.BMAP_ANIMATION_BOUNCE); //跳动的动画

    // -----------------------------------
    // let MAX = 10;
    let markers = [];
    let pt = null;
    // let i = 0;
    // for (; i < MAX; i++) {
    //    pt = new BMap.Point(Math.random() * 40 + 85, Math.random() * 30 + 21);
    //    markers.push(new BMap.Marker(pt));
    // }
    let xy = this.state.xy;
    for (let i in xy) {
      // 单个点坐标
      pt = new BMap.Point(xy[i].x, xy[i].y);
      markers.push(new BMap.Marker(pt));
    }
    //最简单的用法，生成一个marker数组，然后调用markerClusterer类即可。
    // new window.BMapLib.MarkerClusterer(map, {markers:markers});
    new window.BMapLib.MarkerClusterer(map, {markers: markers,
      girdSize: 100,
      styles: [{
        background: 'rgba(12,181,106,0.9)',
        size: new BMap.Size(92, 92),
        textSize: '16',
        textColor: '#fff',
        borderRadius: 'true'
      }],
    });
  }

  componentDidMount() {
    this.initMap();
  }

  render() {
    return (
      <div className = 'map-house' >
        <div className = "map-house-title">
          <Icon onClick={this.handle} name = 'angle left' size = 'large'/> 地图找房 
        </div> 
        <div className = "map-house-content" id='allmap'></div>
      </div>
    );
  }
}

export default withRouter(Mymap);
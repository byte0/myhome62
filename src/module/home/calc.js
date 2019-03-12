import React from 'react';
import { Icon, Tab, Grid, Dropdown, Input, Button } from 'semantic-ui-react';
import ReactEcharts from 'echarts-for-react';

// 自定义组件，实现图表效果
class Mychart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {value:335, name:'贷款总额'},
        {value:310, name:'支付利息'}
      ]
    }
  }
  getOption = () => {
    // 这里产生一个option对象，该对象实际上就是echarts中的option
    let option = {
      title : {
        text: '贷款数据统计',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: "{c}"
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['贷款总额','支付利息']
      },
      series : [{
        name: '访问来源',
        type: 'pie',
        radius : '55%',
        center: ['50%', '60%'],
        data: this.state.data,
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    return option;
  }

  calculate = () => {
    // 修改图表数据:图表数据的变化并不会引起图表的效果刷新
    // 必须显示的调用echarts实例对象的setOption方法触发图表刷新
    let arr = [...this.state.data];
    arr[0].value = 1000;
    this.setState({
      data: arr
    }, ()=>{
      // 触发echarts图表的更新
      let opt = this.getOption();
      // chartRef表示组件的实例对象（非受控组件的用法）
      // getEchartsInstance() 用于获取echarts实例对象
      // echarts.setOption() 用于实现图表效果的刷新
      this.chartRef.getEchartsInstance().setOption(opt);
    });
  }

  render() {
    return (
      <div>
        <Grid.Row>
          <Grid.Column width={16}>
            <Button onClick={this.calculate} fluid color='green'>计算</Button>
          </Grid.Column>
        </Grid.Row>
        <ReactEcharts
          ref={(e) => { this.chartRef = e; }}
          option={this.getOption()}/>
      </div>
    );
  }
}

class First extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      total: 0,
      type: '',
      year: 0,
      rate: ''
    }
  }

  handleTotal = (event) => {
    this.setState({
      total: event.target.value
    });
  }

  calculate = () => {
    // 获取表单的值
    console.log(this.state.total)
    console.log(this.state.type)
    console.log(this.state.rate)
    console.log(this.state.year)
  }

  // handleChange = (e, { value }) => this.setState({ value })
  handleType = (e, {value}) => {
    // 这里value值的获取方式是semantic-ui特有的方式
    // 与传统方式不同
    this.setState({
      type: value
    });
  }

  handleYear = (e, {value}) => {
    this.setState({
      year: value
    });
  }

  handleRate = (e, {value}) => {
    this.setState({
      rate: value
    });
  }

  render() {
    // 付款方式下拉选项数据
    const types = [
      { key: '1', text: '按房价总额', value: '1' },
      { key: '2', text: '按贷款总额', value: '2' },
    ];
    // 贷款年限下拉选项数据
    const generateYears = (n) => {
      const years = [];
      for(let i=1;i<=n;i++) {
        years.push({
          key: i,
          text: i,
          value: i
        });
      }
      return years;
    }
    // 贷款利率下拉选项数据
    const rates = [
      {key: 1,text: '基准利率(3.25%)',value: 1},
      {key: 2,text: '基准利率9.5折',value: 2},
      {key: 3,text: '基准利率9折',value: 3},
      {key: 4,text: '基准利率8.5折',value: 4}
    ]
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款方式
          </Grid.Column>
          <Grid.Column width={10}>
            <Dropdown value={this.state.type} onChange={this.handleType} fluid selection options={types}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款总额
          </Grid.Column>
          <Grid.Column width={10}>
            <Input value={this.state.total} onChange={this.handleTotal} fluid placeholder='总额...'/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款年限
          </Grid.Column>
          <Grid.Column width={10}>
            <Dropdown value={this.state.year} onChange={this.handleYear} fluid selection options={generateYears(25)}/>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={6}>
            贷款利率
          </Grid.Column>
          <Grid.Column width={10}>
            <Dropdown value={this.state.rate} onChange={this.handleRate}  fluid selection options={rates}/>
          </Grid.Column>
        </Grid.Row>
        <div className="calc-chart">
          <Mychart/>
        </div>
      </Grid>
    );
  }
}

class Calc extends React.Component {
  render() {
    const panes = [
      { menuItem: '公积金贷款', render: () => <Tab.Pane><First/></Tab.Pane> },
      { menuItem: '商业贷款', render: () => <Tab.Pane>商业贷款</Tab.Pane> },
      { menuItem: '组合贷款', render: () => <Tab.Pane>组合贷款</Tab.Pane> },
    ]
    return (
      <div className='home-calc'>
        <div className = "home-calc-title">
          <Icon name = 'angle left' size = 'large'/>贷款利率计算 
        </div> 
        <div className = "map-calc-content">
          <Tab panes={panes}/>
        </div>
      </div>
    );
  }
}

export default Calc;
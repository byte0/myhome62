// 登录页
import React from 'react';
import { Form, Icon, Button, Divider } from 'semantic-ui-react';
import { withRouter } from "react-router-dom";
import axios from 'axios';
import './login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  handleUsername = (event) => {
    this.setState({
      username: event.target.value
    });
  }
  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    });
  }
  submit = async () => {
    // 获取表单数据
    // 调用后台接口进行身份验证 http://47.96.21.88:8086/users/login
    // 验证通过后，后台会返回token信息
    // 客户端接收到token然后存储到sessionStorage中
    // 跳转到主页面
    // console.log(this.state.username)
    // console.log(this.state.password)
    let ret = await axios.post('users/login', {
      uname: this.state.username,
      pwd: this.state.password
    });
    // 存储token
    sessionStorage.setItem('mytoken', ret.data.data.token);
    sessionStorage.setItem('uid', ret.data.data.uid);
    // 获取history对象
    let {history} = this.props;
    // 跳转到主页
    history.push('/home');
  }
  render() {
    return (
      <div className='login-container'>
        <div className="login-logo">
          <Icon name='home' size='huge' />
        </div>
        <div className="login-form">
          <Form>
            <Form.Input 
              icon='user' 
              required 
              size='big' 
              iconPosition='left' 
              name='username'
              value={this.state.username}
              onChange={this.handleUsername}
              placeholder='请输入用户名...' 
            />
            <Form.Input 
              icon='user' 
              required 
              size='big' 
              iconPosition='left' 
              name='password'
              value={this.state.password}
              onChange={this.handlePassword}
              placeholder='请输入密码...' 
            />
            <Button onClick={this.submit} fluid color='green'>登录</Button>
            <Divider horizontal>---</Divider>
          </Form>
        </div>
        <div className="login-third">
          <Icon name='rocketchat' size='big' />
          <Icon name='qq' size='big' />
        </div>
      </div>
    );
  }
}

export default withRouter(Login);

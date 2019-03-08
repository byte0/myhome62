// 登录页
import React from 'react';
import { Form, Icon, Button, Divider } from 'semantic-ui-react';
import './login.css';

class Login extends React.Component {
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
              placeholder='请输入用户名...' 
            />
            <Form.Input 
              icon='user' 
              required 
              size='big' 
              iconPosition='left' 
              name='username'
              placeholder='请输入密码...' 
            />
            <Button fluid color='green'>登录</Button>
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

export default Login;

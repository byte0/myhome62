import React from 'react';
import { Route, Redirect } from "react-router-dom";
// 权限验证
function AuthCheck(props) {
  let { path, component: Component } = props;
  // 判断用户是否登录:true表示已经登录；false表示没有登录
  let isLogin = sessionStorage.getItem('mytoken')?true: false;
  return (
    <Route path={path} render={()=>{
      // 这个位置可以进行权限验证
      // 如果登录了就正常显示要访问组件，否则重定向到登录页
      let com = isLogin? <Component/>: <Redirect to='/'/>
      return com;
    }}/>
  );
}

export default AuthCheck;
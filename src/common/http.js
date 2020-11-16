import Vue from 'vue'

import axios from 'axios';
import { Message } from "element-ui";
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  // console.log(config);
  // 请求拦截器
  const userInfo = JSON.parse(sessionStorage.getItem('userinfo') || '{}')
  config.headers.authorization=userInfo.token
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截器
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
// 判断状态码, 如果config.data.code!=200, 说明登录超时, 需要重新登录
if(response.data.code!=200){
  Message({
    type:'error',
    message:response.data.msg
  })
  // 重定向到login 
  // 错误的做法: this.$router.push(); 此处没有$router对象
  location.href='#/login'
}

  return response.data;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});


Vue.prototype.$axios = axios;

export default axios
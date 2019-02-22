import axios from "axios";
import qs from 'qs'
import router from '../router'
import {
  Message
} from 'element-ui';

const root = process.env.API_ROOT

const Axios = axios.create({
  baseURL: root, // 真实接口
  timeout: 10000,
  responseType: "json",
  withCredentials: true, // 是否允许带cookie这些
  // headers: {
  //   "Content-Type": "application/x-www-form-urlencoded",
  // },
});

// 添加请求拦截器
Axios.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    if (config.method == 'post' && config.headers['Form-Data'] == '0' ) {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
Axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    let code = response.data.code
    if(code == 0){ // 响应成功
      return response.data;
    }
    if(code == 1){ //登录失效
      setTimeout(() => {
        router.push('/login')
      }, 1500);
      return Promise.reject(response.data)
    }
    if(code == 2){ // 响应错误
      return Promise.reject(response.data)
    }
  },
  error => {
    // 对响应错误做点什么
    return Promise.reject(error);
  });


export default Axios

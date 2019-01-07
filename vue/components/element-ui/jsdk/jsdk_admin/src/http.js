import axios from 'axios'
import { Message, Loading } from 'element-ui'
import router from './router'

let loading;        //定义loading变量

//开始加载动画
function startLoading() {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,  //是否锁定
        text: '拼命加载中...',
        background: 'rgba(0, 0, 0, 0.7)'
    })
}

//结束加载动画
function endLoading() {    //使用Element loading-close 方法
    loading.close();
}

//请求拦截  设置统一header
axios.interceptors.request.use(config => {
    // 加载
    startLoading();

    console.log(response.data.code);

    //设置统一请求头
    config.headers.Authorization = localStorage.code;

    return config
}, error => {
    return Promise.reject(error)
});

//响应拦截
axios.interceptors.response.use(response => {
    endLoading();

    console.log(response.data.code);

    if (response.data.code == -1){
        localStorage.removeItem('code')
    }

    return response
}, error => {
    endLoading();

    Message.error(error.response.data);  // 错误提醒

    const { status } = error.response;
    if (status === 401) {  //失效
        Message.error("登陆失效，请重新登陆");  // 错误提醒

        localStorage.removeItem('code')

        // 页面跳转
        router.push('/login')
    }

    return Promise.reject(error)
});

export default axios;
import axios from 'axios'

// const root = 'http://api8084.ximuok.com/admin/';
// const root = 'http://10.10.10.238:8090/admin/';
const root = 'dc-api.9m3j.cn/admin/';

const Axios = axios.create({
    baseURL: root, // api
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    // },
});

export default Axios;
import axios from 'axios'

const root = 'http://api8084.ximuok.com/admin/';

const Axios = axios.create({
    baseURL: root, // api
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    },
});

export default Axios;
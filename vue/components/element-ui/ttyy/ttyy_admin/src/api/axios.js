import axios from 'axios'

const root = 'http://10.10.10.238:8089/admin/';

const Axios = axios.create({
    baseURL: root, // api
    timeout: 10000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
});

export default Axios;
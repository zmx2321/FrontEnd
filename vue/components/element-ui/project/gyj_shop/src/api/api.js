/**
 *  用以请求接口数据
 */

import axios from './axios'

let base = "/admin";

/**
 * common
 */
// 上传图片
export const getImgURI = params => {
    return  axios({
        url: `${base}/upload/uploadImage`,
        method: 'post',
        data: params
    });
};

/**
 *  登录/注销/修改密码
 */
// 登录
export const Login = params => {
    return  axios({
        url: `${base}/user/login`,
        method: 'post',
        data: params
    });
};

// 获取用户
export const getUser = params => {
    return  axios({
        url: `${base}/user/get`,
        method: 'get',
        params: params
    });
};

// 注销
export const Logout = () => {
    return  axios({
        url: `${base}/user/logout`,
        method: 'post'
    });
};

// 修改密码
export const ModifyPassword = params => {
    return  axios({
        url: `${base}/user/modify`,
        method: 'post',
        data: params
    });
};
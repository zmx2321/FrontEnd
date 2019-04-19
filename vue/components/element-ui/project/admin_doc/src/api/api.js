/**
 *  用以请求接口数据
 */

import axios from './axios'

const base = "/admin"

/**
 * common
 */
// 上传图片
/*export const getImgURI = params => {
    return  axios({
        url: 'upload',
        method: 'post',
        data: params
    });
};*/

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

// 修改密码
export const ModifyPassword = params => {
    return  axios({
        url: `${base}/user/password/update`,
        method: 'post',
        data: params
    });
};

/**
 * 账号管理
 */
// 获取账号列表
export const getAccount = params => {
    return  axios({
        url: `${base}/user/list`,
        method: 'get',
        params: params
    });
};

// 添加账号
export const addUser = params => {
    return  axios({
        url: `${base}/user/add`,
        method: 'post',
        data: params
    });
};

// 查看账号
export const checkUser = params => {
    return  axios({
        url: `${base}/user/get`,
        method: 'get',
        params: params
    });
};

// 编辑价格和流量
export const editUserAttribute = params => {
    return  axios({
        url: `${base}/user/modify`,
        method: 'post',
        data: params
    });
};

// 编辑密码
export const editUserAccount = params => {
    return  axios({
        url: `${base}/user/password/update/byadmin`,
        method: 'post',
        data: params
    });
};

// 启用账号
export const turnOn = params => {
    return  axios({
        url: `${base}/user/enable`,
        method: 'post',
        data: params
    });
};

// 禁用账号
export const turnOff = params => {
    return  axios({
        url: `${base}/user/disable`,
        method: 'post',
        data: params
    });
};

// 删除账号
export const delUser = params => {
    return  axios({
        url: `${base}/user/delete`,
        method: 'post',
        data: params
    });
};

/**
 * 用户管理
 */
// 获取用户列表
export const getUser = params => {
    return  axios({
        url: `/user/list`,
        method: 'get',
        params: params
    });
};

/**
 * 充值管理
 */
// 获取充值列表
export const getIncome = params => {
    return  axios({
        url: `/income/list`,
        method: 'get',
        params: params
    });
};

// 充值
export const addIncome = params => {
    return  axios({
        url: `/income/add`,
        method: 'post',
        data: params
    });
};
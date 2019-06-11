/**
 *  用以请求接口数据
 */

import axios from '../http'

/**
 * common
 */
// 测试
export const Test = () => {
    return  axios({
        url: 'api/users/test',
        method: 'get',
    });
};


/**
 *  注册/登录/修改密码
 */
// 注册
export const Register = params => {
    return  axios({
        url: 'api/users/register',
        method: 'post',
        data: params,
    });
};

// 登录
export const Login = params => {
    return  axios({
        url: 'api/users/login',
        method: 'post',
        data: params
    });
};

// 资金管理列表
export const getProfile = () => {
    return  axios({
        url: 'api/profiles',
        method: 'get',
    });
};

// 添加
export const addProfile = params => {
    return  axios({
        url: 'api/profiles/add',
        method: 'post',
        data: params
    });
};

// 编辑
export const editProfile = params => {
    return  axios({
        url: 'api/profiles/edit',
        method: 'post',
        data: params
    });
};

// 删除
export const delProfile = params => {
    return  axios({
        url: 'api/profiles/delete',
        method: 'post',
        data: params
    });
};


export const getUser = () => {
    return  axios({
        url: 'api/users/current',
        method: 'get',
    });
};
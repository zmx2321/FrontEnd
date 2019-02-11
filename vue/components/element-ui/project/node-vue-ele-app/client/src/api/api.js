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
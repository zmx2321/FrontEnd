/**
 *  用以请求接口数据
 */

import axios from './axios'

/**
 * common
 */
// 测试
export const Test = () => {
    return  axios({
        url: 'users/test',
        method: 'get',
    });
};


/**
 *  注册/登录/修改密码
 */
// 注册
export const Register = params => {
    return  axios({
        url: 'users/register',
        method: 'post',
        data: params,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
};

// 登录
// export const Login = params => {
//     return  axios({
//         url: 'account/login',
//         method: 'post',
//         data: params
//     });
// };
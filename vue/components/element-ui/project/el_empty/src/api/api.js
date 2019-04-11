/**
 *  用以请求接口数据
 */

import axios from './axios'

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
        url: 'user/login',
        method: 'post',
        data: params
    });
};

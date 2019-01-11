/**
 * 用以请求接口数据
 */

import axios from './axios'

/**
 * 登录/注销/个人信息
 */
// 登录
export const Login = params => {
    return  axios({
        url: 'account/login',
        method: 'post',
        data: params
    });
};

// 注销
export const Logout = () => {
    return  axios({
        url: 'account/logout',
        method: 'get',
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });
};

/**
 * 用户管理
 */
// 获取管理员和员工列表
export const findAccount = params => {
    return  axios({
        url: 'account/findAccount',
        method: 'post',
        data: params,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });
};


/**
 * banner管理
 */


/**
 * 兑换码管理
 */

//修改密码
// export const ModifyPassword = params => {
//     return axios({
//         url: 'user/modifyPassword',
//         method: 'post',
//         data: params
//     });
// };

//获取项目列表
// export const getProjectList = params => {
//     return  axios({
//         url: 'item/findList',
//         method: 'post',
//         data: params,
//         headers: {
//             "Content-Type": "application/json;charset=utf-8"
//         }
//     });
// };

//获取logo url
// export const getLogoUrl = params => {
//     return  axios({
//         url: 'item/upload',
//         method: 'post',
//         data: params
//     });
// };

//根据id查询项目
// export const findOne = params => {
//     return  axios({
//         url: 'item/findOne',
//         method: 'get',
//         params
//     });
// };

//修改项目
// export const updateProject = params => {
//     return  axios({
//         url: 'item/update',
//         method: 'post',
//         data: params
//     });
// };

//编辑序号
// export const updateProjectSort = params => {
//     return  axios({
//         url: 'item/updateSort',
//         method: 'post',
//         data: params
//     });
// };

//添加项目
// export const addProject = params => {
//     return  axios({
//         url: 'item/add',
//         method: 'post',
//         data: params
//     });
// };

//UV接口
// export const UVProject = params => {
//     return  axios({
//         url: 'UV/find',
//         method: 'post',
//         data: params
//     });
// };
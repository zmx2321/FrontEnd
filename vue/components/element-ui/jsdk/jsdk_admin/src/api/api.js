/**
 * 用以请求接口数据
 */

import axios from './axios'

//登录
export const Login = params => {
    return  axios({
        url: 'user/login',
        method: 'post',
        data: params
    });
};

//修改密码
export const ModifyPassword = params => {
    return axios({
        url: 'user/modifyPassword',
        method: 'post',
        data: params
    });
};

//获取项目列表
export const getProjectList = params => {
    return  axios({
        url: 'item/findList',
        method: 'post',
        data: params,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
    });
};

//根据id查询项目
export const findOne = params => {
    return  axios({
        url: 'item/findOne',
        method: 'get',
        params,
    });
};

//修改项目
export const updateProject = params => {
    return  axios({
        url: 'item/update',
        method: 'post',
        data: params,
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
    });
};

//添加项目
export const addProject = params => {
    return  axios({
        url: 'item/add?title=qq&desc=11qqqqq&amount=1000&type=1',
        method: 'post',
        data: params,
    });
};
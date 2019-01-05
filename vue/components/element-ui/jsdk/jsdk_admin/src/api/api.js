/**
 * 用以请求接口数据
 */

import axios from 'axios'

//接口地址前缀
const base = '/api/admin/';

//登录
export const Login = params => { return  axios.post(base + 'user/login', params); };

//修改密码
export const ModifyPassword = params => { return  axios.post(base + 'user/modifyPassword', params); };

//获取项目列表
export const getProjectList = params => { return  axios.post(base + 'item/findList', { params: params }); };

//根据id查询项目
export const findOne = params => { return  axios.get(base + 'item/findOne', { params: params }); };

//修改项目
export const updateProject = params => { return  axios.post(base + 'item/update', params); };

//添加项目
export const addProject = params => { return  axios.post(base + 'item/add?title=qq&desc=11qqqqq&amount=1000&type=1', params); };
/**
 *  用以请求接口数据
 */

import axios from './axios'

const base = "/admin"

/**
 * common
 */
// 上传文件
export const excelUpload = params => {
    return axios({
        url: 'file/excel/import',
        method: 'post',
        data: params
    });
};
// 获取自己信息
export const getProfile = params => {
    return axios({
        url: `${base}/user/profile`,
        method: 'get',
    });
};

/**
 *  登录/注销/修改密码
 */
// 登录
export const Login = params => {
    return axios({
        url: `${base}/user/login`,
        method: 'post',
        data: params
    });
};

// 修改密码
export const ModifyPassword = params => {
    return axios({
        url: `${base}/user/password/update`,
        method: 'post',
        data: params
    });
};

// 注销
export const LogOut = () => {
    return axios({
        url: `${base}/user/logout`,
        method: 'post',
    });
};

/**
 * 账号管理
 */
// 获取账号列表
export const getAccount = params => {
    return axios({
        url: `${base}/user/list`,
        method: 'get',
        params: params
    });
};

// 添加账号
export const addUser = params => {
    return axios({
        url: `${base}/user/add`,
        method: 'post',
        data: params
    });
};

// 查看账号
export const checkUser = params => {
    return axios({
        url: `${base}/user/get`,
        method: 'get',
        params: params
    });
};

// 修改权值和备注
export const editUser = params => {
    return axios({
        url: `${base}/user/modify`,
        method: 'post',
        data: params
    });
};

// 编辑密码
export const editUserAccount = params => {
    return axios({
        url: `${base}/user/password/update/byadmin`,
        method: 'post',
        data: params
    });
};

// 启用账号
export const turnOn = params => {
    return axios({
        url: `${base}/user/enable`,
        method: 'post',
        data: params
    });
};

// 禁用账号
export const turnOff = params => {
    return axios({
        url: `${base}/user/disable`,
        method: 'post',
        data: params
    });
};

// 删除账号
export const delUser = params => {
    return axios({
        url: `${base}/user/remove`,
        method: 'post',
        data: params
    });
};

/**
 * 用户管理
 */
// 获取用户列表
export const getUser = params => {
    return axios({
        url: `/user/list`,
        method: 'get',
        params: params
    });
};

// 标记用户
export const tagUser = params => {
    return axios({
        url: `/user/tag`,
        method: 'post',
        data: params
    });
};

/**
 * 链接管理
 */
// 查看用户列表
export const getLinkList = params => {
    return axios({
        url: `/link/list`,
        method: 'get',
        params: params
    });
};

// 添加新链接(自动生成若干子链接)
export const addLink = params => {
    return axios({
        url: `/link/add`,
        method: 'post',
        data: params
    });
};

// 补添若干条子链接
export const addOneLink = params => {
    return axios({
        url: `/link/add/one`,
        method: 'post',
        data: params
    });
};

// 编辑子链接的属性
export const updateLink = params => {
    return axios({
        url: `/link/modify`,
        method: 'post',
        data: params
    });
};

// 删除链接
export const delLink = params => {
    return axios({
        url: `/link/remove`,
        method: 'post',
        data: params
    });
};

/**
 * 流量统计
 */
// 获取统计列表
export const getFlow = params => {
    return axios({
        url: `/flow/list`,
        method: 'get',
        params: params
    });
};

// 获取统计列表
export const editFlow = params => {
    return axios({
        url: `/flow/modify`,
        method: 'post',
        data: params
    });
};

// 实时统计
export const getReal = params => {
    return axios({
        url: `/flow/realtime/list`,
        method: 'get',
        params: params
    });
};
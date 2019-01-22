/**
 *  用以请求接口数据
 */

import axios from './axios'

/**
 * common
 */


/**
 *  登录/注销/修改密码
 */
// 登录
export const Login = params => {
    return  axios({
        url: 'login',
        method: 'post',
        data: params
    });
};

/**
 * 设备管理
 */
// 获取设备信息
export const getDeviceList = () => {
    return  axios({
        url: 'selectGuiAll',
        method: 'get',
    });
};

// 修改设备地址
// export const updateLocation = params => { return  axios.post(`${base}/updateLocation`, params); };
export const updateLocation = params => {
    return  axios({
        url: 'updateLocation',
        method: 'post',
        data: params
    });
};

// 存取餐二维码
// export const getQRCode = params => { return  axios.get("http://t-postapi.lxstation.com/wx/common/qrcode", params); };
export const getQRCode = () => {
    return  axios({
        url: 'updateLocation',
        method: 'get',
    });
};

// 查询设备
// export const getDevice = params => { return  axios.get(`${base}/selectGuiAll`, { params: params }); }
export const getDevice = params => {
    return  axios({
        url: 'selectGuiAll',
        method: 'get',
        params: params
    });
};

/**
 * 柜口管理
 */
//获取柜口信息
// export const getCabinetList = params => { return  axios.post(`${base}/getBoxInfos`, params) };
export const getCabinetList = params => {
    return  axios({
        url: 'getBoxInfos',
        method: 'post',
        data: params
    });
};

//开启柜口
// export const openBoxNo = params => { return  axios.post(`${base}/openBoxNo`, params) };
export const openBoxNo = params => {
    return  axios({
        url: 'openBoxNo',
        method: 'post',
        data: params
    });
};

//开启所有柜口
// export const openBoxAll = params => { return  axios.post(`${base}/openBoxAll`, params) };
export const openBoxAll = params => {
    return  axios({
        url: 'openBoxAll',
        method: 'post',
        data: params
    });
};

//查看设备柜口状态
// export const getBoxStatus = params => { return  axios.post(`${base}/getBoxStatus`, params) };
export const getBoxStatus = params => {
    return  axios({
        url: 'getBoxStatus',
        method: 'post',
        data: params
    });
};

/**
 * 记录管理
 */
//获取记录信息
// export const getRecordInfo = params => { return  axios.post(`${base}/getPackageList`, params); };
export const getRecordInfo = params => {
    return  axios({
        url: 'getPackageList',
        method: 'post',
        data: params
    });
};

/**
 * 用户管理
 */
//获取用户信息
// export const geUserList = params => { return  axios.post(`${base}/getUserList`, params); };
export const geUserList = params => {
    return  axios({
        url: 'getUserList',
        method: 'post',
        data: params
    });
};

/**
 * 骑手管理
 */
//获取骑手信息
// export const getRiderList = params => { return  axios.post(`${base}/getPostmanList`, params); };
export const getRiderList = params => {
    return  axios({
        url: 'getPostmanList',
        method: 'post',
        data: params
    });
};
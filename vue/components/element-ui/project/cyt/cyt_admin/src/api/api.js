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
        url: 'admin/login',
        method: 'post',
        data: params
    });
};

// 修改密码
export const ModifyPassword = params => {
    return  axios({
        url: 'admin/updatePassword',
        method: 'post',
        params: params
    });
};

/**
 * 管理员管理
 */
export const getAdminList = params => {
    return  axios({
        url: 'admin/info/all',
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
        url: 'admin/selectGuiAll',
        method: 'get',
    });
};

// 修改设备地址
export const updateLocation = params => {
    return  axios({
        url: 'admin/updateLocation',
        method: 'post',
        data: params
    });
};

// 存取餐二维码
export const getQRCode = params => {
    return  axios({
        url: 'http://t-postapi.lxstation.com/wx/common/qrcode',
        method: 'get',
        params: params
    });
};

// 查询设备
export const getDevice = params => {
    return  axios({
        url: 'admin/selectGuiAll',
        method: 'get',
        params: params
    });
};


/**
 * 配置管理
 */
// 获取配置列表
export const findConfigureList = params => {
    return  axios({
        url: 'configure/all',
        method: 'post',
        data: params
    });
};

// 添加banner
export const addConfigure = params => {
    return  axios({
        url: 'configure/add',
        method: 'post',
        data: params
    });
};

// 轮播速度
export const setSpeed = params => {
    return  axios({
        url: 'configure/setSpeed',
        method: 'post',
        params: params
    });
};

// 修改配置
export const updateConfigure = params => {
    return  axios({
        url: 'configure/update',
        method: 'post',
        data: params
    });
};

// 配置类型
export const conType = params => {
    return  axios({
        url: 'configure/get',
        method: 'get',
        params: params
    });
};

// 删除配置
export const delCon = params => {
    return  axios({
        url: 'configure/del',
        method: 'post',
        params: params
    });
};


/**
 * 格口管理
 */
//获取格口信息
// export const getCabinetList = params => { return  axios.post(`${base}/getBoxInfos`, params) };
export const getCabinetList = params => {
    return  axios({
        url: 'admin/getBoxInfos',
        method: 'post',
        data: params
    });
};

//开启格口
// export const openBoxNo = params => { return  axios.post(`${base}/openBoxNo`, params) };
export const openBoxNo = params => {
    return  axios({
        url: 'admin/openBoxNo',
        method: 'post',
        data: params
    });
};

//开启所有格口
// export const openBoxAll = params => { return  axios.post(`${base}/openBoxAll`, params) };
export const openBoxAll = params => {
    return  axios({
        url: 'admin/openBoxAll',
        method: 'post',
        data: params
    });
};

//查看设备格口状态
// export const getBoxStatus = params => { return  axios.post(`${base}/getBoxStatus`, params) };
export const getBoxStatus = params => {
    return  axios({
        url: 'admin/getBoxStatus',
        method: 'post',
        data: params
    });
};

/**
 * 记录管理
 */
// 获取记录信息
export const getRecordInfo = params => {
    return  axios({
        url: 'admin/getPackageList',
        method: 'post',
        data: params
    });
};

// 记录数据下载
export const downloadPackageList = params => {
    return  axios({
        url: 'admin/downloadPackageList',
        method: 'get',
        params: params
    });
};

/**
 * 用户管理
 */
// 获取用户信息
export const geUserList = params => {
    return  axios({
        url: 'admin/getUserList',
        method: 'post',
        data: params
    });
};

// 用户数据下载
export const downloadUserList = params => {
    return  axios({
        url: 'admin/downloadUserList',
        method: 'get',
        params: params
    });
};

/**
 * 骑手管理
 */
// 获取骑手信息
export const getRiderList = params => {
    return  axios({
        url: 'admin/getPostmanList',
        method: 'post',
        data: params
    });
};

// 解封/封禁
export const setDisable = params => {
    return  axios({
        url: 'admin/disable',
        method: 'post',
        params: params
    });
};

// 骑手数据下载
export const downloadPostmanList = params => {
    return  axios({
        url: 'admin/downloadPostmanList',
        method: 'get',
        params: params
    });
};
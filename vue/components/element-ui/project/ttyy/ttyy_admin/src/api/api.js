/**
 *  用以请求接口数据
 */

import axios from './axios'

/**
 * common
 */
// 上传图片
export const getImgURI = params => {
    return  axios({
        url: 'upload',
        method: 'post',
        data: params
    });
};


/**
 *  登录/注销/修改密码
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
        method: 'get'
    });
};

// 修改密码
export const ModifyPassword = params => {
    return  axios({
        url: 'account/updatePassword',
        method: 'post',
        data: params
    });
};

/**
 *  管理员
 */
export const findAccountList = params => {
    return  axios({
        url: 'account/findAccount',
        method: 'post',
        data: params
    });
};

/**
 *  用户管理
 */
// 获取管理员和员工列表
export const findUserList = params => {
    return  axios({
        url: 'user/findUserList',
        method: 'get',
        params: params
    });
};

// 添加管理员
// export const findAccountList = params => {
//     return  axios({
//         url: 'account/findAccount',
//         method: 'post',
//         data: params
//     });
// };


/**
 *  banner管理
 */
// 获取banner列表
export const findBannerList = params => {
    return  axios({
        url: 'banner/findList',
        method: 'post',
        data: params
    });
};

// 添加banner
export const addBanner = params => {
    return  axios({
        url: 'banner/add',
        method: 'post',
        data: params
    });
};

// 编辑banner
export const updateBanner = params => {
    return  axios({
        url: 'banner/updateNotNull',
        method: 'post',
        data: params
    });
};

// 删除banner
export const delBanner = params => {
    return  axios({
        url: 'banner/delete',
        method: 'post',
        data: params
    });
};


/**
 *  兑换码管理
 */
// 获取兑换码列表
export const findRedeemCodeList = params => {
    return  axios({
        url: 'redeemcode/findList',
        method: 'post',
        data: params
    });
};

// 添加一条兑换码
export const addSingleRedeemCode = params => {
    return  axios({
        url: 'redeemcode/addOne',
        method: 'post',
        data: params
    });
};

// 添加多条兑换码
export const addMoreRedeemCode = params => {
    return  axios({
        url: 'redeemcode/addMore',
        method: 'post',
        data: params
    });
};

// 删除兑换码
export const removeRedeemCode = params => {
    return  axios({
        url: 'redeemcode/delete',
        method: 'get',
        params: params
    });
};


/**
 *  订单管理
 */
// 获取订单列表
export const findOrderList = params => {
    return  axios({
        url: 'order/findList',
        method: 'get',
        params: params
    });
};


/**
 *  商品管理
 */
// 获取商品列表
export const findProductList = params => {
    return  axios({
        url: 'product/findList',
        method: 'get',
        params: params
    });
};

// 添加商品
export const addProduct = params => {
    return  axios({
        url: 'product/add',
        method: 'post',
        data: params
    });
};

// 更新商品
export const updateProduct = params => {
    return  axios({
        url: 'product/updateNotNull',
        method: 'post',
        data: params
    });
};

// 删除商品
export const delProduct = params => {
    return  axios({
        url: 'product/delete',
        method: 'post',
        data: params
    });
};


/**
 *  数据统计
 */
// 数据统计
export const findTodayStatus = () => {
    return  axios({
        url: 'status/findTodayStatus',
        method: 'get',
    });
};

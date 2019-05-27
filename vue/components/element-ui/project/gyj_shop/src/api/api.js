/**
 *  用以请求接口数据
 */

import axios from './axios'

let base = "/admin";

/**
 * common
 */
// 上传图片
export const getImgURI = params => {
    return  axios({
        url: `${base}/upload/uploadImage`,
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
        url: `${base}/user/login`,
        method: 'post',
        data: params
    });
};

// 获取用户
export const getUser = params => {
    return  axios({
        url: `${base}/user/get`,
        method: 'get',
        params: params
    });
};

// 注销
export const Logout = () => {
    return  axios({
        url: `${base}/user/logout`,
        method: 'post'
    });
};

// 修改密码
export const ModifyPassword = params => {
    return  axios({
        url: `${base}/user/modify`,
        method: 'post',
        data: params
    });
};

/**
 * 商品分类
 */
// 获取分类列表
export const getCategoryList = params => {
    return  axios({
        url: `${base}/category/search`,
        method: 'get',
        params: params
    });
};

// 根据id获取分类
export const getCategoryById = params => {
    return  axios({
        url: `${base}/category/get`,
        method: 'get',
        params: params
    });
};

// 添加分类
export const addCategory = params => {
    return  axios({
        url: `${base}/category/add`,
        method: 'post',
        data: params
    });
};

// 编辑分类
export const updateCategory = params => {
    return  axios({
        url: `${base}/category/modify`,
        method: 'post',
        data: params
    });
};

// 删除分类
export const delCategory = params => {
    return  axios({
        url: `${base}/category/remove`,
        method: 'post',
        data: params
    });
};

/**
 * 商品管理
 */
// 获取商品列表
export const getProductList = params => {
    return  axios({
        url: `${base}/product/search`,
        method: 'get',
        params: params
    });
};

// 添加商品
export const addProduct = params => {
    return  axios({
        url: `${base}/product/add`,
        method: 'post',
        data: params,
        /*header: {
            "Content-Type": "application/json;charset=utf-8"
        }*/
    });
};

// 编辑商品
export const updateProduct = params => {
    return  axios({
        url: `${base}/product/modify`,
        method: 'post',
        data: params,
        header: {
            "Content-Type": "application/json;charset=utf-8"
        }
    });
};

// 删除商品
export const delProduct = params => {
    return  axios({
        url: `${base}/product/remove`,
        method: 'post',
        data: params
    });
};

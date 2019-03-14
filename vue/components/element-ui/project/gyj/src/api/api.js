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

// 上传视频
export const getVideoURI = params => {
    return  axios({
        url: `${base}/upload/uploadVideo`,
        method: 'post',
        data: params
    });
};

// 地址
export const getAddress = () => {
    return  axios({
        url: `${base}/province/search`,
        method: 'get',
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

// 注销
export const Logout = () => {
    return  axios({
        url: `${base}/user/logout`,
        method: 'post'
    });
};


/**
 *  资讯管理
 */
// 获取资讯列表
export const getConsultation = params => {
    return  axios({
        url: `${base}/consultation/search`,
        method: 'get',
        params: params
    });
};

// 获取资讯分类列表
export const getConsultationType = params => {
    return  axios({
        url: `${base}/consultationType/search`,
        method: 'get',
        params: params
    });
};

// 添加资讯
export const addConsultation = params => {
    return  axios({
        url: `${base}/consultation/add`,
        method: 'post',
        params: params
    });
};

// 根据id获取资讯
export const getConsultationById = params => {
    return  axios({
        url: `${base}/consultation/get`,
        method: 'get',
        params: params
    });
};

// 编辑资讯
export const editConsultation = params => {
    return  axios({
        url: `${base}/consultation/modify`,
        method: 'post',
        params: params
    });
};

// 删除资讯
export const delConsultation = params => {
    return  axios({
        url: `${base}/consultation/remove`,
        method: 'post',
        params: params
    });
};


/**
 *  用户管理
 */
// 获取用户列表
export const getUserInfoList = params => {
    return  axios({
        url: `${base}/userinfo/search`,
        method: 'get',
        params: params
    });
};

// 根据用户id获取用户
export const getUserInfoById = params => {
    return  axios({
        url: `${base}/userinfo/get`,
        method: 'get',
        params: params
    });
};

// 资质认证审核
export const reviewUser = params => {
    return  axios({
        url: `${base}/identificationInfo/modify`,
        method: 'post',
        params: params
    });
};


/**
 *  投票管理
 */
// 获取投票列表
export const getVote = params => {
    return  axios({
        url: `${base}/vote/search`,
        method: 'get',
        params: params
    });
};

// 添加投票
export const addVote = params => {
    return  axios({
        url: `${base}/vote/add`,
        method: 'post',
        params: params
    });
};

// 编辑投票
export const editVote = params => {
    return  axios({
        url: `${base}/vote/modify`,
        method: 'post',
        params: params
    });
};

// 删除投票
export const delVote = params => {
    return  axios({
        url: `${base}/vote/remove`,
        method: 'post',
        params: params
    });
};

// 获取投票候选项列表
export const getVoteOptionList = params => {
    return  axios({
        url: `${base}/voteOption/get`,
        method: 'get',
        params: params
    });
};

// 添加投票候选项
export const addVoteOption = params => {
    return  axios({
        url: `${base}/voteOption/add`,
        method: 'post',
        params: params
    });
};

// 编辑投票候选项
export const editVoteOption = params => {
    return  axios({
        url: `${base}/voteOption/modify`,
        method: 'post',
        params: params
    });
};

// 删除投票候选项
export const delVoteOption = params => {
    return  axios({
        url: `${base}/voteOption/remove`,
        method: 'post',
        params: params
    });
};


/**
 *  统计
 */
// 消费数据统计
export const getConsumerStatistics = params => {
    return  axios({
        url: `${base}/statistics/consumer/search`,
        method: 'get',
        params: params
    });
};

// 用户数据统计
export const getUserStatistics = params => {
    return  axios({
        url: `${base}/statistics/user/search`,
        method: 'get',
        params: params
    });
};
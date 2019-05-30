/**
 *  用以请求接口数据
 */

import axios from './axios'

/**
 * banner
 */
// banner
export const banner = () => {
    return  axios({
        url: `banner/list`,
        method: 'get',
    });
};

/**
 * product
 */
export const product = params => {
    return  axios({
        url: `product/list`,
        method: 'get',
        params: params
    });
};

/**
 * category
 */
export const category = () => {
    return  axios({
        url: `category/list`,
        method: 'get',
    });
};
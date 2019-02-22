// 类目模块

import request from '@/api/axios';
import {
  Message
} from 'element-ui';

export default class TypeModel {
  // 获取商品类目
  getShopType(params) {
    return request({
      url: '/admin/category/search',
      method: 'GET',
      params,
    })
  }

  // 单条商品类目信息
  getOneShopType(params) {
    return request({
      url: '/admin/category/get',
      method: 'GET',
      params
    })
  }

  // 新增商品类目
  addShopType(params) {
    return request({
      url: '/admin/category/add',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 修改商品类目信息
  updataOneShopType(params) {
    return request({
      url: '/admin/category/modify',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 删除商品类目
  deleteOneShopType(params) {
    return request({
      url: '/admin/category/remove',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // **************************************

  // 获取新闻类目
  getNewsType(params) {
    return request({
      url: '/admin/genre/search',
      method: 'GET',
      params,
    })
  }

  // 单条新闻类目信息
  getOneNewsType(params) {
    return request({
      url: '/admin/genre/get',
      method: 'GET',
      params
    })
  }

  // 新增新闻类目
  addNewsType(params) {
    return request({
      url: '/admin/genre/add',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 修改新闻类目信息
  updataOneNewsType(params) {
    return request({
      url: '/admin/genre/modify',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 删除新闻类目
  deleteOneNewsType(params) {
    return request({
      url: '/admin/genre/remove',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }
};

import request from '@/api/axios';
import {
  Message
} from 'element-ui';

export default class GoodsModel {
  // 获取商品数据
  getGoodsList(params) {
    return request({
      url: '/admin/product/search',
      method: 'GET',
      params: params
    })
  }

  // 获取分类信息
  getGoodsType(params) {
    return request({
      url: '/admin/category/search',
      method: 'GET',
      params: params
    })
  }

  // 上下架商品
  modifyGoodStatus(params) {
    return request({
      url: '/admin/product/status',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 获取单条商品数据
  getOneGood(params){
    return request({
      url: '/admin/product/get',
      method: 'GET',
      params: params
    })
  }

  // 修改商品数据
  modifyGoodInfo(params){
    return request({
      url: '/admin/product/modify',
      method: 'POST',
      data: params
    })
  }

  // 新增商品
  addGood(params){
    return request({
      url: '/admin/product/add',
      method: 'POST',
      data: params
    })
  }

  // 删除商品
  deleteGood(params){
    return request({
      url: '/admin/product/remove',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 筛选搜索条件--返回非空字段
  _dealSearchData(object) {
    let newObject = {}
    for (const key in object) {
      if (object[key] !== '' && object[key] !== null) {
        newObject[key] = object[key]
      }
    }
    return newObject
  }
};

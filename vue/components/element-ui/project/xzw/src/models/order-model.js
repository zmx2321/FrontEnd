// 订单模块
import request from '@/api/axios';
import {
  Message
} from 'element-ui';

export default class OrderModel {
  // 获取全部数据
  searchOrderData(params) {
    return request({
      url: '/admin/order/selectAdminOrderByParams',
      method: 'POST',
      data: params,
    })
  }

  // 获取单条数据
  getOneOrder(id) {
    return request({
      url: '/admin/order/selectOrderInfo/' + id,
      method: 'GET',
    })
  }

  // 更新单条数据
  upDataOneOrder(params){
    return request({
      url: '/admin/order/updateOrder',
      method: 'POST',
      data: params,
      // headers: {
      //   "Form-Data": "0",
      // },
    })
  }

  // 退货接口
  returnedGood(params) {
    return request({
      url: '/admin/order/returnedGood',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 取消订单 && 确认发货接口
  updateOrderStatus(params) {
    return request({
      url: '/admin/order/updateOrderStatus',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }



  // 校验字符串
  _checkString(value) {
    if (value == '') {
      Message('请输入必填信息后再提交！')
      return false
    }
    return true
  }

  
};

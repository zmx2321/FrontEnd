import request from '@/api/axios';
import {
  Message
} from 'element-ui';

export default class DistributorModel {

  // 获取分销数据
  getData(params) {
    return request({
      url: '/admin/distributor/search',
      method: 'GET',
      params: params
    })
  }

  // 修改用户状态--冻结--解封
  changeUserStatus(params) {
    return request({
      url: '/admin/distributor/status',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 获取单条数据
  getOneInfo(params){
    return request({
      url: '/admin/distributor/get',
      method: 'GET',
      params
    })
  }

  // 更新单条信息
  updataOneInfo(params){
    return request({
      url: '/admin/distributor/modify',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }




  setReturnBills(params){
    return request({
      url: '/admin/distributor/setYesCashBackByMonthAndUserId',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 获取个人信息
  findBillsLogByUserId(params){
    return request({
      url: '/admin/distributor/findBillsLogByUserId',
      method: 'Get',
      params
    })
  }

  getBankinfo(params){
    return request({
      url: '/admin/bankinfo/get',
      method: 'Get',
      params
    })
  }


  
};

import request from '@/api/axios';
import {
  Message
} from 'element-ui';

export default class slideModel {
  // 退出登录
  loginOut(params) {
    return request({
      url: '/admin/user/logout',
      method: 'POST'
    })
  }

  // 密码修改 
  changePassword(params) {
    return request({
      url: '/admin/user/modify',
      method: 'POST',
      data: params
    })
  }

  // 密码输入校验
  _checkPassword(value) {
    return value == '' ? false : true
  }
};

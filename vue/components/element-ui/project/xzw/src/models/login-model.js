import request from '@/api/axios';
import { Message } from 'element-ui';

export default class loginModel {

  // 接口--登录
  login(params){
    return request({
      url: '/admin/user/login',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 账号密码校验是否输入
  _checkForm(object) {
    for (const key in object) {
      if (object[key] === '') {
        Message('输入不完整，请重新输入')
        return false
      }
    }
    return true
  }
};

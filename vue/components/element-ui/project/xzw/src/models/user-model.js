import request from '@/api/axios';
import {
  Message
} from 'element-ui';

export default class UserModel {
  // 获取用户数据
  getAllUser(params) {
    return request({
      url: '/admin/user/search',
      method: 'GET',
      params,
    })
  }
  // 获取单条用户
  getOneUser(params) {
    return request({
      url: '/admin/user/get',
      method: 'GET',
      params,
    })
  }

  // 修改用户
  updateOneUser(params) {
    return request({
      url: '/admin/user/modify',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 新增用户
  addOneUser(params) {
    return request({
      url: '/admin/user/add',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 移除用户
  deleteOneUser(params) {
    return request({
      url: '/admin/user/remove',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }


  // *******************************

  // 搜索角色
  getAllRole(params) {
    return request({
      url: '/admin/role/search',
      method: 'GET',
      params
    })
  }

  // 获取单个角色
  getOneRole(params) {
    return request({
      url: '/admin/role/get',
      method: 'GET',
      params
    })
  }

  // 新增角色
  addOneRole(params) {
    return request({
      url: '/admin/role/add',
      method: 'POST',
      data: params,
      // headers: {
      //   "Form-Data": "0",
      // },
    })
  }

  // 删除角色
  deleteOneRole(params) {
    return request({
      url: '/admin/role/remove',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }

  // 修改角色
  changeOneRole(params) {
    return request({
      url: '/admin/role/modify',
      method: 'POST',
      data: params,
      // headers: {
      //   "Form-Data": "0",
      // },
    })
  }

  // 获取所有的菜单项
  getAllMenu(params) {
    return request({
      url: '/admin/menu/search',
      method: 'GET',
      params
    })
  }

  // 处理已有角色权限
  _dealSelectMenu(array){
    let arr = []
    array.forEach(element => {
      for (const key in element) {
        if(key == 'menuId'){
          arr.push(element[key])
        }
      }
    });
    return arr
  }

  // 新增角色校验
  _checkOneNull(value){
    if(value == ''){
      Message('请输入角色名称后再提交！')
      return false
    }
    return true
  }

};

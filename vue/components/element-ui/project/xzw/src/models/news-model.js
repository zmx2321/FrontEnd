import request from '@/api/axios';
import {
  Message
} from 'element-ui';

export default class newsModel {
  // 获取单条新闻
  getNews(params) {
    return request({
      url: '/admin/news/get',
      method: 'GET',
      params
    })
  }
  // 删除新闻
  deleteNews(params) {
    return request({
      url: '/admin/news/remove',
      method: 'POST',
      data: params,
      headers: {
        "Form-Data": "0",
      },
    })
  }
  // 搜索新闻
  searchNews(params) {
    return request({
      url: '/admin/news/search',
      method: 'GET',
      params
    })
  }
  // 新增新闻
  addNews(params) {
    return request({
      url: '/admin/news/add',
      method: 'POST',
      data: params
    })
  }
  // 修改新闻
  editNews(params) {
    return request({
      url: '/admin/news/modify',
      method: 'POST',
      data: params
    })
  }

  // 新闻类目
  getNewsType(params) {
    return request({
      url: '/admin/genre/search',
      method: 'GET',
    })
  }
  

  // 处理数据--主要处理分类的匹配文字
  _dealData(data, options){
    for (const value of data) {
      options.forEach(element => {
        if(element.id == value.genre){
          value.genreName = element.name
        }
      });
    }
  }

  // 上传图片
  uploadImages(params){
    return request({
      url: '/admin/upload/uploadImage',
      method: "POST",
      data: params,
    })
  }
};

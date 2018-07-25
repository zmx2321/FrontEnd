//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    teacher:'LaoYang',
    style:1
  },
  changePicSty:function(){
    this.setData({
      style:2
    })
  }
})

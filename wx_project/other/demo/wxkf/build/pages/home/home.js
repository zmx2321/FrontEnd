"use strict";

Page({
  data: {
    showList: ["../../img/show1.png", "../../img/show2.png", "../../img/show2.png", "../../img/show1.png"],
    imgUrls: ['http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg', 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 1000,
    entrance: [{
      img: "../../img/1.png",
      name: "扫码购",
      url: "/pages/home/qrCode/qrCode"
    }, {
      img: "../../img/2.png",
      name: "会员充值",
      url: "#"
    }, {
      img: "../../img/3.png",
      name: "互动专区",
      url: "#"
    }]
  },
  onLoad: function onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function onReady() {
    // 页面渲染完成
  },
  onShow: function onShow() {
    // 页面显示
  },
  onHide: function onHide() {
    // 页面隐藏
  },
  onUnload: function onUnload() {
    // 页面关闭
  }
});
//获取应用实例  
var app = getApp();

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },

  onLoad: function () {
    var that = this;
    //获取系统信息
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },

  //跳到另一个页面的事件处理函数
  jumpToLogics: function () {
    wx.navigateTo({
      url: '/pages/orderLogistics/orderLogistics'
    })
  },
  jumpToJudge: function () {
    wx.navigateTo({
      url: '/pages/orderEvaluate/orderEvaluate'
    })
  },
  jumpToDetail: function () {
    wx.navigateTo({
      url: '/pages/orderState/orderState'
    })
  },

  //滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({ currentTab: e.detail.current });
  },

  //点击tab切换
  swichNav: function (e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
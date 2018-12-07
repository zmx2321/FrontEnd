// pages/productDetail_ms/productDetail_ms.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //swiper
    imgUrls: [
      'http://jxc-admin.oss-cn-hangzhou.aliyuncs.com/images/cs/poyctyt_banner_cs1.png',
      'http://jxc-admin.oss-cn-hangzhou.aliyuncs.com/images/cs/poyctyt_banner_cs2.png',
      'http://jxc-admin.oss-cn-hangzhou.aliyuncs.com/images/cs/poyctyt_banner_cs3.png',
      'http://jxc-admin.oss-cn-hangzhou.aliyuncs.com/images/cs/poyctyt_banner_cs4.png'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 2000,
    duration: 500,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //跳到另一个页面的事件处理函数
  jumpToFightGroup: function () {
    wx.navigateTo({
      url: '/pages/fightGroups/fightGroups'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
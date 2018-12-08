// www/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher: "tttt",
    student: ["aa", "ss", "ff"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this指当前的data
    console.log("123", this);
    //改变数据
    this.setData({
      teacher: "zmx"
    });

    
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
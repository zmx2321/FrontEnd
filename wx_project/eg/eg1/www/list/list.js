// www/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    skcolor: "000",
    num: 2,
    skautoplay: true,
  },

  //监听swiper
  skchange: function(e){
    //e表示元素
    //console.log(this.data.num, e);

    //获取当前显示的item
    //console.log(e.detail.current);

    //修改data属性
    this.setData({
      num: e.detail.current
    });

    // 如果到末尾
    if (e.detail.current == 4){
      this.setData({
        skautoplay: true,
      });
    } else {
      this.setData({
        skautoplay: false,
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
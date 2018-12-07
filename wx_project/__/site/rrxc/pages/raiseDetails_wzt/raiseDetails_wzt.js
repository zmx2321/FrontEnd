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

    //tab
    _num: 1,

    //Anchor
    list: ["list0", "list1", "list2"],
    toView: 'eeede'
  },

  //Anchor
  jumpTo: function (e) {
    console.log(e.target.dataset.num)
    // 获取标签元素上自定义的 data-opt 属性的值
    let target = e.currentTarget.dataset.opt;
    this.setData({
      _num: e.target.dataset.num,
      toView: target
    })
  },
  //radio监听事件
  listenerRadioGroup: function (e) {
    // console.log(e);
    console.log('radio发生change事件，携带value值为：', e.detail.value)

    var items = this.data.array;
    for (var i = 0, len = items.length; i < len; ++i) {
      items[i].checked = items[i].value == e.detail.value
    }

    this.setData({
      items: items
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // console.log(product_id);
    console.log('onLoad test');
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
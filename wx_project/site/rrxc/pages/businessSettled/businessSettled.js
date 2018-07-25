Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [
      { name: 'tsms', value: '特色民宿', checked: 'true' },
      { name: 'stnc', value: '生态农场' },
      { name: 'jqly', value: '景区乐园' },
      { name: 'mlcl', value: '美丽村落' }
    ]
  },
  /**
 * radio监听事件
 */
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
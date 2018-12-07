Page({
  data: {
    addressList: ['北京理工大学东区3号楼333', '北京理工大学东区3号楼334', '北京理工大学东区3号楼335', '北京理工大学东区3号楼336'],
    timeList: ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00"],
    index: 0,
    time: 0,
    shopList: [{
      photo: "../../../img/demoimage1.jpg",
      name: "光明牛奶",
      price: "4.1",
      count: 1
    }, {
      photo: "../../../img/demoimage2.jpg",
      name: "光明豆浆",
      price: "5.1",
      count: 1,

    }, {
      photo: "../../../img/demoimage3.jpg",
      name: "光明饮料",
      price: "6.1",
      count: 1,
    }],
    weipay: "#0AFF0A",
    nopay: "#ccc"
  },
  addressChange: function(e) {
    console.log("当前选择" + e.detail.value);
    this.setData({
      index: e.detail.value
    })
  },
  timeChange: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  chooseAction: function(e) {

    if (e.target.dataset.name == "wei") {
      this.setData({
        weipay: "#0AFF0A",
        nopay: "#ccc"
      })
    } else if (e.target.dataset.name == "no") {
      this.setData({
        weipay: "#ccc",
        nopay: "#0AFF0A"
      })
    }
  },
  turnAction: function() {
    console.log("跳转");
    wx.navigateTo({
      url: '../../mine/order/order'
    })
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  }
})
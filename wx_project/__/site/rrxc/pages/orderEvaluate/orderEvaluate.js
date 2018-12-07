//index.js
var app = getApp()
var count = 0;
Page({
  data: {
    _num: 1,
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../../images/normal.png',
    selectedSrc: '../../images/selected.png',
    halfSrc: '../../images/half.png',
    key: 0,//评分
  },
  onLoad: function () {
  },
  //点击左边,半颗星
  selectLeft: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    if (this.data.key == 0.5 && e.currentTarget.dataset.key == 0.5) {
      //只有一颗星的时候,再次点击,变为0颗
      key = 0;
    }
    count = key
    this.setData({
      key: key
    })
  },
  //点击右边,整颗星
  selectRight: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    count = key
    this.setData({
      key: key
    })
  },
  startRating: function (e) {
    wx.showModal({
      title: '分数',
      content: "" + count,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },
  click: function (e) {
    console.log(e.target.dataset.num)
    this.setData({
      _num: e.target.dataset.num
    })
  }
})
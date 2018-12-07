Page({
  data: {
    
  },
  // 下拉刷新回调接口
  onPullDownRefresh: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 刷新时需把total重置为0，代表重新从第一条请求。
    total = 0;
    // this.data.dataArray 是页面中绑定的数据源
    this.data.dataArray = [];
    // 网络请求，重新请求一遍数据
    this.periphery();
    // 小程序提供的api，通知页面停止下拉刷新效果
    wx.stopPullDownRefresh;
  },
  // 上拉加载回调接口
  onReachBottom: function () {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    total += count;
    // 网络请求
    this.periphery();
  }
})
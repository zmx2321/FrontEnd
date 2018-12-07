let pageIndex = 1;

//计算时间差
let timeDiffer = function (endtime) {
  let endTime = new Date(endtime);  //结束时间
  let currentTime = new Date().getTime();  //当前时间
  var result = 0;
  let timeDiffer = endTime - currentTime;  //时间差(毫秒数)

  return timeDiffer;
}

//计算天数
let calcTime = function (endtime){
  timeDiffer(endtime);  //获取时间差

  //计算天数并返回值
  if (timeDiffer > 0) {
    return "剩余" + Math.floor(timeDiffer / (24 * 3600 * 1000) + 1) + "天";
  } else {
    return "剩余0天";
  }
}

//根据时间差返回其状态
let statuTime = function (endtime){
  timeDiffer(endtime);  //获取时间差

  //计算天数并返回值
  if (timeDiffer > 0) {
    return "进行中"
  } else {
    return "已结束";
  }
}

//获取nav和tab元素高度
let calcHeight = function(that){
  // 获取设备高度
  wx.getSystemInfo({
    success: function (res) {
      that.setData({
        clientHeight: res.windowHeight
      });
    }
  });

  //创建节点选择器
  var query = wx.createSelectorQuery();
  //选择id
  query.select('.nav_wrap').boundingClientRect();
  query.select('.swp_tab').boundingClientRect()
  query.exec(function (res) {
    // console.log(res[0].height);
    //取高度
    that.setData({
      diffHeight: res[0].height + res[1].height
    });
  })
}

//数据请求
let getData = {
  //tabData
  tabData : function(that){
    wx.request({
      //上线的话必须是https，没有appId的本地请求貌似不受影响  
      url: 'https://www.renrenxiangcun.com/jxc/wechat/api/show_mer_type_tags.jhtml',
      data: {
        mer_type: 5
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      // header: {}, // 设置请求的 header  
      success: function (res) {
        let data = res.data.data;
        that.setData({
          tabData: data
        })
      },
      fail: function () {
        console.log("接口调用失败");
      },
      complete: function () {
        // console.log("complete");
      }
    })
  },

  //listData
  listData : function(that){
    // that.setData({
    //   hidden: false
    // });
    wx.request({
      url: 'https://www.renrenxiangcun.com/jxc/wechat/api/show_mer_type_products.jhtml',
      data: {
        mer_type: 5,         //标签编号
        is_hot: 1,           //是否推荐热门 1是0否
        pageNum: 8,         //每页数据条数
        pageIndex: pageIndex        //第几页
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        //隐藏消息提示框
        wx.hideToast();

        let data = res.data.data;
        let list = that.data.listData
        // console.info(data);
        // console.info(that.data);

        // for (var i=0; i<data.length; i++){
        //   list.push(data[i]);
        // }

        that.setData({
          listData: data,
          time: calcTime(data.expire_time),
          statu: statuTime(data.expire_time),
        });

        // pageIndex++;
        // that.setData({
        //   hidden: true
        // });
      },
      fail: function () {
        // console.log("接口调用失败");
      },
      complete: function () {
        // console.log("complete");
      }
    })
  }
}

//获取应用实例  
var app = getApp();

//页面渲染
Page({
  data: {
    //页面交互
    title: "加载中...",  //弹出框文本
    winHeight: 0,  //swiper高度
    currentTab: 0, // tab切换
    clientHeight: 0,
    // hidden: true,

    //dom元素
    diffHeight: 0,
    nav_wrap: 0,
    swp_tab : 0,
    
    //数据
    tabData: {},  //选项卡数据
    listData: {},  //列表数据

    //数据参数
    time: 0,
    statu: 0
  },

  //load
  onLoad: function () {
    var that = this;  //将当前对象复制一份

    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 5000
    })

    //页面交互
    calcHeight(that);  //获取nav和tab元素高度

    //数据请求
    getData.tabData(that);  //tabData
    getData.listData(that);  //listData

    //test
    // wx.request({
    //   url: 'https://api.douban.com/v2/movie/top250',
    //   data: {},
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success: function(res){
    //     console.log(res.data);
    //   }
    // })
  },

  //滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    console.log("123")
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
  },

  //带参数跳转，获取product_id
  getProductId: function(e){
    //console.log(e);
    //获取data-product_id
    let product_id = e.currentTarget.dataset.product_id;
    // console.log(product_id);
    //获取全局对象
    let app = getApp();
    //设置全局对象的请求访问传递的参数
    app.requestDetailid = product_id;
  }
})
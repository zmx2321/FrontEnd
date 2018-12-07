var bmap = require('../../../libs/bmap-wx.min.js');
var wxMarkerData = [];

let startGeocoding = function (e) {
  wx.request({
    url: 'https://api.map.baidu.com/geocoder/v2/',
    data: geocodingparam,
    header: {
      "content-type": "application/json"
    },
    method: 'GET',
    success(data) {
      let res = data["data"];
      if (res["status"] === 0) {
        let result = res["result"];
        // outputRes 包含两个对象，
        // originalData为百度接口返回的原始数据
        // wxMarkerData为小程序规范的marker格式
        let outputRes = {};
        outputRes["originalData"] = res;
        outputRes["wxMarkerData"] = [];
        outputRes["wxMarkerData"][0] = {
          id: 0,
          latitude: result["location"]['lat'],
          longitude: result["location"]['lng'],
          address: geocodingparam["address"],
          iconPath: otherparam["iconPath"],
          iconTapPath: otherparam["iconTapPath"],
          desc: '',
          business: '',
          alpha: otherparam["alpha"],
          width: otherparam["width"],
          height: otherparam["height"]
        }
        otherparam.success(outputRes);
      } else {
        otherparam.fail({
          errMsg: res["message"],
          statusCode: res["status"]
        });
      }
    },
    fail(data) {
      otherparam.fail(data);
    }
  });
};

Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    scrollLeft: 0 //tab标题的滚动条位置
  },
  checkCor: function (e) {
    this.setData({
      scrollLeft: 300
    })
  },
  startGeocoding: function () {
    Bmap.geocoding({
      fail: fail,
      success: success,
      address: '北京大学',
      iconPath: '../../img/marker_red.png',
      iconTapPath: '../../img/marker_red.png'
    })
  },
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },
  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'j6bKiqpbcoruIFgQDUX66eaZFk0CsMiU'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.search({
      "query": '美食',
      fail: fail,
      success: success,
      iconPath: '../../../img/marker_red.png',
      iconTapPath: '../../../img/marker_red.png'
    });
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      placeData: {
        title: '名称：' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone
      }
    });
  },
  changeMarkerColor: function (data, id) {
    var that = this;
    var markersTemp = [];
    for (var i = 0; i < data.length; i++) {
      if (i === id) {
        data[i].iconPath = "../../../img/marker_yellow.png";
      } else {
        data[i].iconPath = "../../../img/marker_red.png";
      }
      markersTemp[i] = data[i];
    }
    that.setData({
      markers: markersTemp
    });
  }
})
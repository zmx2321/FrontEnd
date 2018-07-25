/**
 * author zmx2321
 */

//命名空间
var app = {
  util: {}
};

//工具方法模块
app.util = {
  $: function(selector, node){
    return (node || document).querySelector(selector);
  }
};

//应用代码，立即执行函数
(function(util){
  var $ = util.$;

  console.log($('#create'));
})(app.util)
//页面其他小效果
var tip = function(){
    //地址
    $(".city").CityPicker();
}

$(function(){
    jQuery.getScript("js/basefont.js", function(data, status, jqxhr) {
        tip();  //页面其他小效果
    });
});
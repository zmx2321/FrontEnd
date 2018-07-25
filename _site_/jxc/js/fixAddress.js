$(function(){
    //mock
    var thisApi = {
        //页面标签信息
        scenery_weather: {
            dev: "mock/scenery_weather.json",
            product: "",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    //console.log(bMock.getFace("poyct_zcl_swiper"));
});

//页面交互
var tip = function(){
    //address_cont 高度
    var address_cont = function(){
        var mymessbtn = $('.mymess_button'),
            address_cont = $('.address_cont_wrap');
            
        var winHeight = $(window).height(),
            mymessbtnHeight = mymessbtn.height() + parseInt(mymessbtn.css('margin-top'));

        address_cont.css('height', winHeight - mymessbtnHeight);
    }

    address_cont();

    $(window).resize(function() {
        address_cont();
    });
}


$(function(){
    jQuery.getScript("js/basefont.js", function(data, status, jqxhr) {
        tip();  //页面交互
    });
});
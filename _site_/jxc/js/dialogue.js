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
    //dialogue_cont 高度
    var digcotHeight = function(){
            digcot = $('.dialogue_cont'),
            digbtn = $('.dialogue_bottom');

        var winHeight = $(window).height(),
            digbtnHeight = digbtn.height() + parseInt(digbtn.css('margin-top'));

        digcot.css('height', winHeight - digbtnHeight);
    }

    digcotHeight();

    $(window).resize(function() {
        digcotHeight();
    });
}


$(function(){
    jQuery.getScript("js/basefont.js", function(data, status, jqxhr) {
        tip();  //页面交互
    });
});
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
    //选项卡
    $('.myCoupon_top li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.myCoupon_cont section').eq($(this).index()).show().siblings().hide();
    });

    //myCoupon_cont 高度
    var fowHeight = function(){
        var cuptop = $('.myCoupon_top'),
            cupcot = $('.myCoupon_cont'),
            mcpt_cot = $('.mcpt_cot');

        var winHeight = $(window).height(),
            cuptopHeight = cuptop.height() + parseInt(cuptop.css('margin-bottom'));
            console.log(cuptop.height());

        cupcot.css('height', winHeight - cuptopHeight - 3);
    }

    fowHeight();

    $(window).resize(function() {
        fowHeight();
    });

    //弹出框
    $('.free_eject').click(function(){
        $('.mask').fadeIn();
        $('.tc_ewm').fadeIn();
    });

    $('.mask').click(function(){
        $('.mask').fadeOut();
        $('.tc_ewm').fadeOut();
    });
}


//天气图标地址
$(function(){
    jQuery.getScript("js/basefont.js", function(data, status, jqxhr) {
        tip();  //页面交互
    });
});
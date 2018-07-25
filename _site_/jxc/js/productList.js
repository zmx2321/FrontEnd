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
    //选项卡1
    $('ul.prodlit_btn li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('article.prodlit_cot > section').eq($(this).index()).show().siblings().hide();
    }); 

    //选项卡2
    $('dl.jxwd_btn dd').click(function(){
        $(this).addClass('jxwd_active').siblings().removeClass('jxwd_active');
        $('article.jxwd_cont section').eq($(this).index()).show().siblings().hide();
    }); 
}


$(function(){
    tip();  //页面交互
});
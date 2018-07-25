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
    //冒泡
    $('.payment_botton_btn button').click(function(){
        $(".test_bubble").fadeIn('slow').delay(500).fadeOut('slow');
    });
}

//计数
var count = function(){
    $('.count_up').click(function(){
        var n = $(".count_num").text();
        var num = parseInt(n) + 1;
        if(num==0){
            alert("cc");
        }
        $(".count_num").text(num);
    });

    $('.count_down').click(function(){
        var n = $(".count_num").text();
        var num = parseInt(n) - 1;
        if(num==0){
            alert("不能为0!"); 
            return;
        }
        $(".count_num").text(num);
    }); 
}

$(function(){
    tip();  //页面交互
    count();    //count
});
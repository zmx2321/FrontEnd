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
        var count_down = $(this).parent().find('.count_down'),
            count_num = $(this).parent().find('.count_num');
        var sin_price = parseFloat($(this).parent().parent().find('.price b').text());
        var n = count_num.text();
        var num = parseInt(n) + 1;
        var n = num;
        if(num >= 0){
            count_down.show(); 
            count_num.show();
        }
        count_num.text(num);
        var pay_price = sin_price * num;
        $('.pay_price').text("￥" + pay_price);
    });

    $('.count_down').click(function(){
        var count_down = $(this).parent().find('.count_down'),
            count_num = $(this).parent().find('.count_num');
        var sin_price = parseFloat($(this).parent().parent().find('.price b').text());
        var n = count_num.text();
        var num = parseInt(n) - 1;
        var n = num;
        if(num <= 0){
            count_down.hide(); 
            count_num.hide();
        }
        count_num.text(num);
        var pay_price = sin_price * num;
        $('.pay_price').text("￥" + pay_price);
    }); 
}

$(function(){
    tip();  //页面交互
    count();    //count
});
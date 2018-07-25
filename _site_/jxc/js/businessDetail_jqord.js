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
    //选择日期
    $('.budakqde_num li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });

    //预定
    $('.pay_imd button').click(function(){
        $('.mask').fadeIn();
        $('.busdakod_ord').fadeIn();
    });

    $('.busdakod_ord_foot .qx').click(function(){
        $('.mask').fadeOut();
        $('.busdakod_ord').fadeOut();
    });

    $('.busdakod_ord_foot .qd').click(function(){
        var t = $("input[name='phone']");
        if(t.val() == ""){
            alert("手机号为空");
        }else{
            window.location.href="payment.html";
        }
    });
}

var count = function(){
    $('.num_up').click(function(){
        var n = $(".num").text();
        var num = parseInt(n) + 1;
        if(num==0){
            alert("cc");
        }
        $(".num").text(num);
    });

    $('.num_down').click(function(){
        var n = $(".num").text();
        var num = parseInt(n) - 1;
        if(num==0){
            alert("不能为0!"); 
            return;
        }
        $(".num").text(num);
    }); 
}

$(function(){
    tip();  //页面交互
    count();    //计数
});
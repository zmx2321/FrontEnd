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
    // 轮播图
    var swiper = new Swiper('.product_banner .swiper-container', {
        pagination: '.product_banner .swiper-pagination',
        autoplay: 2000,
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        loop: true,
        observer:true,
        observeParents:true,
    });

        //收藏
    $('.shoucang').toggle(
        function(){
            $(this).find('img').attr("src", "images/btn-sc-xz.png");
        },
        function(){
            $(this).find('img').attr("src", "images/icon-gz.png");
        }
    );

        //分享
    $('.fenxiang').click(function(){
        $('.mask').fadeIn();
        $('.share_btn').fadeIn();
    });

    $('.share_btn_foot button').click(function(){
        $('.mask').fadeOut();
        $('.share_btn').fadeOut();
    });


}

//立即秒杀
var ms_btn = function(){
    //手机
    /*$('.lj_button button').click(function(){
        $('.mask').fadeIn();
        $('.bindphone').fadeIn();
    });

    $('.bindphone_close').click(function(){
        $('.mask').fadeOut();
        $('.bindphone').fadeOut();
    });*/

    //规格
    $('.lj_button button').click(function(){
        $('.mask').fadeIn();
        $('.specifications').show();
    });

    $('.spec_t b').click(function(){
        $('.mask').fadeOut();
        $('.specifications').hide();
    });

    $('.specm_g li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
    });
}

//计数
var count = function(){
    $('.num_up').click(function(){
        var n = $(".num").text();
        var num = parseInt(n) + 1;

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
    ms_btn();   //立即秒杀
    count();
});
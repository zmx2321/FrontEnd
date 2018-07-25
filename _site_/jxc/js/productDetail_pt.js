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

    //弹出框
    $('.lj_button button').click(function(){
        $('.mask').fadeIn();
        $('.bindphone').fadeIn();
    });

    $('.bindphone_close').click(function(){
        $('.mask').fadeOut();
        $('.bindphone').fadeOut();
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

$(function(){
    tip();  //页面交互
});
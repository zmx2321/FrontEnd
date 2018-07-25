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

//浏览器滚动条位置
var setnavscroll = function(){
    $(window).scroll(function(){
        var window_top = $(window).scrollTop();
        var div_top = $('.navbar').offset().top;

        if (window_top > div_top) {
            $('.busntail_nav').addClass('busntail_nav_fix');
            $('.navbar').height($('.busntail_nav').height());
        } else {
            $('.busntail_nav').removeClass('busntail_nav_fix');
            $('.navbar').height(0);
        }
    });
}

//页面交互
var tip = function(){
        //分享
    $('.fenxiang').click(function(){
        $('.mask').fadeIn();
        $('.share_btn').fadeIn();
    });

    $('.share_btn_foot button').click(function(){
        $('.mask').fadeOut();
        $('.share_btn').fadeOut();
    });

        //收藏
    $('.shoucang').toggle(
        function(){
            $(this).find('img').attr("src", "images/btn-sc-xz.png");
        },
        function(){
            $(this).find('img').attr("src", "images/icon-sjzy-sc-wxz.png");
        }
    );

    // 选项卡
    /*$('ul.btalbtn li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('article.btalcot section').eq($(this).index()).show().siblings().hide();
    });*/ 
    $('ul.btalbtn > li').click(function() {
        var s = $('ul.btalbtn > li').index(this);
        $('body,html').animate({
            scrollTop: $('.btalcot > section:eq(' + s + ')').offset().top - 50
        }, 200);
        $('ul.btalbtn > li:eq('+s+')').addClass('active').siblings().removeClass('active');
    });

    var DT = $('ul.btalbtn').offset().top;
    $(window).scroll(function() {
        var wt = $(window).scrollTop()
          , l = $('.btalcot > section')
          , s = l.length - 1;
        if (wt < DT || wt >= l.last().offset().top + l.last().height() + 50) {
            $('ul.btalbtn').removeClass('fixed');
            $('ul.btalbtn > li:first').addClass('active').siblings().removeClass('active');
        } else {
            $('ul.btalbtn').addClass('fixed');
            for (var i = 0; i < s; i++) {
                if (wt >= parseInt(l.eq(i).offset().top - 50) && wt < parseInt(l.eq(i + 1).offset().top - 50)) {
                    s = i;
                    break;
                }
            }
            $('ul.btalbtn > li:eq(' + s + ')').addClass('active').siblings().removeClass('active');
        }
    });

    //购买须知
    $('.gmxz_bn').click(function(){
        $('.mask').fadeIn();
        $('.gmxz').fadeIn();
    });

    $('.gmxz').click(function(){
        $('.mask').fadeOut();
        $('.gmxz').fadeOut();
    });

}


$(function(){
    tip();  //页面交互
    setnavscroll(); //浏览器滚动条位置
});
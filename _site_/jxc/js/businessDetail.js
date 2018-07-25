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

//选项卡自适应高度
tabAutoHeight = function(){
    $('ul.btalbtn li').each(function(){
        if($(this).hasClass('active')){
            $(".btalcot").css("height", $('.tabitm').eq($(this).index()).css("height"));
            $(".busntail_cont").css("height", $('.tabitm').eq($(this).index()).css("height"));
            return false;
        }
    });
}

// 选项卡
var tab = function(){
   /* $('ul.btalbtn li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('article.btalcot section').eq($(this).index()).show().siblings().hide();
    });*/

    //滑动列表滑动事件
    /*mySwiper = new Swiper('.busntail_cont', {
        onTransitionEnd: function (swiper) {
            var j = mySwiper.activeIndex;
            $('ul.btalbtn li').removeClass('active').eq(j).addClass('active');
            var content_height = $('article.btalcot section').eq(j).height();
            var slide_height = $(".btalcot .swiper-slide").eq(j).height(content_height);
            $(".busntail_cont .swiper-wrapper").css("height", content_height);
            $(".btalcot").css("height", content_height);
        }
    })
    
    //滑动列表点击事件
    $('ul.btalbtn li').on('click', function (e) {
        e.preventDefault();
        //得到当前索引
        var i = $(this).index();
        $('ul.btalbtn li').removeClass('active').eq(i).addClass('active');

        var content_height = $(".article.btalcot section").eq(i).height();
        var slide_height = $(".btalcot .swiper-slide").eq(i).height(content_height);
        $(".busntail_cont .swiper-wrapper").css("height", content_height);
        $(".btalcot").css("height", content_height);
        mySwiper.slideTo(i, 200, false);

    });*/

    /*tabAutoHeight();  //选项卡当前active高度填充为swiperg高度
    $(window).resize(function() {
        tabAutoHeight(); 
    });*/

        /**
     * swiper高度自适应
     * [mirAutoHeight swiper高度自适应]
     * @param  {[type]} i       [索引]
     * @param  {[type]} mribtn  [选项卡按钮]
     * @param  {[type]} tabitm  [内容主体部分]
     * @param  {[type]} slide   [内容主体外部盒子]
     * @param  {[type]} swipwap [swiper盒子]
     * @param  {[type]} swipcot [swiper主体部分]
     * @return {[type]}         [description]
     */
    function mirAutoHeight(i, mribtn, tabitm, slide, swipwap, swipcot){
        mribtn.removeClass('active').eq(i).addClass('active');

        var tabitm = tabitm.eq(i);

        swipwap.css("height", tabitm.height());  //swiper-wrapper高度
        swipcot.css("height", tabitm.height());  //swiper-container高度
    }

    // 滑动
    var TabSwiper = new Swiper('.busntail_cont', {
        onTransitionEnd: function (swiper) {
            mirAutoHeight(TabSwiper.activeIndex, $('ul.btalbtn li'), $(".tabitm"), $(".btalcot swiper-slide"), $(".btalcot"), $(".busntail_cont"));
        }
    })
    
    // 列表切换
    $('ul.btalbtn li').on('click', function (e) {
        mirAutoHeight($(this).index(), $('ul.btalbtn li'), $(".tabitm"), $(".btalcot swiper-slide"), $(".btalcot"), $(".busntail_cont"));
        TabSwiper.slideTo($(this).index(), 200, false);
    });


    /*$('ul.btalbtn > li').click(function() {
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
    });*/
}

//地图
var iplocalMap = function(){
    // 百度地图API功能
    var map = new BMap.Map("allmap");
    var point = new BMap.Point(116.331398,39.897445);
    map.centerAndZoom(point,12);

    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var mk = new BMap.Marker(r.point);
            map.addOverlay(mk);
            map.panTo(r.point);
            console.log('您的位置：'+r.point.lng+','+r.point.lat);
        }
        else {
            console.log('failed'+this.getStatus());
        }        
    },{enableHighAccuracy: true})
    //关于状态码
    //BMAP_STATUS_SUCCESS   检索成功。对应数值“0”。
    //BMAP_STATUS_CITY_LIST 城市列表。对应数值“1”。
    //BMAP_STATUS_UNKNOWN_LOCATION  位置结果未知。对应数值“2”。
    //BMAP_STATUS_UNKNOWN_ROUTE 导航结果未知。对应数值“3”。
    //BMAP_STATUS_INVALID_KEY   非法密钥。对应数值“4”。
    //BMAP_STATUS_INVALID_REQUEST   非法请求。对应数值“5”。
    //BMAP_STATUS_PERMISSION_DENIED 没有权限。对应数值“6”。(自 1.1 新增)
    //BMAP_STATUS_SERVICE_UNAVAILABLE   服务不可用。对应数值“7”。(自 1.1 新增)
    //BMAP_STATUS_TIMEOUT   超时。对应数值“8”。(自 1.1 新增)
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

    // 轮播图
    var swiper = new Swiper('.neyred .swiper-container', {
        slidesPerView: 2.5,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true,
        observer:true,
        observeParents:true,
    });


    //导航
    $('.daohang').click(function(){
        $('.mask').fadeIn();
        $('.mapnav').fadeIn();
        $('.busntail_btn').css("zIndex","1000");
    });

    $('.mapnav .close').click(function(){
        $('.mask').fadeOut();
        $('.mapnav').fadeOut();
        $('.busntail_btn').css("zIndex","1");
    });

}


$(function(){
    tip();  //页面交互
    tab();
    setnavscroll(); //浏览器滚动条位置
    iplocalMap();
});
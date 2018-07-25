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

    //预定
    /*$('.lj_button button').click(function(){
        $('.mask').fadeIn();
        $('.busdakod_ord').fadeIn();
    });

    $('.busdakod_ord_foot .qx').click(function(){
        $('.mask').fadeOut();
        $('.busdakod_ord').fadeOut();
    });*/
    $('.lj_button button').click(function(){
        $('.mask').fadeIn();
        $('.busdakod_ord').fadeIn();
    });

    $('.mfyd_btn').click(function(){
        $('.mask').fadeOut();
        $('.busdakod_ord').fadeOut();
    });
}

//计数
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

//房间预订时间控件
var booktime = function(){
    function formatDate(now) {
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();

      return year + "-" + month + "-" + date;
    }

    var thisDate = formatDate(new Date()),
        nextDate = formatDate(new Date((new Date().getTime()) + 60*60*1000*24*3));

    var dateRange1 = new pickerDateRange('date1', {
        stopToday : false,
        isTodayValid : true,
        startDate: thisDate,
        endDate: nextDate,
        needCompare : false,
        defaultText : ' 离店 ',
        autoSubmit : false,
        inputTrigger : 'input_trigger1',
        theme : 'ta'
    });
}

$(function(){
    tip();  //页面交互
    count();
    booktime();
});
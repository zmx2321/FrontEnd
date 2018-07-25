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
    $('.lj_button_pt0 a').click(function(){
        $('.mask').fadeIn();
        $('.sharing').fadeIn();
    });

    /*$('.mask').click(function(){
        $(this).fadeOut();
    });*/

    $('.sharsuccess_close').click(function(){
        $('.mask').fadeOut();
        $('.share_success').fadeOut();
    });

    $('.share_next').click(function(){
        $('.share_success').fadeOut();
        $('.sharing').fadeIn();
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

//倒计时
var countdown = function(){
    var SysSecond;
    var InterValObj;
    var str = '';
    $(document).ready(function() {
        //这里获取倒计时的起始时间 
        // SysSecond = parseInt($("#remainSeconds").html());
        SysSecond = 10;
        InterValObj = window.setInterval(SetRemainTime, 1000);
    });
    function SetRemainTime() {
        if (SysSecond > 0) {
            SysSecond = SysSecond - 1;
            var second = Math.floor(SysSecond % 60);
            var minite = Math.floor((SysSecond / 60) % 60);
            var hour = Math.floor((SysSecond / 3600) % 24);
            var day = Math.floor((SysSecond / 3600) / 24);
            str += 
            `
                <ul>
                    <span>剩余</span>
                    <li>${hour}</li>
                    <li>${minite}</li>
                    <li>${second}</li>
                    <span>结束</span>
                </ul>
            `;
            $('.fitgrup_countime').html(str);

        } else {
            window.clearInterval(InterValObj);
            $('.fitgrup_start').hide();
            $('.fitgrup_fail').show();
        }
    }
}

$(function(){
    tip();  //页面交互
    countdown();    //倒计时
});
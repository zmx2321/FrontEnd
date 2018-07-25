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
    //reptadr_cont 高度
    var reptadr_cont = function(){
        var mymessbtn = $('.mymess_button'),
            reptadr_cont = $('.reptadr_cont');
            
        var winHeight = $(window).height(),
            mymessbtnHeight = mymessbtn.height() + parseInt(mymessbtn.css('margin-top'));

        reptadr_cont.css('height', winHeight - mymessbtnHeight);
    }

    reptadr_cont();

    $(window).resize(function() {
        reptadr_cont();
    });

    //radio
    $("input[name='reptadr']").change(function(){
        $(this).parent().parent().find('label').addClass('active').find('h1').text('已设为默认').parent().parent().parent().parent().siblings().find('label').removeClass('active').find('h1').text('设为默认');
    });

    //删除
    $('.reptadr_delete').click(function(){
        $('.mask').fadeIn();
    });

    $('.cancel').click(function(){
        $('.mask').fadeOut();
    });
}


$(function(){
    tip();  //页面交互
});
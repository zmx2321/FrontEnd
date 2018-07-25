//获取屏幕高度
var h = $(document).height();
$('.slide-container').height(h + 'px');
//下滑
var strat = 0;
$('.pic-con').on('touchstart', function(e) {
    strat = e.originalEvent.targetTouches[0].pageY;
});
$('.pic-con').on('touchend', function(e) {
    var end = e.originalEvent.changedTouches[0].pageY;
    var index = Number($(this).attr('data-num'));
    var len = $('.pic-con').length - 1;
    if (strat - end > 0) {
        //上滑
        if (index != len) {
            $('.pic-con').eq(index).css({
                'transform': 'translateY(-100%)',
                '-webkit-transform': 'translateY(-100%)',
            });
            $('.pic-con').eq(index + 1).css({
                'transform': 'translateY(0)',
                '-webkit-transform': 'translateY(0)',
            });
        }
    } else {
        if (index != 0) {
            $('.pic-con').eq(index).css({
                'transform': 'translateY(100%)',
                '-webkit-transform': 'translateY(100%)',
            });
            $('.pic-con').eq(index - 1).css({
                'transform': 'translateY(0)',
                '-webkit-transform': 'translateY(0)',
            });
        }
    }
    if (index == 0) {
        $('#dir').attr('src', 'images/slide_down.png');
    } else if (index == $('.pic-con').length - 1) {
        $('#dir').attr('src', 'images/slide_up.png');
    }
});

$(document).ready(function () {
    //实战项目
    //$('.over-height').scrollTop(0);
    var sub_li = $('.main-resume-3 .sub-li:gt(0)');
    var default_num = 0;
    sub_li.click(function () {
        var data_num = $(this).attr('data-num');
        if(data_num == default_num){
            sub_li.find('.sub-ul-project').hide();
        }else{
            sub_li.find('.project-name').removeClass('active');
            sub_li.find('.sub-ul-project').hide();
            $(this).find('.project-name').addClass('active');
            $(this).find('.sub-ul-project').fadeIn(300);
        }
        default_num = data_num;
        console.log(data_num);
        console.log(default_num);

    });
    //获取屏幕高度
    var h = $(document).height();
    $('.resume-box').height(h + 'px');
    var index_0 = '<div class="late-show late-show-1">前端</div>\n' +
        '<div class="late-msg">求职简历</div>\n' +
        '<div class="late-show late-show-2">xxx</div>';
    //进入页面
    $('.main-resume').eq(0).find('.main-wrap').append(index_0);
    //下滑
    var strat = 0;
    $('.main-resume').on('touchstart', function (e) {
        strat = e.originalEvent.targetTouches[0].pageY;
    });
    $('.main-resume').on('touchend', function (e) {
        var end = e.originalEvent.changedTouches[0].pageY;
        var index = Number($(this).attr('data-num'));
        var len = $('.main-resume').length - 1;
        if (strat - end > 20) { //上滑
            if (index != len) {
                if (index == 1) {
                    skillPage();
                }
                $('.main-resume').eq(index).css({
                    'transform': 'translateY(-100%)',
                    '-webkit-transform': 'translateY(-100%)',
                });
                $('.main-resume').eq(index + 1).css({
                    'transform': 'translateY(0)',
                    '-webkit-transform': 'translateY(0)',
                });
            }
        } else if (end - strat > 20) {
            if (index != 0) {
                if (index == 1) {
                    //进入页面
                    $('.main-resume').eq(index - 1).find('.main-wrap').empty();
                    $('.main-resume').eq(index - 1).find('.main-wrap').append(index_0);
                }
                if (index == 3) {
                    skillPage();
                }
                $('.main-resume').eq(index).css({
                    'transform': 'translateY(100%)',
                    '-webkit-transform': 'translateY(100%)',
                });
                $('.main-resume').eq(index - 1).css({
                    'transform': 'translateY(0)',
                    '-webkit-transform': 'translateY(0)',
                });
            }
        }
        if (index == 1) {
            $('#dir').attr('src', 'images/slide_down.png');
        } else if (index == len - 1) {
            $('#dir').attr('src', 'images/slide_up.png');
        }
    });
});

//下载文件


//专业技能
function skillPage() {
    $('.main-resume-2 .con').empty();
    var con_arr = ['HTML(5)', 'CSS(3)', 'JavaScript', 'JQuery', 'Ajax', 'DOM', 'Bootstrap',
        'd3', 'echarts', 'Vue', 'es6', 'stylus', 'W3C', 'gulp', 'PHP', 'PS'];
    var off_more = 0;
    var con_arr_index = 0;
    //动态添加con_arr
    for (let x = 1; x <= 7; x++) {
        var span = '';
        if (x >= 5) {
            off_more = off_more - 2;
        }
        for (let i = 0; i < (x + off_more); i++) {
            span += '<span>' + con_arr[con_arr_index] + '</span>';
            con_arr_index++;
        }
        var div = '<div class="border-ele">' + span + '</div>';
        $(div).append(span);

        $('.main-resume-2 .con').append($(div));
    }
    var span_len = $('.main-resume-2 .con span').length;
    $('.main-resume-2 .con span').eq(0).animate({'opacity': 1}, 160);
    var show_span_index = 1;
    setTimeout(function () {
        var timer = setInterval(function () {
            $('.main-resume-2 .con span').eq(show_span_index).animate({'opacity': 1}, 160);
            show_span_index++;
            if (show_span_index == span_len) {
                clearInterval(timer);
            }
        }, 200);
    }, 700);
}
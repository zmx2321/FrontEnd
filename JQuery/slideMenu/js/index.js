$(function() {
    var flag = true;
    $('#menu-btn').click(function(e) {
        if (flag) {
            e.stopPropagation();
            $('#menu').css('display', 'block');
            $('.con').css({
                margin: 'auto',
                'overflow-x': 'hidden'
            }).animate({
                top: '18%',
                bottom: '18%',
                left: '55%',
                width: '82%',
                height: '82%'
            }, 300, function() {
                $('.menu-show li').each(function(i) {
                    $(this).css({
                        '-webkit-animation': 'menu .8s ' + 0.1 * i + 's',
                        '-webkit-animation-fill-mode': 'forwards'
                    });
                });
            });
            flag = false;
        }
    });
    $('.con').click(function(e) {
        flag = true;
        e.preventDefault();
        $('#menu').css('display', 'none');
        $(this).animate({
            top: 0,
            left: 0,
            bottom: 0,
            width: '100%',
            height: '100%'
        }, 300);
        $('.menu-show li').css('-webkit-animation', 'returnContent');
    });
});

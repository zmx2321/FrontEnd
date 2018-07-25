$(document).ready(function() {
    $('.switch-tab>li').click(function() {
        var s = $('.switch-tab>li').index(this);
        $('body,html').animate({
            scrollTop: $('.tab-content>.tab-panel:eq(' + s + ')').offset().top - 50
        }, 200);
        // $('.switch-tab>li:eq('+s+')').addClass('active').siblings().removeClass('active');
    });

    var DT = $('.switch-tab').offset().top;
    $(window).scroll(function() {
        var wt = $(window).scrollTop()
          , l = $('.tab-content>.tab-panel')
          , s = l.length - 1;
        if (wt < DT || wt >= l.last().offset().top + l.last().height() + 50) {
            $('.switch-tab').removeClass('fixed');
            $('.switch-tab>li:first').addClass('active').siblings().removeClass('active');
        } else {
            $('.switch-tab').addClass('fixed');
            for (var i = 0; i < s; i++) {
                if (wt >= parseInt(l.eq(i).offset().top - 50) && wt < parseInt(l.eq(i + 1).offset().top - 50)) {
                    s = i;
                    break;
                }
            }
            $('.switch-tab>li:eq(' + s + ')').addClass('active').siblings().removeClass('active');
        }
    });
});

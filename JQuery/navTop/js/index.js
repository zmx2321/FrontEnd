$(document).ready(function() {
    $(window).scroll(function() {
        var window_top = $(window).scrollTop();
        var div_top = $('.add').offset().top;
        if (window_top > div_top) {
            $('.nav').addClass('navfix');
        }
        else {
            $('.nav').removeClass('navfix');
        }
    });
});

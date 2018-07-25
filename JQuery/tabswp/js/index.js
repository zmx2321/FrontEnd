$(function () {
        var mySwiper = new Swiper('.swiper-container', {
            onSlideChangeEnd: function (swiper) {
                var j = mySwiper.activeIndex;
                $('.maple-tab li').removeClass('active').eq(j).addClass('active');
                var content_height = $(".content_div").eq(j).height();
                var slide_height = $(".swiper-slide").eq(j).height(content_height);
                $(".swiper-wrapper").css("height", content_height);
                $(".swiper-container").css("height", content_height);
            }
        })
        /*列表切换*/
        $('.maple-tab li').on('click', function (e) {
            e.preventDefault();
            //得到当前索引
            var i = $(this).index();
            $('.maple-tab li').removeClass('active').eq(i).addClass('active');

            var content_height = $(".content_div").eq(i).height();
            var slide_height = $(".swiper-slide").eq(i).height(content_height);
            $(".swiper-wrapper").css("height", content_height);
            $(".swiper-container").css("height", content_height);
            mySwiper.slideTo(i, 200, false);

        });
    });
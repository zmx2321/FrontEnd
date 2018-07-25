        $(document).ready(function(){
                // 小黄点
                $('.center-top .yellow-box').each(function (i) {
                    $(this).fadeIn(2000 + i * 200);
                });
                run();
                var timer = setInterval(run, 6000);
                function run() {
                    //起点到终点的差值
                    setTimeout(function () {
                        $('.center-top .yellow-box').each(function (i) {
                            $(this).css('top', '550px');
                        });
                        var d = [1020, 980, 940, 900, 860, 820, 780]
                        setTimeout(function () {
                            $('.center-top .yellow-box').each(function (i) {
                                $(this).css('left', d[i] + 'px');
                            });
                            setTimeout(function () {
                                $('.center-top .yellow-box').each(function (i) {
                                    $(this).fadeOut();
                                    var original_data = [{top: 170, left: 620}, {top: 490, left: 520}, {top: 300, left: 500}, 
                                    {top: 520,left: 450}, {top: 330, left: 430}, {top: 200, left: 400}, {top: 300, left: 320}];
                                    $('.center-top .yellow-box').each(function (i) {
                                        $(this).css({
                                            opacity: 1,
                                            position: 'absolute',
                                            top: original_data[i].top + 'px',
                                            left: original_data[i].left + 'px'
                                        }).fadeIn(1000 + i * 200);
                                    });
                                });
                            }, 2000);
                        }, 800);
                    }, 3000);
                }
            });
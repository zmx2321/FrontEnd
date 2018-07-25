//轮播图
var poySwiper = function(){
    // 首页轮播图
    var swiper = new Swiper('.poyctyt_banner .swiper-container', {
        pagination: '.poyctyt_banner .swiper-pagination',
        autoplay: 2000,
        slidesPerView: 1,
        paginationClickable: true,
        spaceBetween: 0,
        loop: true,
        observer:true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,  //修改swiper的父元素时，自动初始化swiper
    });

    // 找村落轮播图
    var swiper = new Swiper('.find_village_ban .swiper-container', {
        slidesPerView: 3.6,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true,
        observer:true,
        observeParents:true,
    });
}


//选项卡
var tab = function() {
    // //首页选项卡
    //tabback();
    /*$('ul.poyctyt_nav_btn li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('article.poycty_cont section').eq($(this).index()).show().siblings().hide();
    });*/
    /*var mySwiper = new Swiper('.tabswp_cont', {
        onSlideChangeEnd: function (swiper) {
            var j = mySwiper.activeIndex;
            $('ul.poyctyt_nav_btn li').removeClass('active').eq(j).addClass('active');
            var content_height = $('article.poycty_cont section').eq(j).height();
            var slide_height = $(".tabswp_cont .swiper-slide").eq(j).height(content_height);
            $(".tabswp_cont .swiper-wrapper").css("height", content_height);
            $(".tabswp_cont").css("height", content_height);
        }
    })
    //列表切换
    $('ul.poyctyt_nav_btn li').on('click', function (e) {
        e.preventDefault();
        //得到当前索引
        var i = $(this).index();
        $('ul.poyctyt_nav_btn li').removeClass('active').eq(i).addClass('active');

        var content_height = $(".content_div").eq(i).height();
        var slide_height = $(".swiper-slide").eq(i).height(content_height);
        $(".swiper-wrapper").css("height", content_height);
        $(".swiper-container").css("height", content_height);
        // $('article.poycty_cont section').eq(i).show().siblings().hide();
        mySwiper.slideTo(i, 200, false);

    });*/

     /**
     * swiper高度自适应
     * [mirAutoHeight swiper高度自适应]
     * @param  {[type]} i       [索引]
     * @param  {[type]} mribtn  [选项卡按钮]
     * @param  {[type]} tabitm  [内容主体部分]
     * @param  {[type]} slide   [内容主体外部盒子]
     * @param  {[type]} swipwap [swiper盒子]
     * @param  {[type]} swipcot [swiper主体部分]
     * @return {[type]}         [description]
     */
    function mirAutoHeight(i, mribtn, tabitm, slide, swipwap, swipcot){
        mribtn.removeClass('active').eq(i).addClass('active');

        var tabitm = tabitm.eq(i);

        swipwap.css("height", tabitm.height());  //swiper-wrapper高度
        swipcot.css("height", tabitm.height());  //swiper-container高度
    }

    // 滑动
    var mrifoTabSwiper = new Swiper('.tabswp_cont', {
        onTransitionEnd: function (swiper) {
            mirAutoHeight(mrifoTabSwiper.activeIndex, $('.poyctyt_nav ul li'), $(".tabswp_cont section"), $(".tabswp_cont .swiper-slide"), $(".tabswp_cont .swiper-wrapper"), $(".tabswp_cont"));
        }
    })
    
    // 列表切换
    $('.poyctyt_nav ul li').on('click', function (e) {
        mirAutoHeight($(this).index(), $('.poyctyt_nav ul li'), $(".tabswp_cont section"), $(".tabswp_cont .swiper-slide"), $(".tabswp_cont .swiper-wrapper"), $(".tabswp_cont"));
        mrifoTabSwiper.slideTo($(this).index(), 200, false);
    });

    //玩主题
    $('body').on('click', '.play_theme_ban li',  function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.poycty_theme_news .list').eq($(this).index()).show().siblings().hide();
    }); 

    //做地主
    $('body').on('click', '.be_landlord_ban li',  function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.poycty_landlord_news .list').eq($(this).index()).show().siblings().hide();
    }); 

    //投村产
    $('body').on('click', '.be_villagers_ban li',  function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.poycty_villagers_news .list').eq($(this).index()).show().siblings().hide();
    }); 

    //拼土货
    $('body').on('click', '.fight_tuhuo_ban li',  function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.poycty_tuhuo_news .list').eq($(this).index()).show().siblings().hide();
    }); 

    $('.zcl_bq li').click(function(){
        $(this).toggleClass('active');
    });

    //点击加载省份
    $('.poyctyt_select').toggle(
        function(){
            city_province();
            $('.poyctyt_select span + b').css({transform: 'translateY(-30%) rotate(0deg)'});
            $('.addsel').slideDown();
        },
        function(){
            $('.poyctyt_select span + b').css({transform: 'translateY(-30%) rotate(180deg)'});
            $('.addsel').slideUp();
        }
    );

    $('body').on('click', '.addsel li', function(){
        $('.poyctyt_select span + b').css({transform: 'translateY(-30%) rotate(180deg)'});
        $('.addsel').slideUp();
        $('.poyctyt_select span').text($(this).text());
        console.log($('.addsel').css('display'));
    });


}

//浏览器滚动条位置
var setnavscroll = function(){
    $(window).scroll(function(){
        var window_top = $(window).scrollTop();
        var div_top = $('.navbar').offset().top;

        if (window_top > div_top) {
            $('.poyctyt_nav').addClass('poyctyt_nav_fix');
            $('.search').addClass('search_fix');
            $('.navbar').height($('.poyctyt_nav').height());
        } else {
            $('.poyctyt_nav').removeClass('poyctyt_nav_fix');
            $('.search').removeClass('search_fix');
            $('.navbar').height(0);
        }
    });
}

//回到顶部
var scrolltop = function(){
    $('.scrolltop').click(function(){
        var speed=200;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        setnavscroll(); //导航栏
        return false;
    });
}

//获取省份
var city_province = function(){
    $.ajax({
        url: "mock/city_province.json",
        type:"get",
        dataType:"json",
        success: function(data,status){
            var str = '';
            var city_province = data.data;
            
            for(var i=0; i<city_province.length; i++){
                var citynam = city_province[i].name;
                str += "<li>" + citynam + "</li>";
            }
            $('.addsel ul').html(str);
        },
        error: function(){
            console.log("false");
        }        
    });
}

//三级联动
var sel_address = function(){
    $('.mask').fadeIn();
    $('.address_wrap').fadeIn();

    $(".adc_s").each(function() {
        var url = "mock/area.json";
        var areaJson;
        var temp_html;
        var oProvince = $(this).find(".province");
        var oCity = $(this).find(".city");
        var oDistrict = $(this).find(".district");
        //初始化省
        var province = function() {
            $.each(areaJson, function(i, province) {
                temp_html += "<option value='" + province.p + "'>" + province.p + "</option>";
            });
            oProvince.html(temp_html);
            city();
        };
        //赋值市
        var city = function() {
            temp_html = "";
            var n = oProvince.get(0).selectedIndex;
            $.each(areaJson[n].c, function(i, city) {
                temp_html += "<option value='" + city.ct + "'>" + city.ct + "</option>";
            });
            oCity.html(temp_html);
            district();
        };
        //赋值县
        var district = function() {
            temp_html = "";
            var m = oProvince.get(0).selectedIndex;
            var n = oCity.get(0).selectedIndex;
            if (typeof (areaJson[m].c[n].d) == "undefined") {
                oDistrict.css("display", "none");
            } else {
                oDistrict.css("display", "inline");
                $.each(areaJson[m].c[n].d, function(i, district) {
                    temp_html += "<option value='" + district.dt + "'>" + district.dt + "</option>";
                });
                oDistrict.html(temp_html);
            };
        };
        //选择省改变市
        oProvince.change(function() {
            city();
        });
        //选择市改变县
        oCity.change(function() {
            district();
            
        });
        //获取json数据
        $.getJSON(url, function(data) {
            areaJson = data;
            province();
        });
    });

    $('body').on('click', '.address_btn',  function(){
        $('.mask').fadeOut();
        $('.address_wrap').fadeOut();
    });
}

//分页
var commPageAjax = {
    current: 3,

    reset: function(){
        $(window).unbind('scroll'); //初始化滚动事件

        setnavscroll(); //导航栏

        $('.scobt').hide();
    },

    //玩主题-热门
    wztAjax_rm: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/theme_rm_cot.json",
                type:"get",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success: function(data, status){
                    var theme_rm_cot = data.data;
                    var str = '';

                    if(theme_rm_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${theme_rm_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_rm_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_rm_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_rm_cot[i]["title"]}</li>
                                                    <li>${theme_rm_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_rm_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_rm_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_rm_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_rm_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_rm_cot ul#poyct_wzt_cont').html(str);
                    } else {
                        for(var i=0; i<theme_rm_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${theme_rm_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_rm_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_rm_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_rm_cot[i]["title"]}</li>
                                                    <li>${theme_rm_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_rm_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_rm_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_rm_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_rm_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_rm_cot ul#poyct_wzt_cont').html(str);
                    }
                },
                error: function(){
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/theme_rm_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var theme_rm_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<theme_rm_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${theme_rm_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${theme_rm_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${theme_rm_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${theme_rm_cot[i]["title"]}</li>
                                                        <li>${theme_rm_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${theme_rm_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标${theme_rm_cot[i]["targetPerson"]}人</li>
                                                        <li>已参加${theme_rm_cot[i]["alreadyParticipated"]}人</li>
                                                        <li>剩余${theme_rm_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.theme_rm_cot ul#poyct_wzt_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //玩主题-a
    wztAjax_a: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/theme_a_cot.json",
                type:"get",
                dataType:"json",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success: function(data, status){
                    var theme_a_cot = data.data;
                    var str = '';

                    if(theme_a_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${theme_a_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_a_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_a_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_a_cot[i]["title"]}</li>
                                                    <li>${theme_a_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_a_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_a_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_a_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_a_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_a_cot ul#poyct_wzt_cont').html(str);
                    } else {
                        for(var i=0; i<theme_a_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${theme_a_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_a_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_a_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_a_cot[i]["title"]}</li>
                                                    <li>${theme_a_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_a_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_a_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_a_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_a_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_a_cot ul#poyct_wzt_cont').html(str);
                    }
                },
                error: function(){
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/theme_a_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var theme_a_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            console.log(count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<theme_a_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${theme_a_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${theme_a_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${theme_a_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${theme_a_cot[i]["title"]}</li>
                                                        <li>${theme_a_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${theme_a_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标${theme_a_cot[i]["targetPerson"]}人</li>
                                                        <li>已参加${theme_a_cot[i]["alreadyParticipated"]}人</li>
                                                        <li>剩余${theme_a_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.theme_a_cot ul#poyct_wzt_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //玩主题-b
    wztAjax_b: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/theme_b_cot.json",
                type:"get",
                dataType:"json",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success: function(data, status){
                    var theme_b_cot = data.data;
                    var str = '';

                    if(theme_b_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${theme_b_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_b_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_b_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_b_cot[i]["title"]}</li>
                                                    <li>${theme_b_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_b_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_b_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_b_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_b_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_b_cot ul#poyct_wzt_cont').html(str);
                    } else {
                        for(var i=0; i<theme_b_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${theme_b_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_b_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_b_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_b_cot[i]["title"]}</li>
                                                    <li>${theme_b_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_b_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_b_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_b_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_b_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_b_cot ul#poyct_wzt_cont').html(str);
                    }
                },
                error: function(){
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/theme_b_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var theme_b_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            console.log(count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<theme_b_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${theme_b_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${theme_b_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${theme_b_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${theme_b_cot[i]["title"]}</li>
                                                        <li>${theme_b_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${theme_b_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标${theme_b_cot[i]["targetPerson"]}人</li>
                                                        <li>已参加${theme_b_cot[i]["alreadyParticipated"]}人</li>
                                                        <li>剩余${theme_b_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.theme_b_cot ul#poyct_wzt_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //玩主题-c
    wztAjax_c: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/theme_c_cot.json",
                type:"get",
                dataType:"json",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success: function(data, status){
                    var theme_c_cot = data.data;
                    var str = '';

                    if(theme_c_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${theme_c_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_c_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_c_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_c_cot[i]["title"]}</li>
                                                    <li>${theme_c_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_c_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_c_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_c_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_c_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_c_cot ul#poyct_wzt_cont').html(str);
                    } else {
                        for(var i=0; i<theme_c_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${theme_c_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_c_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_c_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_c_cot[i]["title"]}</li>
                                                    <li>${theme_c_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_c_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_c_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_c_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_c_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_c_cot ul#poyct_wzt_cont').html(str);
                    }
                },
                error: function(){
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/theme_c_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var theme_c_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            console.log(count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<theme_c_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${theme_c_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${theme_c_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${theme_c_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${theme_c_cot[i]["title"]}</li>
                                                        <li>${theme_c_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${theme_c_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标${theme_c_cot[i]["targetPerson"]}人</li>
                                                        <li>已参加${theme_c_cot[i]["alreadyParticipated"]}人</li>
                                                        <li>剩余${theme_c_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.theme_c_cot ul#poyct_wzt_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //玩主题-d
    wztAjax_d: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/theme_d_cot.json",
                type:"get",
                dataType:"json",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success: function(data, status){
                    var theme_d_cot = data.data;
                    var str = '';

                    if(theme_d_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${theme_d_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_d_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_d_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_d_cot[i]["title"]}</li>
                                                    <li>${theme_d_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_d_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_d_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_d_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_d_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_d_cot ul#poyct_wzt_cont').html(str);
                    } else {
                        for(var i=0; i<theme_d_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${theme_d_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_d_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_d_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_d_cot[i]["title"]}</li>
                                                    <li>${theme_d_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_d_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_d_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_d_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_d_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_d_cot ul#poyct_wzt_cont').html(str);
                    }
                },
                error: function(){
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/theme_d_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var theme_d_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            console.log(count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<theme_d_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${theme_d_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${theme_d_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${theme_d_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${theme_d_cot[i]["title"]}</li>
                                                        <li>${theme_d_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${theme_d_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标${theme_d_cot[i]["targetPerson"]}人</li>
                                                        <li>已参加${theme_d_cot[i]["alreadyParticipated"]}人</li>
                                                        <li>剩余${theme_d_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.theme_d_cot ul#poyct_wzt_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //玩主题-e
    wztAjax_e: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/theme_e_cot.json",
                type:"get",
                dataType:"json",
                dataType:"json",
                /*data: {
                    current: current,     //每页数据
                    pageIndex: pageIndex  //当前页码
                },*/
                success: function(data, status){
                    var theme_e_cot = data.data;
                    var str = '';

                    if(theme_e_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${theme_e_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_e_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_e_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_e_cot[i]["title"]}</li>
                                                    <li>${theme_e_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_e_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_e_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_e_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_e_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_e_cot ul#poyct_wzt_cont').html(str);
                    } else {
                        for(var i=0; i<theme_e_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${theme_e_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${theme_e_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${theme_e_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${theme_e_cot[i]["title"]}</li>
                                                    <li>${theme_e_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${theme_e_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标${theme_e_cot[i]["targetPerson"]}人</li>
                                                    <li>已参加${theme_e_cot[i]["alreadyParticipated"]}人</li>
                                                    <li>剩余${theme_e_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.theme_e_cot ul#poyct_wzt_cont').html(str);
                    }
                },
                error: function(){
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/theme_e_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var theme_e_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            console.log(count);
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<theme_e_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${theme_e_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${theme_e_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${theme_e_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${theme_e_cot[i]["title"]}</li>
                                                        <li>${theme_e_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${theme_e_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标${theme_e_cot[i]["targetPerson"]}人</li>
                                                        <li>已参加${theme_e_cot[i]["alreadyParticipated"]}人</li>
                                                        <li>剩余${theme_e_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.theme_e_cot ul#poyct_wzt_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //做地主-热门
    zdzAjax_rm: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/landlord_rm_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var landlord_rm_cot = data.data;
                    var str = '';

                    if(landlord_rm_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_rm_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_rm_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_rm_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_rm_cot[i]["title"]}</li>
                                                    <li>${landlord_rm_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_rm_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_rm_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_rm_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_rm_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_rm_cot ul#poyct_zdz_cont').html(str);
                    } else {
                        for(var i=0; i<landlord_rm_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_rm_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_rm_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_rm_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_rm_cot[i]["title"]}</li>
                                                    <li>${landlord_rm_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_rm_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_rm_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_rm_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_rm_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_rm_cot ul#poyct_zdz_cont').html(str);
                    }
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/landlord_rm_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var landlord_rm_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count); 
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<landlord_rm_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${landlord_rm_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${landlord_rm_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${landlord_rm_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${landlord_rm_cot[i]["title"]}</li>
                                                        <li>${landlord_rm_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${landlord_rm_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标￥${landlord_rm_cot[i]["targetPrice"]}</li>
                                                        <li>已筹￥${landlord_rm_cot[i]["alreadyPrice"]}</li>
                                                        <li>剩余${landlord_rm_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.landlord_rm_cot ul#poyct_zdz_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //做地主-a
    zdzAjax_a: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/landlord_a_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var landlord_a_cot = data.data;
                    var str = '';

                    if(landlord_a_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_a_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_a_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_a_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_a_cot[i]["title"]}</li>
                                                    <li>${landlord_a_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_a_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_a_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_a_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_a_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_a_cot ul#poyct_zdz_cont').html(str);
                    } else {
                        for(var i=0; i<landlord_a_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_a_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_a_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_a_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_a_cot[i]["title"]}</li>
                                                    <li>${landlord_a_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_a_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_a_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_a_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_a_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_a_cot ul#poyct_zdz_cont').html(str);
                    }
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/landlord_a_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var landlord_a_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count); 
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<landlord_a_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${landlord_a_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${landlord_a_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${landlord_a_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${landlord_a_cot[i]["title"]}</li>
                                                        <li>${landlord_a_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${landlord_a_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标￥${landlord_a_cot[i]["targetPrice"]}</li>
                                                        <li>已筹￥${landlord_a_cot[i]["alreadyPrice"]}</li>
                                                        <li>剩余${landlord_a_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.landlord_a_cot ul#poyct_zdz_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //做地主-b
    zdzAjax_b: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/landlord_b_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var landlord_b_cot = data.data;
                    var str = '';

                    if(landlord_b_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_b_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_b_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_b_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_b_cot[i]["title"]}</li>
                                                    <li>${landlord_b_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_b_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_b_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_b_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_b_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_b_cot ul#poyct_zdz_cont').html(str);
                    } else {
                        for(var i=0; i<landlord_b_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_b_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_b_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_b_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_b_cot[i]["title"]}</li>
                                                    <li>${landlord_b_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_b_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_b_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_b_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_b_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_b_cot ul#poyct_zdz_cont').html(str);
                    }
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/landlord_b_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var landlord_b_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count); 
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<landlord_b_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${landlord_b_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${landlord_b_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${landlord_b_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${landlord_b_cot[i]["title"]}</li>
                                                        <li>${landlord_b_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${landlord_b_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标￥${landlord_b_cot[i]["targetPrice"]}</li>
                                                        <li>已筹￥${landlord_b_cot[i]["alreadyPrice"]}</li>
                                                        <li>剩余${landlord_b_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.landlord_b_cot ul#poyct_zdz_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //做地主-c
    zdzAjax_c: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/landlord_c_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var landlord_c_cot = data.data;
                    var str = '';

                    if(landlord_c_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_c_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_c_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_c_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_c_cot[i]["title"]}</li>
                                                    <li>${landlord_c_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_c_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_c_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_c_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_c_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_c_cot ul#poyct_zdz_cont').html(str);
                    } else {
                        for(var i=0; i<landlord_c_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_c_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_c_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_c_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_c_cot[i]["title"]}</li>
                                                    <li>${landlord_c_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_c_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_c_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_c_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_c_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_c_cot ul#poyct_zdz_cont').html(str);
                    }
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/landlord_c_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var landlord_c_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count); 
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<landlord_c_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${landlord_c_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${landlord_c_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${landlord_c_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${landlord_c_cot[i]["title"]}</li>
                                                        <li>${landlord_c_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${landlord_c_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标￥${landlord_c_cot[i]["targetPrice"]}</li>
                                                        <li>已筹￥${landlord_c_cot[i]["alreadyPrice"]}</li>
                                                        <li>剩余${landlord_c_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.landlord_c_cot ul#poyct_zdz_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //做地主-d
    zdzAjax_d: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/landlord_d_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var landlord_d_cot = data.data;
                    var str = '';

                    if(landlord_d_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_d_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_d_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_d_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_d_cot[i]["title"]}</li>
                                                    <li>${landlord_d_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_d_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_d_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_d_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_d_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_d_cot ul#poyct_zdz_cont').html(str);
                    } else {
                        for(var i=0; i<landlord_d_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${landlord_d_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${landlord_d_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${landlord_d_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${landlord_d_cot[i]["title"]}</li>
                                                    <li>${landlord_d_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${landlord_d_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${landlord_d_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${landlord_d_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${landlord_d_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.landlord_d_cot ul#poyct_zdz_cont').html(str);
                    }
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/landlord_d_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var landlord_d_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count); 
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<landlord_d_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${landlord_d_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${landlord_d_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${landlord_d_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${landlord_d_cot[i]["title"]}</li>
                                                        <li>${landlord_d_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${landlord_d_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标￥${landlord_d_cot[i]["targetPrice"]}</li>
                                                        <li>已筹￥${landlord_d_cot[i]["alreadyPrice"]}</li>
                                                        <li>剩余${landlord_d_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.landlord_d_cot ul#poyct_zdz_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //投村产-热门
    dcmAjax_rm: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/villagers_rm_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var villagers_rm_cot = data.data;
                    var str = '';

                    if(villagers_rm_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${villagers_rm_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${villagers_rm_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${villagers_rm_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${villagers_rm_cot[i]["title"]}</li>
                                                    <li>${villagers_rm_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${villagers_rm_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${villagers_rm_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${villagers_rm_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${villagers_rm_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.villagers_rm_cot ul#poyct_dcm_cont').html(str);
                    } else {
                        for(var i=0; i<villagers_rm_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${villagers_rm_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${villagers_rm_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${villagers_rm_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${villagers_rm_cot[i]["title"]}</li>
                                                    <li>${villagers_rm_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${villagers_rm_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${villagers_rm_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${villagers_rm_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${villagers_rm_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.villagers_rm_cot ul#poyct_dcm_cont').html(str);
                    }
                },
                error: function () {
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/villagers_rm_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var villagers_rm_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            var current = 5;   
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<villagers_rm_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${villagers_rm_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${villagers_rm_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${villagers_rm_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${villagers_rm_cot[i]["title"]}</li>
                                                        <li>${villagers_rm_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${villagers_rm_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标￥${villagers_rm_cot[i]["targetPrice"]}</li>
                                                        <li>已筹￥${villagers_rm_cot[i]["alreadyPrice"]}</li>
                                                        <li>剩余${villagers_rm_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.villagers_rm_cot ul#poyct_dcm_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //投村产-a
    dcmAjax_a: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/villagers_a_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var villagers_a_cot = data.data;
                    var str = '';

                    if(villagers_a_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${villagers_a_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${villagers_a_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${villagers_a_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${villagers_a_cot[i]["title"]}</li>
                                                    <li>${villagers_a_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${villagers_a_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${villagers_a_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${villagers_a_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${villagers_a_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.villagers_a_cot ul#poyct_dcm_cont').html(str);
                    } else {
                        for(var i=0; i<villagers_a_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${villagers_a_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${villagers_a_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${villagers_a_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${villagers_a_cot[i]["title"]}</li>
                                                    <li>${villagers_a_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${villagers_a_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${villagers_a_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${villagers_a_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${villagers_a_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.villagers_a_cot ul#poyct_dcm_cont').html(str);
                    }
                },
                error: function () {
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/villagers_a_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var villagers_a_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            var current = 5;   
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<villagers_a_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${villagers_a_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${villagers_a_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${villagers_a_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${villagers_a_cot[i]["title"]}</li>
                                                        <li>${villagers_a_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${villagers_a_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标￥${villagers_a_cot[i]["targetPrice"]}</li>
                                                        <li>已筹￥${villagers_a_cot[i]["alreadyPrice"]}</li>
                                                        <li>剩余${villagers_a_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.villagers_a_cot ul#poyct_dcm_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //投村产-b
    dcmAjax_b: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/villagers_b_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var villagers_b_cot = data.data;
                    var str = '';

                    if(villagers_b_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${villagers_b_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${villagers_b_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${villagers_b_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${villagers_b_cot[i]["title"]}</li>
                                                    <li>${villagers_b_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${villagers_b_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.villagers_b_cot ul#poyct_dcm_cont').html(str);
                    } else {
                        for(var i=0; i<villagers_b_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${villagers_b_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${villagers_b_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${villagers_b_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${villagers_b_cot[i]["title"]}</li>
                                                    <li>${villagers_b_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${villagers_b_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.villagers_b_cot ul#poyct_dcm_cont').html(str);
                    }
                },
                error: function () {
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/villagers_b_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var villagers_b_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            var current = 5;   
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<villagers_b_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${villagers_b_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${villagers_b_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${villagers_b_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${villagers_b_cot[i]["title"]}</li>
                                                        <li>${villagers_b_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${villagers_b_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.villagers_b_cot ul#poyct_dcm_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //投村产-c
    dcmAjax_c: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/villagers_c_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var villagers_c_cot = data.data;
                    var str = '';

                    if(villagers_c_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${villagers_c_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${villagers_c_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${villagers_c_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${villagers_c_cot[i]["title"]}</li>
                                                    <li>${villagers_c_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${villagers_c_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${villagers_c_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${villagers_c_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${villagers_c_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.villagers_c_cot ul#poyct_dcm_cont').html(str);
                    } else {
                        for(var i=0; i<villagers_c_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${villagers_c_cot[i]["url"]}">
                                        <dl>
                                            <dt class="poyctcnt_pic">
                                                <img src='${villagers_c_cot[i]["imgs"]}'>
                                                <span class="tit_tab">${villagers_c_cot[i]["imglab"]}</span>
                                            </dt>
                                            <dd class="poyctcnt_txt">
                                                <ul class="poyctcnt_txt_nam">
                                                    <li>${villagers_c_cot[i]["title"]}</li>
                                                    <li>${villagers_c_cot[i]["statu"]}</li>
                                                </ul>
                                                <div class="poyctcnt_txt_p">
                                                    <p>
                                                        ${villagers_c_cot[i]["introduction"]}
                                                    </p>
                                                </div>
                                                <div class="poyctcnt_lab_bar">
                                                    <div class="polabbar_result"></div>
                                                </div>
                                                <ul class="poyctcnt_lab">
                                                    <li>目标￥${villagers_c_cot[i]["targetPrice"]}</li>
                                                    <li>已筹￥${villagers_c_cot[i]["alreadyPrice"]}</li>
                                                    <li>剩余${villagers_c_cot[i]["surplusDay"]}天</li>
                                                </ul>
                                            </dd>
                                        </dl>
                                    </a>
                                </li>`;
                        }
                        $('.villagers_c_cot ul#poyct_dcm_cont').html(str);
                    }
                },
                error: function () {
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/villagers_c_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var villagers_c_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            var current = 5;   
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<villagers_c_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${villagers_c_cot[i]["url"]}">
                                            <dl>
                                                <dt class="poyctcnt_pic">
                                                    <img src='${villagers_c_cot[i]["imgs"]}'>
                                                    <span class="tit_tab">${villagers_c_cot[i]["imglab"]}</span>
                                                </dt>
                                                <dd class="poyctcnt_txt">
                                                    <ul class="poyctcnt_txt_nam">
                                                        <li>${villagers_c_cot[i]["title"]}</li>
                                                        <li>${villagers_c_cot[i]["statu"]}</li>
                                                    </ul>
                                                    <div class="poyctcnt_txt_p">
                                                        <p>
                                                            ${villagers_c_cot[i]["introduction"]}
                                                        </p>
                                                    </div>
                                                    <div class="poyctcnt_lab_bar">
                                                        <div class="polabbar_result"></div>
                                                    </div>
                                                    <ul class="poyctcnt_lab">
                                                        <li>目标￥${villagers_c_cot[i]["targetPrice"]}</li>
                                                        <li>已筹￥${villagers_c_cot[i]["alreadyPrice"]}</li>
                                                        <li>剩余${villagers_c_cot[i]["surplusDay"]}天</li>
                                                    </ul>
                                                </dd>
                                            </dl>
                                        </a>
                                    </li>`;
                            }
                            $('.villagers_c_cot ul#poyct_dcm_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //拼土货-热门
    pthAjax_rm: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/tuhuo_rm_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var tuhuo_rm_cot = data.data;
                    var str = '';

                    current *= 2;

                    if(tuhuo_rm_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_rm_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_rm_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_rm_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_rm_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_rm_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_rm_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_rm_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_rm_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_rm_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_rm_cot ul#poyct_pth_cont').html(str);
                    } else {
                        for(var i=0; i<tuhuo_rm_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_rm_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_rm_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_rm_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_rm_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_rm_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_rm_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_rm_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_rm_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_rm_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_rm_cot ul#poyct_pth_cont').html(str);
                    }
                },
                error: function () {
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/tuhuo_rm_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var tuhuo_rm_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            var current = 5;   
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<tuhuo_rm_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${tuhuo_rm_cot[i]["url"]}">
                                            <div class="figtuo_prudct_pic">
                                                <img src='${tuhuo_rm_cot[i]["imgs"]}'>
                                            </div>
                                            <div class="figtuo_prudct_txt">
                                                <h1>${tuhuo_rm_cot[i]["title"]}</h1>
                                                <dl class="figtuo_prudct_tit">
                                                    <dd>${tuhuo_rm_cot[i]["imglab"][0]}</dd>
                                                    <dd>${tuhuo_rm_cot[i]["imglab"][1]}</dd>
                                                </dl>
                                                <dl class="figtuo_prudct_price">
                                                    <dd>
                                                        <ol>
                                                            <li>¥${tuhuo_rm_cot[i]["price"]}</li>
                                                            <li>¥${tuhuo_rm_cot[i]["lastPrice"]}</li>
                                                            <li>${tuhuo_rm_cot[i]["surplusDay"]}</li>
                                                        </ol>
                                                    </dd>
                                                    <dd>
                                                        <button>${tuhuo_rm_cot[i]["sale"]}</button>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </a>
                                    </li>`;
                            }
                            $('.tuhuo_rm_cot ul#poyct_pth_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //拼土货-a
    pthAjax_a: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/tuhuo_a_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var tuhuo_a_cot = data.data;
                    var str = '';

                    current *= 2;

                    if(tuhuo_a_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_a_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_a_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_a_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_a_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_a_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_a_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_a_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_a_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_a_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_a_cot ul#poyct_pth_cont').html(str);
                    } else {
                        for(var i=0; i<tuhuo_a_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_a_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_a_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_a_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_a_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_a_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_a_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_a_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_a_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_a_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_a_cot ul#poyct_pth_cont').html(str);
                    }
                },
                error: function () {
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/tuhuo_a_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var tuhuo_a_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            var current = 5;   
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<tuhuo_a_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${tuhuo_a_cot[i]["url"]}">
                                            <div class="figtuo_prudct_pic">
                                                <img src='${tuhuo_a_cot[i]["imgs"]}'>
                                            </div>
                                            <div class="figtuo_prudct_txt">
                                                <h1>${tuhuo_a_cot[i]["title"]}</h1>
                                                <dl class="figtuo_prudct_tit">
                                                    <dd>${tuhuo_a_cot[i]["imglab"][0]}</dd>
                                                    <dd>${tuhuo_a_cot[i]["imglab"][1]}</dd>
                                                </dl>
                                                <dl class="figtuo_prudct_price">
                                                    <dd>
                                                        <ol>
                                                            <li>¥${tuhuo_a_cot[i]["price"]}</li>
                                                            <li>¥${tuhuo_a_cot[i]["lastPrice"]}</li>
                                                            <li>${tuhuo_a_cot[i]["surplusDay"]}</li>
                                                        </ol>
                                                    </dd>
                                                    <dd>
                                                        <button>${tuhuo_a_cot[i]["sale"]}</button>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </a>
                                    </li>`;
                            }
                            $('.tuhuo_a_cot ul#poyct_pth_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //拼土货-b
    pthAjax_b: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/tuhuo_b_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var tuhuo_b_cot = data.data;
                    var str = '';

                    current *= 2;

                    if(tuhuo_b_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_b_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_b_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_b_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_b_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_b_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_b_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_b_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_b_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_b_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_b_cot ul#poyct_pth_cont').html(str);
                    } else {
                        for(var i=0; i<tuhuo_b_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_b_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_b_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_b_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_b_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_b_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_b_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_b_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_b_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_b_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_b_cot ul#poyct_pth_cont').html(str);
                    }
                },
                error: function () {
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/tuhuo_b_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var tuhuo_b_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            var current = 5;   
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<tuhuo_b_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${tuhuo_b_cot[i]["url"]}">
                                            <div class="figtuo_prudct_pic">
                                                <img src='${tuhuo_b_cot[i]["imgs"]}'>
                                            </div>
                                            <div class="figtuo_prudct_txt">
                                                <h1>${tuhuo_b_cot[i]["title"]}</h1>
                                                <dl class="figtuo_prudct_tit">
                                                    <dd>${tuhuo_b_cot[i]["imglab"][0]}</dd>
                                                    <dd>${tuhuo_b_cot[i]["imglab"][1]}</dd>
                                                </dl>
                                                <dl class="figtuo_prudct_price">
                                                    <dd>
                                                        <ol>
                                                            <li>¥${tuhuo_b_cot[i]["price"]}</li>
                                                            <li>¥${tuhuo_b_cot[i]["lastPrice"]}</li>
                                                            <li>${tuhuo_b_cot[i]["surplusDay"]}</li>
                                                        </ol>
                                                    </dd>
                                                    <dd>
                                                        <button>${tuhuo_b_cot[i]["sale"]}</button>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </a>
                                    </li>`;
                            }
                            $('.tuhuo_b_cot ul#poyct_pth_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //拼土货-c
    pthAjax_c: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/tuhuo_c_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var tuhuo_c_cot = data.data;
                    var str = '';

                    current *= 2;

                    if(tuhuo_c_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_c_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_c_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_c_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_c_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_c_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_c_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_c_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_c_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_c_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_c_cot ul#poyct_pth_cont').html(str);
                    } else {
                        for(var i=0; i<tuhuo_c_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_c_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_c_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_c_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_c_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_c_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_c_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_c_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_c_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_c_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_c_cot ul#poyct_pth_cont').html(str);
                    }
                },
                error: function () {
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/tuhuo_c_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var tuhuo_c_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            var current = 5;   
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<tuhuo_c_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${tuhuo_c_cot[i]["url"]}">
                                            <div class="figtuo_prudct_pic">
                                                <img src='${tuhuo_c_cot[i]["imgs"]}'>
                                            </div>
                                            <div class="figtuo_prudct_txt">
                                                <h1>${tuhuo_c_cot[i]["title"]}</h1>
                                                <dl class="figtuo_prudct_tit">
                                                    <dd>${tuhuo_c_cot[i]["imglab"][0]}</dd>
                                                    <dd>${tuhuo_c_cot[i]["imglab"][1]}</dd>
                                                </dl>
                                                <dl class="figtuo_prudct_price">
                                                    <dd>
                                                        <ol>
                                                            <li>¥${tuhuo_c_cot[i]["price"]}</li>
                                                            <li>¥${tuhuo_c_cot[i]["lastPrice"]}</li>
                                                            <li>${tuhuo_c_cot[i]["surplusDay"]}</li>
                                                        </ol>
                                                    </dd>
                                                    <dd>
                                                        <button>${tuhuo_c_cot[i]["sale"]}</button>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </a>
                                    </li>`;
                            }
                            $('.tuhuo_c_cot ul#poyct_pth_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },

    //拼土货-d
    pthAjax_d: function(){
        this.reset();

        current = this.current;

        if(pageIndex == 1){
            $.ajax({
                url: "mock/tuhuo_d_cot.json",
                type:"get",
                dataType:"json",
                success: function(data, status){
                    var tuhuo_d_cot = data.data;
                    var str = '';

                    current *= 2;

                    if(tuhuo_d_cot.length > current){
                        for(var i=0; i<current; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_d_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_d_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_d_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_d_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_d_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_d_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_d_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_d_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_d_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_d_cot ul#poyct_pth_cont').html(str);
                    } else {
                        for(var i=0; i<tuhuo_d_cot.length; i++){
                            str += 
                                `<li>
                                    <a href="${tuhuo_d_cot[i]["url"]}">
                                        <div class="figtuo_prudct_pic">
                                            <img src='${tuhuo_d_cot[i]["imgs"]}'>
                                        </div>
                                        <div class="figtuo_prudct_txt">
                                            <h1>${tuhuo_d_cot[i]["title"]}</h1>
                                            <dl class="figtuo_prudct_tit">
                                                <dd>${tuhuo_d_cot[i]["imglab"][0]}</dd>
                                                <dd>${tuhuo_d_cot[i]["imglab"][1]}</dd>
                                            </dl>
                                            <dl class="figtuo_prudct_price">
                                                <dd>
                                                    <ol>
                                                        <li>¥${tuhuo_d_cot[i]["price"]}</li>
                                                        <li>¥${tuhuo_d_cot[i]["lastPrice"]}</li>
                                                        <li>${tuhuo_d_cot[i]["surplusDay"]}</li>
                                                    </ol>
                                                </dd>
                                                <dd>
                                                    <button>${tuhuo_d_cot[i]["sale"]}</button>
                                                </dd>
                                            </dl>
                                        </div>
                                    </a>
                                </li>`;
                        }
                        $('.tuhuo_d_cot ul#poyct_pth_cont').html(str);
                    }
                },
                error: function () {
                    console.log("false");
                }
            });

            pageIndex ++;
        }

        if (pageIndex > 1){
            $(window).scroll(function(){
                if ($(document).scrollTop() >= ($(document).height() - $(window).height()) - 60) {
                    $.ajax({
                        url: "mock/tuhuo_d_cot.json",
                        type:"get",
                        dataType:"json",
                        /*data: {
                            current: current,     //每页数据
                            pageIndex: pageIndex  //当前页码
                        },*/
                        success: function(data, status){
                            var tuhuo_d_cot = data.data;
                            var str = '';
                            var count = data.length;
                            console.log("总数据条数=" + count);

                            var current = 5;   
                            
                            // 总页码
                            if(count % current == 0){
                                var pageNum = parseInt(count / current); 
                            } else {
                                var pageNum = parseInt(count / current) + 1;
                            }

                            for(var i=0; i<tuhuo_d_cot.length; i++){
                                str += 
                                    `<li>
                                        <a href="${tuhuo_d_cot[i]["url"]}">
                                            <div class="figtuo_prudct_pic">
                                                <img src='${tuhuo_d_cot[i]["imgs"]}'>
                                            </div>
                                            <div class="figtuo_prudct_txt">
                                                <h1>${tuhuo_d_cot[i]["title"]}</h1>
                                                <dl class="figtuo_prudct_tit">
                                                    <dd>${tuhuo_d_cot[i]["imglab"][0]}</dd>
                                                    <dd>${tuhuo_d_cot[i]["imglab"][1]}</dd>
                                                </dl>
                                                <dl class="figtuo_prudct_price">
                                                    <dd>
                                                        <ol>
                                                            <li>¥${tuhuo_d_cot[i]["price"]}</li>
                                                            <li>¥${tuhuo_d_cot[i]["lastPrice"]}</li>
                                                            <li>${tuhuo_d_cot[i]["surplusDay"]}</li>
                                                        </ol>
                                                    </dd>
                                                    <dd>
                                                        <button>${tuhuo_d_cot[i]["sale"]}</button>
                                                    </dd>
                                                </dl>
                                            </div>
                                        </a>
                                    </li>`;
                            }
                            $('.tuhuo_d_cot ul#poyct_pth_cont').append(str);
                            pageIndex ++;

                            console.log("pageIndex=" + pageIndex);
                            console.log("pageNum=" + pageNum);

                            if(pageNum == pageIndex){
                                $(window).unbind('scroll'); //初始化滚动事件

                                setnavscroll(); //导航栏

                                $('.scobt').show();
                            }
                        },
                        error: function () {
                            console.log("false");
                        } 
                    });
                }
            })
        }
    },
};


//加载标签/点击选项卡加载标签页内容
var loadLab = function(){
    //玩主题
    $('body').on('click', '.wzt',  function(){
        //玩主题标签
        $.ajax({
            url: "mock/lab_wzt.json",
            type:"get",
            dataType:"json",
            async:false, 
            success: function(data, status){
                var lab_wzt = data.data;
                var lab_wzt_rm;

                lab_wzt_rm = `<li class="theme_rm active">热门</li>`;

                var str = '';
                for(var i=0; i<lab_wzt.length; i++){
                    str += "<li class=" + lab_wzt[i].clsN + ">" + lab_wzt[i].lab + "</li>"
                }
                $('.play_theme_ban ul').html(lab_wzt_rm + str);
            },
            error: function(){
                console.log('false');
            }
        });

        //玩主题热门
        pageIndex = 1;
        commPageAjax.wztAjax_rm();
    });

    //做地主
    $('body').on('click', '.zdz',  function(){
        //做地主标签
        $.ajax({
            url: "mock/lab_zdz.json",
            type:"get",
            dataType:"json",
            async:false, 
            success: function(data, status){
                var lab_zdz = data.data;
                var lab_zdz_rm;

                lab_zdz_rm = `<li class="active landlord_rm">热门</li>`;

                var str = '';
                for(var i=0; i<lab_zdz.length; i++){
                    str += "<li class=" + lab_zdz[i].clsN + ">" + lab_zdz[i].lab + "</li>"
                }
                $('.be_landlord_ban ul').html(lab_zdz_rm + str);
            },
            error: function(){
                console.log('false');
            }
        });

        //做地主热门
        pageIndex = 1;
        commPageAjax.zdzAjax_rm();

    });

    //投村产
    $('body').on('click', '.dcm',  function(){
        //投村产标签
        $.ajax({
            url: "mock/lab_dcm.json",
            type:"get",
            dataType:"json",
            async:false, 
            success: function(data, status){
                var lab_dcm = data.data;
                var lab_zdz_rm;

                lab_dcm_rm = `<li class="active villagers_rm">热门</li>`;

                var str = '';
                for(var i=0; i<lab_dcm.length; i++){
                    str += "<li class=" + lab_dcm[i].clsN + ">" + lab_dcm[i].lab + "</li>"
                }
                $('.be_villagers_ban ul').html(lab_dcm_rm + str);
            },
            error: function(){
                console.log('false');
            }
        });

        //投村产热门
        pageIndex = 1;
        commPageAjax.dcmAjax_rm();
    });

    //拼土货
    $('body').on('click', '.pth',  function(){
        //拼土货标签
        $.ajax({
            url: "mock/lab_pth.json",
            type:"get",
            dataType:"json",
            async:false, 
            success: function(data, status){
                var lab_pth = data.data;
                var lab_pth_rm;

                lab_pth_rm = `<li class="active tuhuo_rm">热门</li>`;

                var str = '';
                for(var i=0; i<lab_pth.length; i++){
                    str += "<li class=" + lab_pth[i].clsN + ">" + lab_pth[i].lab + "</li>"
                }
                $('.fight_tuhuo_ban ul').html(lab_pth_rm + str);
            },
            error: function(){
                console.log('false');
            }
        });

        //拼土货热门
        pageIndex = 1;
        commPageAjax.pthAjax_rm();
    });
}

//找村落内容列表
var zcl_score = function(){
    //民宿内容
    $.ajax({
        url: "mock/poyct_zcl_cont_ms.json",
        type:"get",
        dataType:"json",
        success: function(data,status){
            var zcl_cont_ms = data.data;
            var str = '';

            for(var i=0; i<zcl_cont_ms.length; i++){
                str += 
                    `<li>
                        <a href="${zcl_cont_ms[i]["url"]}">
                            <dl>
                                <dt class="poyctcnt_pic">
                                    <img src='${zcl_cont_ms[i]["imgs"]}'>
                                    <span class="tit_tab">${zcl_cont_ms[i]["imglab"]}</span>
                                </dt>
                                <dd class="poyctcnt_txt">
                                    <ul class="fdvigcot_txt_nam poyctcnt_txt_nam">
                                        <li>${zcl_cont_ms[i]["title"]}</li>
                                        <li>¥${zcl_cont_ms[i]["price"]}<b>起</b></li>
                                    </ul>
                                    <div class="fdvigcot_txt_p poyctcnt_txt_p">
                                        <p>
                                            ${zcl_cont_ms[i]["introduction"]}
                                        </p>
                                    </div>
                                    <ul class="fdvigcot_lab poyctcnt_lab">
                                        <li>
                                            <dl>
                                                <dd>${zcl_cont_ms[i]["productlab"][0]}</dd>
                                                <dd>${zcl_cont_ms[i]["productlab"][1]}</dd>
                                                <dd>${zcl_cont_ms[i]["productlab"][2]}</dd>
                                            </dl>
                                        </li>
                                        <li>${zcl_cont_ms[i]["addresss"]}<b>${zcl_cont_ms[i]["distance"]}</b></li>
                                    </ul>
                                </dd>
                            </dl>
                        </a>
                    </li>`;
            }
            $('.legend ul#poyct_zcl_cont').html(str);
        },
        error: function () {
            console.log("false");
        }
    });

    //民宿列表
    $.ajax({
        url: "mock/poyct_zcl_list_ms.json",
        type:"get",
        dataType:"json",
        success: function(data, status){
            var zcl_list_ms = data.data;
            var str = '';

            for(var i=0; i<zcl_list_ms.length; i++){
                str += 
                    `<div class="swiper-slide">
                        <a href="${zcl_list_ms[i]["url"]}">
                            <img src="${zcl_list_ms[i]["img"]}">
                            <span>${zcl_list_ms[i]["lab"]}</span>
                        </a>
                    </div>`;
            }
            $('.legend_list .swiper-wrapper').html(str);
        },
        error: function () {
            console.log("false");
        }
    });

    //村落内容
    $.ajax({
        url: "mock/poyct_zcl_cont_cl.json",
        type:"get",
        dataType:"json",
        success: function(data,status){
            var zcl_cont_cl = data.data;
            var str = '';

            for(var i=0; i<zcl_cont_cl.length; i++){
                str += 
                    `<li>
                        <a href="${zcl_cont_cl[i]["url"]}">
                            <dl>
                                <dt class="poyctcnt_pic">
                                    <img src='${zcl_cont_cl[i]["imgs"]}'>
                                    <span class="tit_tab">${zcl_cont_cl[i]["imglab"]}</span>
                                </dt>
                                <dd class="poyctcnt_txt">
                                    <ul class="fdvigcot_txt_nam poyctcnt_txt_nam">
                                        <li>${zcl_cont_cl[i]["title"]}</li>
                                        <li>¥${zcl_cont_cl[i]["price"]}<b>起</b></li>
                                    </ul>
                                    <div class="fdvigcot_txt_p poyctcnt_txt_p">
                                        <p>
                                            ${zcl_cont_cl[i]["introduction"]}
                                        </p>
                                    </div>
                                    <ul class="fdvigcot_lab poyctcnt_lab">
                                        <li>
                                            <dl>
                                                <dd>${zcl_cont_cl[i]["productlab"][0]}</dd>
                                                <dd>${zcl_cont_cl[i]["productlab"][1]}</dd>
                                                <dd>${zcl_cont_cl[i]["productlab"][2]}</dd>
                                            </dl>
                                        </li>
                                        <li>${zcl_cont_cl[i]["addresss"]}<b>${zcl_cont_cl[i]["distance"]}</b></li>
                                    </ul>
                                </dd>
                            </dl>
                        </a>
                    </li>`;
            }
            $('.village ul#poyct_zcl_cont').html(str);
        },
        error: function () {
            console.log("false");
        }
    });

    //村落列表
    $.ajax({
        url: "mock/poyct_zcl_list_cl.json",
        type:"get",
        dataType:"json",
        success: function(data, status){
            var zcl_list_cl = data.data;
            var str = '';

            for(var i=0; i<zcl_list_cl.length; i++){
                str += 
                    `<div class="swiper-slide">
                        <a href="${zcl_list_cl[i]["url"]}">
                            <img src="${zcl_list_cl[i]["img"]}">
                            <span>${zcl_list_cl[i]["lab"]}</span>
                        </a>
                    </div>`;
            }
            $('.village_list .swiper-wrapper').html(str);
        },
        error: function () {
            console.log("false");
        }
    });

    //景区内容
    $.ajax({
        url: "mock/poyct_zcl_cont_jq.json",
        type:"get",
        dataType:"json",
        success: function(data,status){
            var zcl_cont_jq = data.data;
            var str = '';

            for(var i=0; i<zcl_cont_jq.length; i++){
                str += 
                    `<li>
                        <a href="${zcl_cont_jq[i]["url"]}">
                            <dl>
                                <dt class="poyctcnt_pic">
                                    <img src='${zcl_cont_jq[i]["imgs"]}'>
                                    <span class="tit_tab">${zcl_cont_jq[i]["imglab"]}</span>
                                </dt>
                                <dd class="poyctcnt_txt">
                                    <ul class="fdvigcot_txt_nam poyctcnt_txt_nam">
                                        <li>${zcl_cont_jq[i]["title"]}</li>
                                        <li>¥${zcl_cont_jq[i]["price"]}<b>起</b></li>
                                    </ul>
                                    <div class="fdvigcot_txt_p poyctcnt_txt_p">
                                        <p>
                                            ${zcl_cont_jq[i]["introduction"]}
                                        </p>
                                    </div>
                                    <ul class="fdvigcot_lab poyctcnt_lab">
                                        <li>
                                            <dl>
                                                <dd>${zcl_cont_jq[i]["productlab"][0]}</dd>
                                                <dd>${zcl_cont_jq[i]["productlab"][1]}</dd>
                                                <dd>${zcl_cont_jq[i]["productlab"][2]}</dd>
                                            </dl>
                                        </li>
                                        <li>${zcl_cont_jq[i]["addresss"]}<b>${zcl_cont_jq[i]["distance"]}</b></li>
                                    </ul>
                                </dd>
                            </dl>
                        </a>
                    </li>`;
            }
            $('.area ul#poyct_zcl_cont').html(str);
        },
        error: function () {
            console.log("false");
        }
    });

    //景区列表
    $.ajax({
        url: "mock/poyct_zcl_list_jq.json",
        type:"get",
        dataType:"json",
        success: function(data, status){
            var zcl_list_jq = data.data;
            var str = '';

            for(var i=0; i<zcl_list_jq.length; i++){
                str += 
                    `<div class="swiper-slide">
                        <a href="${zcl_list_jq[i]["url"]}">
                            <img src="${zcl_list_jq[i]["img"]}">
                            <span>${zcl_list_jq[i]["lab"]}</span>
                        </a>
                    </div>`;
            }
            $('.area_list .swiper-wrapper').html(str);
        },
        error: function () {
            console.log("false");
        }
    });

    //农场内容
    $.ajax({
        url: "mock/poyct_zcl_cont_nc.json",
        type:"get",
        dataType:"json",
        success: function(data,status){
            var zcl_cont_nc = data.data;
            var str = '';

            for(var i=0; i<zcl_cont_nc.length; i++){
                str += 
                    `<li>
                        <a href="${zcl_cont_nc[i]["url"]}">
                            <dl>
                                <dt class="poyctcnt_pic">
                                    <img src='${zcl_cont_nc[i]["imgs"]}'>
                                    <span class="tit_tab">${zcl_cont_nc[i]["imglab"]}</span>
                                </dt>
                                <dd class="poyctcnt_txt">
                                    <ul class="fdvigcot_txt_nam poyctcnt_txt_nam">
                                        <li>${zcl_cont_nc[i]["title"]}</li>
                                        <li>¥${zcl_cont_nc[i]["price"]}<b>起</b></li>
                                    </ul>
                                    <div class="fdvigcot_txt_p poyctcnt_txt_p">
                                        <p>
                                            ${zcl_cont_nc[i]["introduction"]}
                                        </p>
                                    </div>
                                    <ul class="fdvigcot_lab poyctcnt_lab">
                                        <li>
                                            <dl>
                                                <dd>${zcl_cont_nc[i]["productlab"][0]}</dd>
                                                <dd>${zcl_cont_nc[i]["productlab"][1]}</dd>
                                                <dd>${zcl_cont_nc[i]["productlab"][2]}</dd>
                                            </dl>
                                        </li>
                                        <li>${zcl_cont_nc[i]["addresss"]}<b>${zcl_cont_nc[i]["distance"]}</b></li>
                                    </ul>
                                </dd>
                            </dl>
                        </a>
                    </li>`;
            }
            $('.farm ul#poyct_zcl_cont').html(str);
        },
        error: function () {
            console.log("false");
        }
    });

    //农场列表
    $.ajax({
        url: "mock/poyct_zcl_list_nc.json",
        type:"get",
        dataType:"json",
        success: function(data, status){
            var zcl_list_nc = data.data;
            var str = '';

            for(var i=0; i<zcl_list_nc.length; i++){
                str += 
                    `<div class="swiper-slide">
                        <a href="${zcl_list_nc[i]["url"]}">
                            <img src="${zcl_list_nc[i]["img"]}">
                            <span>${zcl_list_nc[i]["lab"]}</span>
                        </a>
                    </div>`;
            }
            $('.farm_list .swiper-wrapper').html(str);
        },
        error: function () {
            console.log("false");
        }
    });
}

//获取首页资源
var poyctyt_bd = function(){
    //获取首页banner图片
    $.ajax({
        url: "mock/poyctyt_banner.json",
        type:"get",
        dataType:"json",
        async:false,
        success:function(data,status){
            var str = "";
            var poycot = data.data;

            for( var i=0; i<poycot.length; i++){
                str+=`
                    <div class="swiper-slide">
                        <a href="${poycot[i].url}">
                            <img src="${poycot[i].img}" />
                        </a>
                    </div>
                `;
            }
            $('.poyctyt_banner .swiper-wrapper').html(str);
        },
        error: function () {
            console.log("false");
        }
    });

    zcl_score();    //找村落内容列表
}

//加载找村落
var poyct_zcl = function(){
    $('body').on('click', '.zcl',  function(){
        commPageAjax.reset();

        zcl_score();    //找村落内容列表
    });
}

//加载玩主题
var poyct_wzt = function(){
    //热门
    $('body').on('click', '.theme_rm',  function(){
        pageIndex = 1;
        commPageAjax.wztAjax_rm();
    });

    //theme_a
    $('body').on('click', '.theme_a',  function(){
        pageIndex = 1;
        commPageAjax.wztAjax_a();
    });

    //theme_b
    $('body').on('click', '.theme_b',  function(){
        pageIndex = 1;
        commPageAjax.wztAjax_b();
    });

    //theme_c
    $('body').on('click', '.theme_c',  function(){
        pageIndex = 1;
        commPageAjax.wztAjax_c();
    });

    //theme_d
    $('body').on('click', '.theme_d',  function(){
        pageIndex = 1;
        commPageAjax.wztAjax_d();
    });

    //theme_e
    $('body').on('click', '.theme_e',  function(){
        pageIndex = 1;
        commPageAjax.wztAjax_e();
    });

    //theme_f
    $('body').on('click', '.theme_f',  function(){
        $('.theme_f_cot ul#poyct_wzt_cont').html("<li>我是cmcc</li>");
    });
}

//加载做地主
var poyct_zdz = function(){
    //热门
    $('body').on('click', '.landlord_rm',  function(){
        pageIndex = 1;
        commPageAjax.zdzAjax_rm();
    });

     //landlord_a
    $('body').on('click', '.landlord_a',  function(){
        pageIndex = 1;
        commPageAjax.zdzAjax_a();
    });

    //landlord_b
    $('body').on('click', '.landlord_b',  function(){
        pageIndex = 1;
        commPageAjax.zdzAjax_b();
    });  

    //landlord_c
    $('body').on('click', '.landlord_c',  function(){
        pageIndex = 1;
        commPageAjax.zdzAjax_c();
    });   

    //landlord_d
    $('body').on('click', '.landlord_d',  function(){
        pageIndex = 1;
        commPageAjax.zdzAjax_d();
    });

    //theme_e
    $('body').on('click', '.landlord_e',  function(){
        $('.landlord_e_cot ul#poyct_zdz_cont').html("<li>我是cmcc</li>");
    });

}

//加载投村产
var poyct_dcm = function(){
    //热门
    $('body').on('click', '.villagers_rm',  function(){
        pageIndex = 1;
        commPageAjax.dcmAjax_rm();
    });

    //villagers_a_cot
    $('body').on('click', '.villagers_a',  function(){
        pageIndex = 1;
        commPageAjax.dcmAjax_a();
    });

    //villagers_b_cot
    $('body').on('click', '.villagers_b',  function(){
        pageIndex = 1;
        commPageAjax.dcmAjax_b();
    });

    //villagers_c_cot
    $('body').on('click', '.villagers_c',  function(){
        pageIndex = 1;
        commPageAjax.dcmAjax_c();
    });

    //villagers_d_cot
    $('body').on('click', '.villagers_d',  function(){
        $('.villagers_d_cot ul#poyct_dcm_cont').html("<li>我是cmcc</li>");
    });
}

//加载拼土货
var poyct_pth = function(){
    //热门
    $('body').on('click', '.tuhuo_rm',  function(){
        pageIndex = 1;
        commPageAjax.pthAjax_rm();
    });

    //tuhuo_a_cot
    $('body').on('click', '.tuhuo_a',  function(){
        pageIndex = 1;
        commPageAjax.pthAjax_a();
    });

    //tuhuo_b_cot   家乡味道
    $('body').on('click', '.tuhuo_b',  function(){
        sel_address();  //选择地址
        
        pageIndex = 1;
        commPageAjax.pthAjax_b();
    });

    //tuhuo_c_cot
    $('body').on('click', '.tuhuo_c',  function(){
        pageIndex = 1;
        commPageAjax.pthAjax_c();
    });

    //tuhuo_d_cot
    $('body').on('click', '.tuhuo_d',  function(){
        pageIndex = 1;
        commPageAjax.pthAjax_d();
    });

    //tuhuo_e_cot
    $('body').on('click', '.tuhuo_e',  function(){
        $('.tuhuo_e_cot ul#poyct_pth_cont').html("<li><a href='pointlocation/index.html'>我是cmcc</a></li><li><a href='pointlocation/index.html'>我是cmcc</a></li>");
    });
}


$(function(){
    tab();  //选项卡
    setnavscroll(); //浏览器滚动条位置
    scrolltop();    //回到顶部

    // city_province();    //获取省份

    loadLab();  //加载标签

    poyctyt_bd();   //获取首页资源

    poySwiper();    //轮播图

    poyct_zcl();    //获取找村落
    poyct_wzt();    //获取玩主题
    poyct_zdz();    //获取做地主
    poyct_dcm();    //获取当村民
    poyct_pth();    //获取拼土货

    // $('.wzt').click();
});
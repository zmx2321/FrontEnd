window.onload = function(){
    //改变根元素font-size
	document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	window.addEventListener("resize",function(){
		document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
	},false);
}

$(function(){
    tip();

    $('.zdz').click(function(){
        $.ajax({
            url: "js/aa.json",
            type:"get",
            dataType:"json",
            success: function(data,status){
                console.log(data);
                var str = "";
                var zdz_swiper = data.data;
                for(var i=0; i<zdz_swiper.length; i++){
                    str += "<div class='swiper-slide'><a href=' " + zdz_swiper[i].url + " '><img src=' " + zdz_swiper[i].img + " '><b class='poycty_ban_Mask'></b><span>" + zdz_swiper[i].name + "</span></a></div>";
                }
                $('.be_landlord_wrap .swiper-wrapper').html(str);
            },
            error: function () {
                console.log("false");
            }
        });
    });

    $('.zcl').click(function(){
        $.ajax({
            url: "js/aa.json",
            type:"get",
            dataType:"json",
            success: function(data,status){
                console.log(data);
                var str = "";
                var zdz_swiper = data.data;
                for(var i=0; i<zdz_swiper.length; i++){
                    str += "<div class='swiper-slide'><a href=' " + zdz_swiper[i].url + " '><img src=' " + zdz_swiper[i].img + " '><b class='poycty_ban_Mask'></b><span>" + zdz_swiper[i].name + "</span></a></div>";
                }
                $('.find_village_wrap .swiper-wrapper').html(str);
            },
            error: function () {
                console.log("false");
            }
        });
    });
});


var tip = function() {
	// 选项卡
        $('ul.poyctyt_nav_btn li').click(function(){
            $(this).addClass('active').siblings().removeClass('active');
            $('article.poycty_cont section').eq($(this).index()).show().siblings().hide();
        });	

        // 找村落轮播图
    var swiper = new Swiper('.play_theme_ban1 .swiper-container', {
        //pagination: '.find_village_ban .swiper-pagination',
        slidesPerView: 2.7,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true//修改swiper的父元素时，自动初始化swiper
    });

    // 找村落轮播图
    var swiper = new Swiper('.play_theme_wrap .swiper-container', {
        //pagination: '.find_village_ban .swiper-pagination',
        slidesPerView: 2.7,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true//修改swiper的父元素时，自动初始化swiper
    });

    // 找村落轮播图
    var swiper = new Swiper('.be_landlord_wrap .swiper-container', {
        //pagination: '.find_village_ban .swiper-pagination',
        slidesPerView: 2.7,
        paginationClickable: true,
        spaceBetween: 10,
        freeMode: true,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper
        observeParents: true//修改swiper的父元素时，自动初始化swiper
    });
}










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
    // console.log(bMock.getFace("scenery_weather"));
});

//页面交互
var tip = function(){
    //swiper 滑动
    var swiper = new Swiper('.scenery_cont .swiper-container', {
        pagination: '.swiper-pagination',
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflow: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows : true,
            observer:true,
            observeParents:true,
            slideToClickedSlide:true,
        }
    });

    // 找村落轮播图
    var myswiper = new Swiper('.find_village_ban .swiper-container', {
        slidesPerView: 5.2,
        paginationClickable: true,
        spaceBetween: 3,
        freeMode: true,
        observer:true,
        observeParents:true,
        slideToClickedSlide:true,
    });

    $('.sen_city').toggle(
        function(){
            $('.sen_city li img').css({transform: 'rotate(180deg)'});
            $('.addsel').slideDown();
        },
        function(){
            $('.sen_city li img').css({transform: 'initial'});
            $('.addsel').slideUp();
        }
    );

    $('.addsel li').click(function(){
        $('.sen_city li img').css({transform: 'initial'});
        $('.addsel').slideUp();
    });

    $('.poycty_ban .swiper-slide').click(function(){
        // $(this).find('a').addClass('active').siblings().removeClass('active');
        $(this).find('a').addClass('active').parent().siblings().find('a').removeClass('active');
    });

    myswiper.slideTo(5, 1000, function(data){
        console.log(data);
    });//切换到第一个slide，速度为1秒
    console.log(myswiper.activeIndex);
}

//加载所需的城市信息及其天气信息
var cityWeatherInfo = function(){
    $.ajax({
        async: false,
        url: bMock.getFace("scenery_weather"),
        type:"get",
        dataType:"json",
        success:function(data,status){
            var senedata = data.data;

            var str='';

            var weatherName = '',
                weatherImg = '';

            var weather = [
                {
                    "name": "晴",
                    "img": "images/weather/tq-q.png"
                },{
                    "name": "多云",
                    "img": "images/weather/tq-dy.png"
                },{
                    "name": "阴",
                    "img": "images/weather/tq-y.png"
                },{
                    "name": "小雨",
                    "img": "images/weather/tq-xy.png"
                },{
                    "name": "中雨",
                    "img": "images/weather/tq-xy.png"
                },{
                    "name": "小到中雨",
                    "img": "images/weather/tq-xy.png"
                },{
                    "name": "冰雹",
                    "img": "images/weather/tq-bb.png"
                }
            ];

            for(var i=0; i<senedata.length; i++){
                var senecity = senedata[i].city;

                $.ajax({
                    async: false,
                    url: "http://wthrcdn.etouch.cn/weather_mini?city=" + senecity,
                    type:"get",
                    dataType:"json",
                    success:function(data,status){
                        var weatherinfo = data.data;

                        // console.log(weatherName);

                        //读取天气信息
                        var weatherinfo_olow = weatherinfo.forecast[0].low,
                            weatherinfo_ohigh = weatherinfo.forecast[0].high,
                            weatherinfo_type = weatherinfo.forecast[0].type,
                            weatherinfo_city = weatherinfo.city,
                            weatherinfo_aqi = weatherinfo.aqi;

                        //获取页面需要的温度格式
                        weatherinfo_low = weatherinfo_olow.replace(/[^\d]*/ig,"") + "℃";
                        weatherinfo_high = weatherinfo_ohigh.replace(/[^\d]*/ig,"") + "℃";
                        
                        // console.log(weatherinfo);
                        // console.log(weatherinfo_city);
                        // console.log(weatherinfo_low);
                        // console.log(weatherinfo_high);
                        // console.log(weatherinfo_type);
                        // console.log(weatherinfo_aqi);
                         
                        // console.log(senedata[i].url);
                        // console.log(senedata[i].img);
                        // console.log(senedata[i].label);

                        // console.log(weatherImg);
                        // console.log(weatherinfo_type);
                        
                        for(var j=0; j<weather.length; j++){
                            if(weather[j].name == weatherinfo_type){
                                weatherImg = weather[j].img;
                            }
                        }
                        
                        str += `
                            <div class="swiper-slide">
                                <a href="${senedata[i].url}">
                                    <div class="scenery_cnpic">
                                        <img src="${senedata[i].img}">
                                        <div class="scenery_cnpic_mask"></div>
                                        <div class="scenery_cnpic_cont">
                                            <ul>
                                                <li>${weatherinfo_city}</li>
                                                <li>
                                                    <dl class="weather_ptic">
                                                        <dd>
                                                            <img src="${weatherImg}">
                                                        </dd>
                                                        <dd>${weatherinfo_type}</dd>
                                                    </dl>
                                                </li>
                                                <li>
                                                    <dl>
                                                        <dd>${weatherinfo_low}/${weatherinfo_high}</dd>
                                                        <dd>空气质量：${weatherinfo_aqi}</dd>
                                                    </dl>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div class="scenery_cncont">
                                        <ul>
                                            <li>
                                                <dl>
                                                    <dd>${senedata[i].label[0]}</dd>
                                                    <dd>${senedata[i].label[1]}</dd>
                                                </dl>
                                                <div class="clear"></div>
                                            </li>
                                            <li>
                                                <dl>
                                                    <dd>${senedata[i].label[2]}</dd>
                                                    <dd>${senedata[i].label[3]}</dd>
                                                </dl>
                                                <div class="clear"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </a>
                            </div>
                        `;
                    },
                    error: function () {
                        console.log("false");
                    }
                });
            }
            $('.scenery_cont .swiper-wrapper').html(str);
        },
        error: function () {
            console.log("false");
        }
    });
}

// //获取当前城市天气信息
// var weather = function(){
//     $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
//         if (remote_ip_info.ret == '1') {
//             $.ajax({
//                 type: "GET",
//                 url: "http://wthrcdn.etouch.cn/weather_mini?city="+remote_ip_info.city,
//                 success: function(data,status){
//                     var data = JSON.parse(data);    //json字符串转换成json对象

//                     var weatherinfo = data.data;

//                     //读取天气信息
//                     var weatherinfo_olow = weatherinfo.forecast[0].low,
//                         weatherinfo_ohigh = weatherinfo.forecast[0].high,
//                         weatherinfo_type = weatherinfo.forecast[0].type,
//                         weatherinfo_city = weatherinfo.city,
//                         weatherinfo_aqi = weatherinfo.aqi;

//                     //获取页面需要的温度格式
//                     weatherinfo_low = weatherinfo_olow.replace(/[^\d]*/ig,"") + "℃";
//                     weatherinfo_high = weatherinfo_ohigh.replace(/[^\d]*/ig,"") + "℃";
                    
//                     // console.log(weatherinfo);
//                     // console.log(weatherinfo_city);
//                     // console.log(weatherinfo_low);
//                     // console.log(weatherinfo_high);
//                     // console.log(weatherinfo_type);
//                     // console.log(weatherinfo_aqi);

//                     //将天气信息存入localstroage
//                     window.localStorage.setItem('weatherinfo_city',weatherinfo_city);
//                     window.localStorage.setItem('weatherinfo_type',weatherinfo_type);
//                     window.localStorage.setItem('weatherinfo_low',weatherinfo_low);
//                     window.localStorage.setItem('weatherinfo_high',weatherinfo_high);
//                     window.localStorage.setItem('weatherinfo_aqi',weatherinfo_aqi);

//                     //window.localStorage.clear();
//                 }
//             });
//         }
//     });
// }

// //加载当前城市信息
// var pointSceneryInfo = function(){
//     //获取localstroage中的天气信息
//     var weatherinfo_city = localStorage.getItem("weatherinfo_city"),
//         weatherinfo_type = localStorage.getItem("weatherinfo_type"),
//         weatherinfo_low = localStorage.getItem("weatherinfo_low"),
//         weatherinfo_high = localStorage.getItem("weatherinfo_high"),
//         weatherinfo_aqi = localStorage.getItem("weatherinfo_aqi"); 

//     //json对象转换成json字符串
//     var weatherinfo_city = JSON.stringify(weatherinfo_city),
//         weatherinfo_type = JSON.stringify(weatherinfo_type),
//         weatherinfo_low = JSON.stringify(weatherinfo_low),
//         weatherinfo_high = JSON.stringify(weatherinfo_high),
//         weatherinfo_aqi = JSON.stringify(weatherinfo_aqi);

//     //json字符串去除引号
//     weatherinfo_city = weatherinfo_city.substring(1,weatherinfo_city.length - 1);
//     weatherinfo_type = weatherinfo_type.substring(1,weatherinfo_type.length - 1);
//     weatherinfo_low = weatherinfo_low.substring(1,weatherinfo_low.length - 1);
//     weatherinfo_high = weatherinfo_high.substring(1,weatherinfo_high.length - 1);
//     weatherinfo_aqi = weatherinfo_aqi.substring(1,weatherinfo_aqi.length - 1);

//     var weatherImg;

//     var weather = [
//         {
//             "name": "晴",
//             "img": "images/weather/tq-q.png"
//         },{
//             "name": "多云",
//             "img": "images/weather/tq-dy.png"
//         },{
//             "name": "阴",
//             "img": "images/weather/tq-y.png"
//         },{
//             "name": "小雨",
//             "img": "images/weather/tq-xy.png"
//         },{
//             "name": "冰雹",
//             "img": "images/weather/tq-bb.png"
//         }
//     ];


//     for(var i=0; i<weather.length; i++){
//         if(weather[i].name == weatherinfo_type){
//             weatherImg = weather[i].img;
//             //console.log(weatherImg);
//         }
//     }

//     $.ajax({
//         async: false,
//         url: bMock.getFace("scenery_weather"),
//         type:"get",
//         dataType:"json",
//         success:function(data,status){
//             var scenery_weather = data.data,
//                 str = '';

//             for(var i=0; i<scenery_weather.length; i++){

//                 str += 
//                 `
//                     <div class="swiper-slide">
//                         <a href="${scenery_weather[i].url}">
//                             <div class="scenery_cnpic">
//                                 <img src="${scenery_weather[i].img}">
//                                 <div class="scenery_cnpic_mask"></div>
//                                 <div class="scenery_cnpic_cont">
//                                     <ul>
//                                         <li>${weatherinfo_city}</li>
//                                         <li>
//                                             <dl class="weather_ptic">
//                                                 <dd>
//                                                     <img src="${weatherImg}">
//                                                 </dd>
//                                                 <dd>${weatherinfo_type}</dd>
//                                             </dl>
//                                         </li>
//                                         <li>
//                                             <dl>
//                                                 <dd>${weatherinfo_low}/${weatherinfo_high}</dd>
//                                                 <dd>空气质量：${weatherinfo_aqi}</dd>
//                                             </dl>
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </div>
//                             <div class="scenery_cncont">
//                                 <ul>
//                                     <li>
//                                         <dl>
//                                             <dd>${scenery_weather[i].label[0]}</dd>
//                                             <dd>${scenery_weather[i].label[1]}</dd>
//                                         </dl>
//                                         <div class="clear"></div>
//                                     </li>
//                                     <li>
//                                         <dl>
//                                             <dd>${scenery_weather[i].label[2]}</dd>
//                                             <dd>${scenery_weather[i].label[3]}</dd>
//                                         </dl>
//                                         <div class="clear"></div>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </a>
//                     </div>
//                 `;
//             }
//             $('.scenery_cont .swiper-wrapper').html(str);
//         },
//         error: function () {
//             console.log("false");
//         }
//     });
// }

$(function(){
    cityWeatherInfo(); //加载所需的城市信息及其天气信息
    // pointSceneryInfo(); //加载当前城市信息
    // weather();  //天气预报
    
    tip();  //页面交互
});
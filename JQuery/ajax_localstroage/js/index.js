$(function(){
    weather();  //获取当前城市天气信息
    pointSceneryInfo(); //加载当前城市信息
});

//获取当前城市天气信息
var weather = function(){
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function(_result) {
        if (remote_ip_info.ret == '1') {
            $.ajax({
                type: "GET",
                url: "http://wthrcdn.etouch.cn/weather_mini?city="+remote_ip_info.city,
                data: "",
                success: function(data,status){
                    var data = JSON.parse(data);    //json字符串转换成json对象

                    var weatherinfo = data.data;

                    var weatherinfo_olow = weatherinfo.forecast[0].low,
                        weatherinfo_ohigh = weatherinfo.forecast[0].high,
                        weatherinfo_type = weatherinfo.forecast[0].type,
                        weatherinfo_city = weatherinfo.city,
                        weatherinfo_aqi = weatherinfo.aqi;

                    weatherinfo_low = weatherinfo_olow.replace(/[^\d]*/ig,"") + "℃";
                    weatherinfo_high = weatherinfo_ohigh.replace(/[^\d]*/ig,"") + "℃";
                    
                    console.log(weatherinfo);
                    // console.log(weatherinfo_city);
                    // console.log(weatherinfo_low);
                    // console.log(weatherinfo_high);
                    // console.log(weatherinfo_type);
                    // console.log(weatherinfo_aqi);

                    //将天气信息存入localstroage
                    window.localStorage.setItem('weatherinfo_city',weatherinfo_city);
                    window.localStorage.setItem('weatherinfo_type',weatherinfo_type);
                    window.localStorage.setItem('weatherinfo_low',weatherinfo_low);
                    window.localStorage.setItem('weatherinfo_high',weatherinfo_high);
                    window.localStorage.setItem('weatherinfo_aqi',weatherinfo_aqi);

                    //window.localStorage.clear();
                }
            });
        }
    });
}

//加载当前城市信息
var pointSceneryInfo = function(){
    //获取localstroage中的天气信息
    var weatherinfo_city = localStorage.getItem("weatherinfo_city"),
        weatherinfo_type = localStorage.getItem("weatherinfo_type"),
        weatherinfo_low = localStorage.getItem("weatherinfo_low"),
        weatherinfo_high = localStorage.getItem("weatherinfo_high"),
        weatherinfo_aqi = localStorage.getItem("weatherinfo_aqi"); 

    //json对象转换成json字符串
    var weatherinfo_city = JSON.stringify(weatherinfo_city),
        weatherinfo_type = JSON.stringify(weatherinfo_type),
        weatherinfo_low = JSON.stringify(weatherinfo_low),
        weatherinfo_high = JSON.stringify(weatherinfo_high),
        weatherinfo_aqi = JSON.stringify(weatherinfo_aqi);

    //json字符串去除引号
    weatherinfo_city = weatherinfo_city.substring(1,weatherinfo_city.length - 1);
    weatherinfo_type = weatherinfo_type.substring(1,weatherinfo_type.length - 1);
    weatherinfo_low = weatherinfo_low.substring(1,weatherinfo_low.length - 1);
    weatherinfo_high = weatherinfo_high.substring(1,weatherinfo_high.length - 1);
    weatherinfo_aqi = weatherinfo_aqi.substring(1,weatherinfo_aqi.length - 1);

    var str = '';

    var weatherImg;

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
            "name": "冰雹",
            "img": "images/weather/tq-bb.png"
        }
    ];


    for(var i=0; i<weather.length; i++){
        if(weather[i].name == weatherinfo_type){
            weatherImg = weather[i].img;
        }
    }

    // console.log(weatherImg);
    // console.log(weatherinfo_city);
    // console.log(weatherinfo_low);
    // console.log(weatherinfo_high);
    // console.log(weatherinfo_type);
    // console.log(weatherinfo_aqi);

    str += `
        <ul>
            <li><img src="${weatherImg}"></li>
            <li>${weatherinfo_city}</li>
            <li>${weatherinfo_low}/${weatherinfo_high}</li>
            <li>${weatherinfo_type}</li>
            <li>空气质量  ${weatherinfo_aqi}</li>
        </ul>
    `

    $('body').html(str);
}


/*0～50一级 优 绿色

　　空气质量令人满意，基本无空气污染 各类人群可正常活动

　　51～100二级 良 黄色

　　空气质量可接受，但某些污染物可能对极少数异常敏感人群健康有较弱影响

　　极少数异常敏感人群应减少户外活动

　　101～150三级

　　轻度污染 橙色

　　易感人群症状有轻度加剧，健康人群出现刺激症状

　　儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼

　　151～200四级

　　中度污染 红色

　　进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响儿童、老年人及心脏病、呼

　　吸系统疾病患者避免长时间、高强度的户外锻炼，一

　　般人群适量减少户外运动

　　201～300五级

　　重度污染 紫色

　　心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状

　　儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群

　　减少户外运动

　　>

　　300 六级

　　严重污染

　　褐红色
*/
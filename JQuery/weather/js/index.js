$(function(){
    //mock
    var thisApi = {
        //页面标签信息
        cityWeatherInfo: {
            dev: "mock/cityWeatherInfo.json",
            product: "",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    // console.log(bMock.getFace("cityWeatherInfo"));
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
                        weatherinfo_date = weatherinfo.forecast[0].date,
                        weatherinfo_city = weatherinfo.city,
                        weatherinfo_aqi = weatherinfo.aqi;

                    weatherinfo_low = weatherinfo_olow.replace(/[^\d]*/ig,"") + "℃";
                    weatherinfo_high = weatherinfo_ohigh.replace(/[^\d]*/ig,"") + "℃";
                    
                    // console.log(weatherinfo);
                    // console.log(weatherinfo_city);
                    // console.log(weatherinfo_low);
                    // console.log(weatherinfo_high);
                    // console.log(weatherinfo_type);
                    // console.log(weatherinfo_aqi);
                    // console.log(weatherinfo_date);

                    var str = '';

                    var weatherImg;

                    var apiExpln;

                    //解析空气质量指数
                    // console.log(weatherinfo_aqi);
                    if(weatherinfo_aqi < 50) {
                        // console.log("0～50 一级 优 绿色 空气质量令人满意，基本无空气污染 各类人群可正常活动");
                        apiExpln = "优";
                    } else if(weatherinfo_aqi > 50 && weatherinfo_aqi < 100) {
                        // console.log("51～100 二级 良 黄色 空气质量可接受,但某些污染物可能对极少数异常敏感人群健康有较弱影响,极少数异常敏感人群应减少户外活动");
                        apiExpln = "良";
                    } else if(weatherinfo_aqi > 101 && weatherinfo_aqi < 150) {
                        // console.log("101～150 三级 轻度污染 橙色 易感人群症状有轻度加剧,健康人群出现刺激症状,儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼");
                        apiExpln = "轻度污染";
                    } else if(weatherinfo_aqi > 151 && weatherinfo_aqi < 200) {
                        // console.log("151～200 四级 中度污染 红色 进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响儿童、老年人及心脏病、呼吸系统疾病患者避免长时间、高强度的户外锻炼，一般人群适量减少户外运动");
                        apiExpln = "中度污染";
                    } else if(weatherinfo_aqi > 201 && weatherinfo_aqi < 300) {
                        // console.log("201～300 五级 重度污染 紫色 心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状 儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动");
                        apiExpln = "重度污染";
                    } else if(weatherinfo_aqi == 300) {
                        // console.log("300 六级 严重污染 褐红色");
                        apiExpln = "严重污染";
                    } else {
                        console.log("警戒！出门请佩戴防毒面具");
                        apiExpln = "该地区不适合生存";
                    }

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

                    for(var i=0; i<weather.length; i++){
                        if(weather[i].name == weatherinfo_type){
                            weatherImg = weather[i].img;
                        }
                    }
                    // console.log(weatherImg);
                    
                    str += `
                        <ul>
                            <span>您当前所在城市为：${weatherinfo_city}</span>
                            <li><img src="${weatherImg}"></li>
                            <li>${weatherinfo_city}</li>
                            <li>${weatherinfo_date}</li>
                            <li>${weatherinfo_low}/${weatherinfo_high}</li>
                            <li>${weatherinfo_type}</li>
                            <li>空气质量 : ${weatherinfo_aqi} ---- ${apiExpln}</li>
                        </ul>
                    `

                    $('.local').html(str);
                }
            });
        }
    });
};

//加载所需的城市信息及其天气信息
var cityWeatherInfo = function(){
    $.ajax({
        async: false,
        url: bMock.getFace("cityWeatherInfo"),
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
                        var weatherinfo = data.data,
                            apiExpln;

                        // console.log(weatherName);

                        //读取天气信息
                        var weatherinfo_olow = weatherinfo.forecast[0].low,
                            weatherinfo_ohigh = weatherinfo.forecast[0].high,
                            weatherinfo_type = weatherinfo.forecast[0].type,
                            weatherinfo_date = weatherinfo.forecast[0].date,
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

                        for(var i=0; i<weather.length; i++){
                            if(weather[i].name == weatherinfo_type){
                                weatherImg = weather[i].img;
                            }
                        }

                        if(weatherinfo_aqi < 50) {
                            // console.log("0～50 一级 优 绿色 空气质量令人满意，基本无空气污染 各类人群可正常活动");
                            apiExpln = "优";
                        } else if(weatherinfo_aqi > 50 && weatherinfo_aqi < 100) {
                            // console.log("51～100 二级 良 黄色 空气质量可接受,但某些污染物可能对极少数异常敏感人群健康有较弱影响,极少数异常敏感人群应减少户外活动");
                            apiExpln = "良";
                        } else if(weatherinfo_aqi > 101 && weatherinfo_aqi < 150) {
                            // console.log("101～150 三级 轻度污染 橙色 易感人群症状有轻度加剧,健康人群出现刺激症状,儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼");
                            apiExpln = "轻度污染";
                        } else if(weatherinfo_aqi > 151 && weatherinfo_aqi < 200) {
                            // console.log("151～200 四级 中度污染 红色 进一步加剧易感人群症状，可能对健康人群心脏、呼吸系统有影响儿童、老年人及心脏病、呼吸系统疾病患者避免长时间、高强度的户外锻炼，一般人群适量减少户外运动");
                            apiExpln = "中度污染";
                        } else if(weatherinfo_aqi > 201 && weatherinfo_aqi < 300) {
                            // console.log("201～300 五级 重度污染 紫色 心脏病和肺病患者症状显著加剧，运动耐受力降低，健康人群普遍出现症状 儿童、老年人和心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动");
                            apiExpln = "重度污染";
                        } else if(weatherinfo_aqi == 300) {
                            // console.log("300 六级 严重污染 褐红色");
                            apiExpln = "严重污染";
                        } else {
                            // console.log("警戒！出门请佩戴防毒面具");
                            apiExpln = "该地区不适合生存！";
                        }
                         
                        // console.log(senedata[i].url);
                        // console.log(senedata[i].img);
                        // console.log(senedata[i].label);
                        
                        // console.log(weatherImg);
                        // console.log(weatherinfo_type);
                        str += `
                            <ul>
                                <li><img src="${weatherImg}"></li>
                                <li>${weatherinfo_city}</li>
                                <li>${weatherinfo_date}</li>
                                <li>${weatherinfo_low}/${weatherinfo_high}</li>
                                <li>${weatherinfo_type}</li>
                                <li>空气质量 : ${weatherinfo_aqi} ---- ${apiExpln}</li>
                            </ul>
                        `
                    },
                    error: function () {
                        console.log("false");
                    }
                });
            }
            $('.normal').html(str);
        },
        error: function () {
            console.log("false");
        }
    });
}

$(function(){
    weather();  //获取当前城市天气信息
    cityWeatherInfo(); //加载所需的城市信息及其天气信息
});
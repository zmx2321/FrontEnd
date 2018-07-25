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
            "name": "冰雹",
            "img": "images/weather/tq-bb.png"
        }
    ];
    
    // //获取天气图片信息
    // $.each(weather, function(j){
    //     //将对象数据类型转换成字符串，并将for循环的内容放到外面去，并用逗号隔开
    //     weatherName += "," + weather[j].name;   
    //     weatherImg += "," + weather[j].img;  
    // });
    
    for(var i=0; i<weather.length; i++){
        weatherName += "," + weather[i].name;   
        weatherImg += "," + weather[i].img; 
        console.log(weather);
    }

    //用substr方法去除字符串第一个字符，即逗号
    weatherName=weatherName.substr(1);
    weatherImg=weatherImg.substr(1);

    //用split按逗号分隔字符
    var weatherName=weatherName.split(",");
    var weatherImg=weatherImg.split(",");

    console.log(weatherName);
    console.log(weatherImg);
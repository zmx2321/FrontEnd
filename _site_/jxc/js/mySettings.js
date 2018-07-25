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
    //console.log(bMock.getFace("poyct_zcl_swiper"));
});

//页面交互
var tip = function(){

}

$(function(){
    tip();  //页面交互
});
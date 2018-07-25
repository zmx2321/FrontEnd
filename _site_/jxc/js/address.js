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

//地址
var address = function(){
    //定位到当前城市
    var geolocation = new BMap.Geolocation();    
    var gc = new BMap.Geocoder();     
  
    geolocation.getCurrentPosition( function(r) {
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            var pt = r.point;    
            gc.getLocation(pt, function(rs){    
                var addComp = rs.addressComponents; 
                $('.localaddress').html(addComp.city);
                console.log(addComp);
            });  
        }       
    },{enableHighAccuracy: true});

    //选择地址
    $(".city").CityPicker();
}

$(function(){
    address();  //地址
});
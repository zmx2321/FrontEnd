var map = new BMap.Map("container");
var point = new BMap.Point(116.404125,39.912196);
map.centerAndZoom(point, 18);
//镜头中心点，地图大小  
map.enableScrollWheelZoom(true);
//允许滚轮缩放地图  
var marker = new BMap.Marker(point);
// 创建标注    
marker.addEventListener("mouseover", attribute);
map.addOverlay(marker);
function attribute() {
    var opts = {
        width: 500,
        // 信息窗口宽度      
        height: 400,
        // 信息窗口高度     
    }
    var sContent = "<h4 style='margin:0 0 5px 0;padding:0.2em 0'>天安门</h4>" + "<table style=’width: 200px;margin-top: 10px;margin-left: 5px;float: left;’><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td><div id='main' style='width:400px;height:300px;'></div></td></tr></table>"

    var infoWindow = new BMap.InfoWindow(sContent,opts);
    // 创建信息窗口对象   
    console.log("创建div");
    map.openInfoWindow(infoWindow, point);
    //在point打的位置上进行一个标注    
    setTimeout(fun, 1000);
    //延迟一秒，虽然是个笨方法，目的是在信息框创建完成后再创建图表，不然找不到目标id，echart初始化会失败,报错：Initialize failed: invalid dom.用ready比较好。  
}
function fun() {
    var myChart1 = echarts.init(document.getElementById('main'));
    console.log("如果找到id为main的div就会看到本条信息");
    option = {
        //这个option是从echarts官网实例中搬过来的，自己的就不发了  
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
    };
    myChart1.setOption(option);
}

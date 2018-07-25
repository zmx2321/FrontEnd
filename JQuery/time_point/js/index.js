$(function(){
    var timer = window.setInterval(function(){
        $.ajax({
            url: 'http://api.k780.com:88/?app=life.time&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json',
            type: 'GET',
            dataType:"jsonp",
            jsonp: 'jsoncallback',
            callback: 'json',
            success: function(data,status){
                console.log(data);
                var time;
                time = data.result.datetime_2;
                $('body').html(time);

            }
        });          
    },1000);

// var xmlhttp = new ActiveXObject("MSXML2.XMLHTTP.3.0");
// xmlhttp.open("GET", "http://bjtime.cn", false);
// xmlhttp.setRequestHeader("If-Modified-Since", "bjtime");
// xmlhttp.send();
// var dateStr = xmlhttp.getResponseHeader("Date");
// var date = new Date(dateStr);
// var year = date.getFullYear();
// var month = date.getMonth() + 1;
// var date1 = date.getDate();
// var hour = date.getHours();
// var minutes = date.getMinutes();
// var second = date.getSeconds();
// alert(date + "  |  " + year + "年" + month + "月" + date1 + "日" + hour + "时" + minutes + "分" + second + "秒");
});
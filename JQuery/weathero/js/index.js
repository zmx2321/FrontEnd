$(function() {
    $.getScript('http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js', function() {
        //console.log(remote_ip_info);
        if (remote_ip_info.ret == 1) {
            $.ajax({
                type: "get",
                url: "http://wthrcdn.etouch.cn/weather_mini?city=" + remote_ip_info.city,
                async: true,
                success: function(d) {
                    var d = JSON.parse(d);
                    //console.log(d)
                    $('#temperature').text(d.data.wendu);
                    $('#city').text(d.data.city);

                    var aqi = d.data.aqi;
                    $('#aqi-num').text(aqi)
                    if (aqi > 0 && aqi <= 50) {
                        $('#aqi').text('优');
                    } else if (aqi > 51 && aqi <= 100) {
                        $('#aqi').text('良');
                    } else if (aqi > 101 && aqi <= 150) {
                        $('#aqi').text('轻度污染');
                    } else if (aqi > 152 && aqi <= 200) {
                        $('#aqi').text('中度污染');
                    } else if (aqi > 201 && aqi <= 300) {
                        $('#aqi').text('重度污染');
                    } else {
                        $('#aqi').text('严重污染');
                    }

                    //近期天气数据
                    var d_arr = d.data.forecast;
                    for (var i = 0; i < d_arr.length; i++) {
                        var high = d_arr[i].high;
                        var low = d_arr[i].low;
                        var type = d_arr[i].type;
                        var type_arr = [{
                            name: '晴',
                            img: 'w_0'
                        }, {
                            name: '多云',
                            img: 'w_1'
                        }, {
                            name: '阴',
                            img: 'w_2'
                        }, {
                            name: '多雨转晴',
                            img: 'w_3'
                        }, {
                            name: '小雨',
                            img: 'w_4'
                        }, {
                            name: '中雨',
                            img: 'w_5'
                        }, {
                            name: '雷阵雨',
                            img: 'w_6'
                        }, {
                            name: '小雪',
                            img: 'w_7'
                        }, {
                            name: '阵雨',
                            img: 'w_5'
                        }];
                        var img_data = '';
                        type_arr.forEach(function(value, index, arr) {
                            if (type == value.name) {
                                //img_data = arr[index].img;
                                img_data = value.img;
                            }
                        });
                        if (i == 0) {
                            var low = d.data.forecast[i].low;
                            $('#low').text(low.slice(3));
                            var high = d.data.forecast[0].high;
                            var wind_power = d.data.forecast[i].fengli;
                            $('#high').text(high.slice(3));
                            $('#type').text(d.data.forecast[i].type);
                            $('#wind-power').text(wind_power.match(/<\!\[CDATA\[<(.+?)]]>/)[1]);
                            $('#weather-img').attr('src', 'images/' + img_data + '.png');
                        } else {
                            var date = new Date();
                            var day = date.getDate();
                            var month = date.getMonth() + 1;
                            var get_day = parseInt(d_arr[i].date.slice(0, 2));
                            var day_msg = '';
                            if (get_day == day + 1) {
                                day_msg = '明天 （' + month + '-' + get_day + '）';
                            } else {
                                day_msg = d_arr[i].date.slice(3) + ' （' + month + '-' + get_day + '）';
                            }
                            var day_html = '<div class="day"><div class="img">' + '<img src="images/' + img_data + '.png"/></div><div class="line"><div class="left-con">' + '<div>' + day_msg + '</div>' + '<div><span>' + d_arr[i].type + '</span> <span>' + d_arr[i].fengli + '</span></div></div><div class="right-con">' + '<span>' + high.slice(3) + '</span> / <span>' + low.slice(3) + '</span></div></div></div>';
                            $('.nearday').append($(day_html));
                        }

                    }
                }
            });
        }
    });

});

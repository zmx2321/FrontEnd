var demo = function(){
    var month = 5;
    var time = new Date(2018, month, 0);
    var dayInmonth = time.getDate();  //一个月共有多少天
    var firstDay = new Date(2018, month-1, 1);
    var weekDay = firstDay.getDay();  //一个月的第一天是星期几
    var weeks = Math.ceil((weekDay+dayInmonth)/7);  //一个月有多少个星期
    var days = new Array();
    var day_tep = 0;  //日期

    for(var i=0; i<weeks; i++){  //i表示一个月中的第几个星期
        days[i] = new Array();

        for(var j=0; j<7; j++){  //j表示星期几
            if(i==0 & j>=weekDay || (i>0 & day_tep<dayInmonth)){  //是不是第一个星期
                day_tep++;
                days[i][j] = day_tep;
                document.write(days[i][j] + " ");
                console.log(days[i][j]);
            }else{
                days[i][j] = "";
            }
        }
        document.write("<br />");

    }
    console.log(weekDay);
}

window.onload = function(){
    demo();
};
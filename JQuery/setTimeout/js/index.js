setInterval ("showTime()", 5000);

//时间戳转换
function formatDate(now) {
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var week = now.getDay();
    var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var hour = now.getHours();
    var minute = now.getMinutes();
    return month + "月" + date + "日" + " ( " + weekDay[week] + " ) " +  hour + ":" + minute;
}

function showTime()
{
    var today = new Date();
    today = formatDate(today);
    alert("The time is: " + today.toString ());
}
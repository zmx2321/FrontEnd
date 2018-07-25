/**
 * tools
 * @author zmx2321
 */

/**
 * [timeDiffer1 时间差，天数]
 * @return {[type]} [description]
 */
var timeDiffer = function(e){
  // let endTime = (new Date("2018/11/3 20:10:10")).getTime();  //结束时间
  let endTime = (new Date(e)).getTime();  //结束时间

  let currentTime = new Date().getTime();  //当前时间
  var result = 0;

  let timeDiffer = endTime - currentTime;  //时间差(毫秒数)
  
  //计算天数并判断
  if (timeDiffer > 0){
    return Math.floor(timeDiffer / (24 * 3600 * 1000) + 1);
    // console.log(days);
  }else{
    return "已结束";
    // console.log("已结束");
  }
}

/**
 * [timeDiffer2 时间差，天数]
 * @return {[type]} [description]
 */
function checkDateInfo(dateTime) {
  var olddate = new Date(dateTime);
  //olddate = olddate.getMilliseconds();  
  console.log("old time = ", olddate);
  var result = 0;
  var month = 1000 * 60 * 60 * 24 * 30;//将ms转换成天  
  var just = new Date().getTime();//获取当前时间，单位ms  
  console.log("current time = ", just);
  var diff = just - olddate;
  console.log("diff = ", diff);
  if (diff <= 0) {
    return result;
  }
  var mm = diff / month;
  mm = mm.toFixed();//取整  
  result = parseInt(mm);//转换类型  
  console.log("result = ", result);
  return result;
}

/**
 * [formatDate 时间戳转换]
 * @return {[type]} [description]
 */
function formatDate(now) {
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var date = now.getDate();
  var week = now.getDay();
  var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  var hour = now.getHours();
  var minute = now.getMinutes();
  var second = now.getSeconds();
  var millisend = now.getMilliseconds();
  minute=="0"?minute="00":minute;
  second=="0"?second="00":second;
  millisend=="0"?millisend="00":millisend;
  return year + " 年 " + month + " 月 " + date + " 日 " + " ( " + weekDay[week] + " ) " + hour + ":" + minute + ":" + second + ":" + millisend;
}


/**
 * test
 */
(function(){
  //timeDiffer1
  console.log(timeDiffer("2018/11/3 20:10:10"));

  //timeDiffer2
  // checkDateInfo(2016-10-24);

  //formatDate
  setInterval(function(){
    document.body.innerHTML = formatDate(new Date());
  }, 1);
})(window);


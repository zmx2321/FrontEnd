var d = new Date();
//d.getMonth()+1代表下个月，月份索引从0开始，即当前月为6月时，getMonth()返回值为5，创建日期时同理
//此处构造的日期为下个月的第0天，天数索引从1开始，第0天即代表上个月的最后一天
var curMonthDays = new Date(d.getFullYear(), (d.getMonth()+1), 0).getDate();
alert("本月共有 "+ curMonthDays +" 天");
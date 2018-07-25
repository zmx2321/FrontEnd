//弹出城市
var s_city = document.getElementById('city');

var change = function(city) {
	alert(
		city.value + "\n" +  //传到后台用value
		city.text  //文本
	);
}
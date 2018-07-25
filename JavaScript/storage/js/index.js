//一种让网页可以把键值对存储在用户浏览器客户端的方法，
//且只能存储字符串

//存储
function setStorage(){
  // var input = document.querySelectorAll('.input');  //所有
  var input = document.querySelector('.input');  //第一条
  
  var value = input.value;
  localStorage.setItem('key', value);
}

//获取数据
function getStorage() {
	var value = localStorage.getItem('key');
	var input = document.querySelector('#input');

	input.value = value;
}
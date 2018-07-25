function Log() {
	var val = document.querySelector('#username');
	var pas = document.querySelector('#password');

	var json = localStorage.getItem('personal');

	var object = JSON.parse(json);

	if(val.value == object.username && pas.value == object.password) {
		window.location.href = 'http://www.baidu.com';
	} else {
		alert('您的用户名密码输入有误');
		val.value = '';
		pas.value = '';
	}
}

function clea() {
	//当前页面
	localStorage.clear();
}
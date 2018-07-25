function Log() {
	var user = document.querySelector('#username').value;
	var pass = document.querySelector('#password').value;

	var userInfo = {
		"username": user,
		"password": pass
	};

	localStorage.setItem('personal', JSON.stringify(userInfo));
}
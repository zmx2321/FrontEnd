var getuserinfo = function(){
	$('.userinfo_btn').click(function(){
		var data = {
			name: $('#name').val(),
			wxName: $('#wxName').val(),
			phoneNum: $('#phoneNum').val(),
			address: $('#address').val()
		}

		console.log(data);
	});
}

$(function(){
	getuserinfo();
});
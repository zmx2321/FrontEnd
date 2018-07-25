$(function(){
	jQuery.getScript("js/test.js", function(data, status, jqxhr) {
		alert("这是第二个需要弹出的内容");
	});
});
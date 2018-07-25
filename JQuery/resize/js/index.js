$(document).ready(function(){
	x=0;
	$(window).resize(function() {
		$("span").text(x+=1);
	});
});
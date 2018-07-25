var hover_out = function(){
	$(".box").click(function(){
		alert(11);
	}).mouseover(function(){
		$(".aa").fadeIn();
	}).mouseout(function(){
		$(".aa").fadeOut();
	});
}

$(function(){
	hover_out();
});
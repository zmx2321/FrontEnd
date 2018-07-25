$(function(){
	$('.bigger').bind('click',function(){
		$('.box').animate({
			height: "+=100",
			width: "+=100",
			left: "+=100",
			top: "+=100"
		},1000);
	});

	$('.smaller').bind('click',function(){
		if($('.box').height() <= 100){
			$('.box').animate({
				height: "200",
				width: "200",
				left: "200",
				top: "200"
			},1000);
		} else {
			$('.box').animate({
				height: "-=100",
				width: "-=100",
				left: "-=100",
				top: "-=100"
			},1000);	
		}
	});

	$('.up').click(function(){
		$('.box').animate({
			scrollTop: "-=100",
		},1000);
	});

	$('.down').click(function(){
		$('.box').animate({
			scrollTop: "+=100",
		},1000);
	});
});
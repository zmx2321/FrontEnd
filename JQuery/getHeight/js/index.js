$(function(){
	//获取bottom高度
	var btmHeight = function(){
		var top = $('.top'),
			bottom = $('.bottom');

		var winHeight = $(window).height(),
			topHeight = top.height() + parseInt(top.css('margin-bottom'));

			console.log(topHeight);

		bottom.css('height', winHeight - topHeight);		
	}

	btmHeight();

	$(window).resize(function(){
		btmHeight();
	});

});
(function($){
	$.fn.Slide = function(opt){

		var number = opt.number || 5;//可视数
		var dir = opt.dir || 1;//方向 1是向左 2是向右；
		var time = opt.time || 30;//间隔时间
		var $ul = $('#box ul');
		var $btn = $('#box .btn a');
		var boxWidth = parseInt($('#box').width());
		var liWidth = boxWidth/number;
		var liIndex = 0;
		$ul.html($ul.html()+$ul.html());
		var $li = $('#box ul li');
		var liLength = $li.length;
		var timer = null;
		var iSpeed = dir===1?-10:10;
		$ul.css('width',liLength*$li.eq(0).width());

		function move(){
			var limit = $ul.width()/2;
			var ulLeft = $ul.position().left;
			if(ulLeft>0){
				$ul.css('left',-limit+'px');
			}
			else if(ulLeft < -limit){
				$ul.css('left',0);
			}
			$ul.animate({
				'left' : ulLeft+iSpeed+'px'
			},800);
		}
		timer = setInterval(move,time);

		$('#box').hover(function(){
			clearInterval(timer);
			$btn.show();
		},function(){
			$btn.hide();
			timer = setInterval(move,30);
		});

		$btn.click(function(){
			var index = $(this).index();
			index?iSpeed = liWidth:iSpeed = -liWidth;
			move(iSpeed);
		});
	}
})(jQuery);
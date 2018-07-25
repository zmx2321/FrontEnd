(function($){
	$.fn.slide = function(){
		var divWidth = $('#div1').width();//div盒子的宽度
		var $ul = $('#div1 ul');//获取UL
		var $btna = $('#div1 .btn a')//获取左右按钮
		var ulHtml = $ul.html();//获取原生UL内容
		$ul.html(ulHtml+ulHtml);//给UL添加内容
		var $li = $('#div1 ul li');//获取LI
		var liLength = $li.length;//获取LI的总长度
		var ulWidth = $ul.width(divWidth/4*liLength).width();//给UL设置宽度
		var liWidth = divWidth/4;
		var index = 0;
		var timer = null;
		var iSpeed = -10;

		
		//左右点击切换
		$btna.click(function(){
			var dir = $(this).index();
			if(dir === 0){
				if(parseInt($ul.css('marginLeft'))>=0){
					$ul.css('marginLeft',-ulWidth/2+'px')
					index = -4;
				}
				index++;
			}else if(dir === 1){
				if(parseInt($ul.css('marginLeft'))<=-680){
					$ul.css('marginLeft',0+'px');
					index = 0;
				}
				index--;
			}
			$ul.animate({
				'marginLeft' : 	index*liWidth +'px'
			},600);
			console.log(index);
		});
		//自动轮播
		//autoPlay();
		function autoPlay(){
			timer = setInterval(function(){
				var ml = parseInt($ul.css('marginLeft'));
				if(ml<=-680){
					$ul.css('marginLeft',0+'px');
					console.log(ml);
				}
				$ul.css('marginLeft',ml+iSpeed+'px');
			},30);
		}
		

	}
})(jQuery);
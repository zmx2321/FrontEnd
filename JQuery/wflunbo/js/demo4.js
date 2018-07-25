(function($){
	$.fn.slide = function(opt){
		var number = opt.number || 5;//可视数
		var time = opt.time || 600;//间隔时间
		var dir = opt.dir || left;//滚动方向
		var $ul = $('#box ul');
		var liWidth = $('#box').width()/number;//滚动的宽度每次
		var $btn = $('#box .btn a');//按钮
		var $li =  $('#box ul li');
		var liLength = $li.size();//LI总长度
		var ulWidth = $ul.width(liLength*liWidth+'px').width();//计算ul宽度
		var arr =[];
		var liIndex = 0;


		for(var i=0;i<liLength;i++){
			arr.push( {left: $li[i].offsetLeft} );	
		}
		for(var i=0;i<liLength;i++){
			$li.eq(i).css({
				left : arr[i].left,
				position : 'absolute',
			});
		}
		
		$btn.click(function(){
			var index = $(this).index();
			if(index){
				liIndex--;
			}else{
				liIndex++
			}
			change(liIndex);
				/*
			$ul.animate({
				'left' : liIndex*liWidth + 'px'
			},800,function(){
				if($li.eq(5).offset().left+liWidth === 326.5 ){
					$ul.css('left',0);
				}else if($li.eq(0).offset().left+liWidth === 326.5){
					$ul.css('left',-ulWidth/2+'px');
				}
			});
			console.log($li.eq(5).offset().left+liWidth);
			*/
		});
		function change(liIndex){
			if(liIndex < -5){
			   liIndex = 0;
			   	console.log(liIndex);
				$ul.css('left',0);
				window.liIndex = 0;
			}else if(liIndex >= 0 ){
			   liIndex = -5;
			   $ul.css('left',-ulWidth/2 + 'px');
			   window.liIndex = -5;
			}
			$ul.animate({
				'left' : liIndex*liWidth +'px'
			},600);
		}
	}
})(jQuery);
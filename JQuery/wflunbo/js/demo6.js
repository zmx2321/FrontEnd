(function($){
	$.fn.slide = function(opt){
		var number = opt.number || 5;//可视数
		var time = opt.time || 600;//间隔时间
		var dir = opt.dir || left;//滚动方向
		var $ul = $('#box ul');
		var liLength = $('#box ul li').size();
		var liWidth = $('#box').width()/number;
		var $btn = $('#box .btn a');
		var liIndex = 0;
		var ulWidth = $ul.width(liLength*liWidth+'px').width();
		var $li =  $('#box ul li');

		
		for(var i=0;i<liLength;i++){
			arr.push( {left: $li[i].offsetLeft, top: $li[i].offsetTop} );	
		}
		for(var i=0;i<liLength;i++){
			$li.eq(i).css({
				left : arr[i].left,
				top : arr[i].top,
				position : 'absolute',
			});
		}
		$btn.click(function(){
			var index = $(this).index();
			index?liIndex++:liIndex--;
			move(liIndex);
		});
		function move(liIndex){
			console.log($li.eq(5).offset().left);
			var ml = parseInt($ul.css('marginLeft'));
			console.log(ml);
			if(ml>0){
				$ul.css('marginLeft',-(ulWidth/2));
				liIndex=5
			}else if(ml<-ulWidth/2){
				$ul.css('marginLeft',0);
				liIndex=0;
			}
			console.log($li.eq(5).offset().left);
			
			$ul.animate({
				marginLeft : liIndex*liWidth+'px'
			},1000);
		}

	}
})(jQuery);
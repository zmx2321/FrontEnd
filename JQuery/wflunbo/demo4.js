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
		

	}
})(jQuery);
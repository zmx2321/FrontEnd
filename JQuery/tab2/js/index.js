$(function(){
	$('.tablist li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.tabcontent section').eq($(this).index()).show().siblings().hide();
	});
});
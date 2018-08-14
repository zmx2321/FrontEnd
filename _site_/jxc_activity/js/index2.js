/**
 * @fileoverview 
 * author zmx2321@163.com
 * data 2018/6/8
 */

//honorUtil
var honorUtil = {

}

//获取中间区域高度
var getActivityHeight = function(){
	var windowHeight = $(window).height();
	var headerHeight = $('.activity_top').height() + $('.activity_nav').height();
	var footHeight = $('.activity_bottom').height();

	$('.act_endorsement').css("height", windowHeight - headerHeight - footHeight - 10);
}

//地址选择
var selAddress = function(){
	//mask
	function maskPosition(){
		var headerHeight = $('.activity_top').height() + $('.activity_nav').height();
		$('.m-modal2').css("top", headerHeight+1);
		$('.seladd_box').css("top", headerHeight+1);

		//width
		var liWidth = $('.activity_nav li').width();
		$('.seladd_box ul').css("width", liWidth);

		$('.seladd_box ul.city').css("left", liWidth+1);

		$('.seladd_box ul.county').css("left", liWidth*2+2);
	}
	
	maskPosition();

	//省
	$('#province_btn').click(function(){
		//判断是否隐藏
		if($('.province').css('display') === 'block'){
			$('.province').slideUp();
		}else{
			$('.m-modal2').fadeIn();
			$('.province').slideDown();
		}
	});

	//市
	$('#city_btn').click(function(){
		//判断是否隐藏
		if($('.city').css('display') === 'block'){
			$('.city').slideUp();
		}else{
			$('.m-modal2').fadeIn();
			$('.city').slideDown();
		}
	});

	//县
	$('#county_btn').click(function(){
		//判断是否隐藏
		if($('.county').css('display') === 'block'){
			$('.county').slideUp();
		}else{
			$('.m-modal2').fadeIn();
			$('.county').slideDown();
		}
	});

	//点击背景隐藏
	$('.m-modal2').click(function(){
		$(this).fadeOut();
		$('.province').slideUp();
		$('.city').slideUp();
		$('.county').slideUp();
	});
}


//load
$(function(){
	getActivityHeight();  //获取中间区域高度
	selAddress();  //地址选择
});
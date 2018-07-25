$(function(){
	$('.box').load(function(){
		$("span").text("Image loaded");
	});
});


/*;(function($){// 可以去掉开头的 ; （分号），国外的开发人员编写的插件时的一种习惯 
     $.fn.pluginName = function() {     
           // Our plugin implementation code goes here.     
     };
})(jQuery);    //传入一个jQuery的参数(其是就是匿名函数的参数$的值为jQuery)，是因为该方法是对jQuery库的扩展，那么在该方法体内就可以调用jQuery库中的函数；若不传入，则无法调用jQuery库 */
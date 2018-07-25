	////this is a Jquery plugin function that fire an event when the size of an element changed   
	//usage $().sizeChanged(function(){})
	// JUERY 插件
	// function(arg){...}
	//这就定义了一个匿名函数，参数为arg
	//而调用函数 时，是在函数后面写上括号和实参的，由于操作符的优先级，函数本身也需要用括号，即：
	//(function(arg){...})(param)
	//这 就相当于定义了一个参数为arg的匿名函数，并且将param作为参数来调用这个匿名函数
	//
	//而(function($){...}) (jQuery)则是一样的，之所以只在形参使用$，是为了不与其他库冲突，所以实参用jQuery
	//
	//其实就等于
	//var fn = function($){....};
	//fn(jQuery);

	(function ($)  {  

		//	$.fn.abc()是对jquery扩展了一个abc方法,,那么后面你的每一个jquery实例都可以引用这个方法了,那么你可以这样子：$("#div").abc(); 
		    
		$.fn.sizeChanged  =   function (handleFunction)  {          
			var  element  =  this;          
			var  lastWidth  =  element.width();          
			var  lastHeight  =  element.height();            
			setInterval(function ()  {              
				if (lastWidth  ===  element.width() && lastHeight  ===  element.height())                   return;              
				if (typeof (handleFunction)  ==  'function')  
				{                  
					handleFunction(
						{ 
						width:  lastWidth,
						 height:  lastHeight 
					    },                                 
					    { 
						width:  element.width(),
						 height:  element.height() 
					    }
					    );   
					                   
					lastWidth  =  element.width();                  
					lastHeight  =  element.height();              
				}          
			},  100);          
			return  element;      
		};    
	}(jQuery)); 

	/**
	 * author levi
	 * url http://levi.cg.am
	 */
	$(document).mousemove(function(e) {
		if(!!this.move) {
			var posix = !document.move_target ? {
					'x': 0,
					'y': 0
				} : document.move_target.posix,
				callback = document.call_down || function() {
					$(this.move_target).css({
						'top': e.pageY - posix.y,
						'left': e.pageX - posix.x
					});
				};

			callback.call(this, e, posix);
		}
	}).mouseup(function(e) {
		if(!!this.move) {
			var callback = document.call_up || function() {};
			callback.call(this, e);
			$.extend(this, {
				'move': false,
				'move_target': null,
				'call_down': false,
				'call_up': false
			});
		}
	});

	//var $box = $('#Outbox').mousedown(function(e) {
	//  var offset = $(this).offset();
	//  
	//  this.posix = {'x': e.pageX - offset.left, 'y': e.pageY - offset.top};
	//  $.extend(document, {'move': true, 'move_target': this});
	//}).on('mousedown', '#coor', function(e) {
	//  var posix = {
	//          'w': $box.width(), 
	//          'h': $box.height(), 
	//          'x': e.pageX, 
	//          'y': e.pageY
	//      };
	//  
	//  $.extend(document, {'move': true, 'call_down': function(e) {
	//      $box.css({
	//          'width': Math.max(30, e.pageX - posix.x + posix.w),
	//          'height': Math.max(30, e.pageY - posix.y + posix.h)
	//      });
	//  }});
	//  return false;
	//});		

	var register = function(objectID) {

		var $box = $('#' + objectID).mousedown(function(e) {

			var offset = $(this).offset();

			this.posix = {
				'x': e.pageX - offset.left,
				'y': e.pageY - offset.top
			};
			$.extend(document, { //extend给document添加属性
				'move': true,
				'move_target': this
			});
		}).on('mousedown', '#coor', function(e) {
			var posix = {
				'w': $box.width(),
				'h': $box.height(),
				'x': e.pageX,
				'y': e.pageY
			};

			$.extend(document, {//extend给document添加属性
				'move': true,
				'call_down': function(e) {
					$box.css({
						'width': Math.max(30, e.pageX - posix.x + posix.w),
						'height': Math.max(30, e.pageY - posix.y + posix.h)
					});
				}
			});
			return false;
		});

	
	//选中和离开效果
	$("#"+objectID).mouseover(function() {
		
		$(this).css("background-color", "rgba(190,190,190,0.3)");
	});

	$("#"+objectID).mouseout(function() {

		$(this).css("background-color", "rgba(0,0,0,0)");
	});

	};


	var unRegister = function(objectID) {

	//选中和离开效果
	$("#"+objectID).unbind('mouseover');

	};
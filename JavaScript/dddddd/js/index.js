/*$('#js-table-test td').click(function(argument){
	var m = $(this).text();
	var s = "<input type='text' value='"+m+"' />";
	$(this).html(s);  //事件捕获了，不能输入东西
});
$('#js-table-test td').on('click', 'input', function(e){
	e.stopPropagation();  //阻止冒泡
});*/

(function($){  //减少当前jquery查找（让局部的变量快速寻找jquery）
	var index = {  //命名空间
		init: function(){  //运行
			var me = this;
			me.render();
			me.bind();
		},
		datas: {  //让当前事件全部都去处理当前共享的东西
			num : 1
		},
		render: function(){  //封装所有对应的元素
			var me = this;
			me.test = $('#js-table-test td');
		},  //元素
		bind: function () {  //放所有的事件
			var me = this;
			/*me.test.click(function(argument){
				me._do();
			});*/
			me.test.on('click', $.proxy(me['attrInput'], this))  //当前执行的事件, 对象(proxy默认会传一个e)
			me.test.on('keyup', $.proxy(me['confirmInput'], me))
		},  //事件
		attrInput: function(e){  //事件中的方法体
			var me = this;
			var m = $(e.target).text();
			m = me.datas.num + m;
			var s = "<input type='text' value='"+m+"' />";
			$(e.target).html(s);
			/*$(e.target).attr("readonly", "").css({
				"border": "solid 1px #ccc"
			});*/
			console.log("鼠标事件");
		},  //事件
		confirmInput: function(e){
			console.log("键盘事件");
			 var keycode = event.which;
			if(keycode == 13){
				$(e.target).attr("readonly", "readonly").css({
					"border": "none"
				});
			}
		}
	}; 
	index.init();
	exports = index;  //模块化
})(jQuery)

/*$('#js-table-test td').on('keyup', 'input', function(e){
	var me = $(this);
	if(e.keycode == 13){
		// me.val();
		console.log(this);
	}
});  //动态的用on*/
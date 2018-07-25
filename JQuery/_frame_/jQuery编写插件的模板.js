// orztabs.js
;(function($){
	var Tabs = function(elements,options){
		this.$elements = elements;
		this.defaults = {
			// 插件默认设置
		};
		this.options = $.extend({}, this.defaults, options);
	};

	Tabs.prototype = {
		init: function(){
			return this.$elements.css({
				// 配置项,设置到元素上,返回元素
			});
		};
	};

	// 创建插件
	$.fn.orztabs = function(options){
		// 实例化插件
		var tab = new Tabs(this,options);
		return tab.init();
	};
})(jQuery);
/**
 * @zmx2321
 * 
 **/

 // 名字空间模块
 var app = {
 	util: {},
 	store: {},
 };

 // 工具方法模块
 app.util = {
 	$: function(selector, node){
 		return (node || document).querySelector(selector);
 	},
 	addClass: function(element,csName){
 		var hasClass = function(element, csName){
 			return element.className.match(RegExp('(\\s|^)'+csName+'(\\s|$)')); //使用正则检测是否有相同的样式
 		};

 		if(!hasClass(element,csName)){
 			element.className+=' '+csName;
 		}
 	},
 	removeClass: function(element,csName){
 		var hasClass = function(element, csName){
 			return element.className.match(RegExp('(\\s|^)'+csName+'(\\s|$)')); //使用正则检测是否有相同的样式
 		};

 		if(hasClass(element,csName)){
 			element.className = element.className.replace(RegExp('(\\s|^)'+csName+'(\\s|$)'),' ');  //利用正则捕获到要删除的样式的名称，然后把他替换成一个空白字符串，就相当于删除了
 		}
 	},
 };

// store 模块
 app.store = {
 	setCookies: function(opt){
		var cookie = encodeURIComponent(opt.name)+'='+ encodeURIComponent(opt.value);
		if (opt.expires)
			cookie += '; expires=' + opt.expires.toGMTString();
		if (opt.path)
			cookie += '; path=' + opt.path;
		if (opt.domain)
			cookie += '; domain=' + opt.domain;
		if (opt.secure)
			cookie += '; secure=' + opt.secure;
			document.cookie = cookie;
 	},
 	getCookies: function(){
	    var cookie = {};
	    var all = document.cookie;
	    if (all === '')
	        return cookie;
	    var list = all.split('; ');
	    for (var i = 0; i < list.length; i++) {
	        var item = list[i];
	        var p = item.indexOf('=');
	        var name = item.substring(0, p);
	        name = decodeURIComponent(name);
	        var value = item.substring(p + 1);
	        value = decodeURIComponent(value);
	        cookie[name] = value;
	    }
	    return cookie;
 	}
 };

// 应用代码，立即执行函数
(function(util, store){
	var $ = util.$;
	var addClass = util.addClass;
	var removeClass = util.removeClass;

	// 1.检测顶部通知条,实现点击X后关闭
	document.addEventListener('DOMContentLoaded', function(e){	// DOM树构建完成时加载
		var cookiesObj = store.getCookies();

		if(cookiesObj && cookiesObj.topclose){
			addClass($('#tips'), 'f-dn');
		} else {
			$('#closeTips').addEventListener('click', function(){
				var now = new Date();
				now.setFullYear(now.getFullYear()+1);
				store.setCookies({
					name: "topclose",
					value: "1",
					expires: now,
				});
				addClass($('#tips'), 'f-dn');
			});
		}
	});

	// 2.关注“网易教育产品部”/登录
	document.addEventListener('DOMContentLoaded', function(e){
		var cookiesObj = store.getCookies();

		$('#guanzhudnc').addEventListener('click', function(){
			removeClass($('#attention'), 'z-show');
			addClass($('#guanzhudnc'), 'z-hide');

		});

		// if(cookiesObj && cookiesObj.loginSuc){
		// 	addClass($('#attention'), 'z-show');
		// 	// $('#attention').addClass("z-hide");
		// 	// removeClass($('#tips'), 'f-dn');
		// }
	});
})(app.util, app.store);
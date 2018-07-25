/**
 * 一些常用的方法
 * @zmx2321
 * 
 **/
 
// 名字空间模块
 var app = {
 	util: {},
 	store_cookie: {},
 	store_localstorage: {},
 };

 // 工具方法模块
 app.util = {
 	// 用$获取元素
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
 			element.className = element.className.replace(RegExp('(\\s|^)'+csName+'(\\s|$)'),'');  //利用正则捕获到要删除的样式的名称，然后把他替换成一个空白字符串，就相当于删除了
 		}
 	},
 	addClass0: function(element, className){
	    let targetClassNames = className.split(" ");
	    let classNames = element.className.split(" ");
	    targetClassNames.filter(className=>classNames.indexOf(className)<0);
	    return element.className = classNames.concat(targetClassNames).join(" ");
 	},
 	removeClass0: function(element, className){
	    let targetClassNames = className.split(" ");
	    let classNames = element.className.split(" ");
	    return element.className = classNames
	        .filter(className=>targetClassNames.indexOf(className)<0).join(" ");
 	}
 };

// store_cookie 模块
 app.store_cookie = {
 	// 设置cookie
 	setCookie: function(opt){
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
	// 获取cookie
 	getCookie: function(){
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
 	},
 	// 删除指定cookie
 	removeCookie: function(opt){
	    document.cookie = 'name=' + opt.name + '; path=' + opt.path + '; domain=' + opt.domain + '; max-age=0';
 	},
 	// 清空所有cookie
 	clearCookie: function(){
 		var keys=document.cookie.match(/[^ =;]+(?=\=)/g); 
		if (keys) { 
			for (var i = keys.length; i--;) {
				document.cookie=keys[i]+'=0;expires=' + new Date( 0).toUTCString();
			}
		} 
 	},
 };

 //store_localstorage 模块
app.store_localstorage = {

};

// 应用代码，立即执行函数
(function(util, store_cookie, store_localstorage){
	var $ = util.$;
	var addClass = util.addClass;
	var removeClass = util.removeClass;

	// DOM树构建完成时加载 ==> 相当于jquery的ready
	// tips
	document.addEventListener('DOMContentLoaded', function(e){
		$('body').className = "bb";
		addClass($('body'), 'aa');
		removeClass($('body'), 'bb');
	});

	// cookie
	document.addEventListener('DOMContentLoaded', function(e){
		// setCookie
		var now = new Date();
		now.setFullYear(now.getFullYear()+1);
		store_cookie.setCookie({
			name: "topclose",
			value: "1",
			expires: now,
		});

		// getCookie
		var cookiesObj = store_cookie.getCookie();
		console.log(cookiesObj);

		// clearCookie
		setTimeout(function(){
			store_cookie.clearCookie();
		}, 5000);
	});

	// localstorage
	document.addEventListener('DOMContentLoaded', function(e){

	});
})(app.util, app.store_cookie, app.store_localstorage);
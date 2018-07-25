/*
*@fileoverview 查找addEventListener绑定事件队列
*@author	zmx2321@163.com
*@date	2017/10/19
 */

((w) => {
	w.listenerList = new Set();
	const _cache = w.addEventListener;
	const handler = {
		apply:  (target, thisbinding, args) => {
			target();
			listenerList.add(args[0]);
			// _cache.apply(w, args);
			Reflect.apply(_cache, w, args);
		}
	}

	w.addEventListener = new Proxy((eventname, fn) => {
		console.log(222);
	}, handler);
})(window);

//原来的业务逻辑
window.addEventListener("resize", function(argument){
	console.log(111);
});

window.addEventListener("a", function(argument){
});

//输出原来绑定的事件
for(const val of listenerList){
	console.log(val);
}

window.addEventListener("resize", function(argument){
	console.log(222);
})
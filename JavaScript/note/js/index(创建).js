/**
 * @zmx2321
 * 
 **/
 
 //名字空间模块
 var app = {
 	util: {}
 };

 //工具方法模块
 app.util = {
 	$: function(selector, node){
 		return (node || document).querySelector(selector);
 	}
 };

//应用代码，立即执行函数
 (function(util){
 	var $ = util.$;

 	var noteTpl = `
		<i class="u-close"></i>
		<div class="u-editor" contenteditable="true"></div>
		<div class="u-timestamp">
			<span>更新：</span>
			<span class="time">2017-06-14 20:11:30</span>
		</div>
 	`;

 	function Note(options){
 		var container = document.createElement('div');
 		container.className = 'm-note';
 		container.innerHTML = noteTpl;
 		document.body.appendChild(container);
 	}


 	document.addEventListener('DOMContentLoaded', function(e){
 		$('#create').addEventListener('click', function(e){
 			new Note();
 		});
 	});

 })(app.util)

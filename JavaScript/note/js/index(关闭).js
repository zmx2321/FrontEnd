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
 		var note = document.createElement('div');
 		note.className = 'm-note';
 		note.innerHTML = noteTpl;
 		document.body.appendChild(note);
 		this.note = note;
 		this.addEvent();
 	}

 	Note.prototype.close = function(e){
 		// console.log('close note');
 		// document.body.removeChild(this.note);	//关闭
 	}

 	Note.prototype.addEvent = function(){
 		//关闭处理程序
 		closeBtn = $('.u-close', this.note);
 		var closeHandler = function(e){
 			this.close(e);
 			closeBtn.removeEventListener('click', closeHandler);
 		}.bind(this);

 		// $('.u-close', this.note).addEventListener('click', this.close.bind(this));
 		$('.u-close', this.note).addEventListener('click', closeHandler);
 	}


 	document.addEventListener('DOMContentLoaded', function(e){
 		$('#create').addEventListener('click', function(e){
 			new Note();
 		});
 	});

 })(app.util)

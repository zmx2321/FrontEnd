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
 	},
 	formatTime: function(ms){
 		var d = new Date(ms);

 		var pad = function(s){
 			// debugger;
 			if(s.toString().length === 1){
 				s = '0' + s;
 			}
 			return s;
 		}

 		var year = d.getFullYear();
 		var month = d.getMonth() + 1;
 		var date = d.getDate();

 		var hour = d.getHours();
 		var minute = d.getMinutes();
 		var second = d.getSeconds();

 		return year + '-' + pad(month) + '-' + pad(date) + ' ' + pad(hour) + ':' + pad(minute) + ':' + pad(second);
 	}
 };

//应用代码，立即执行函数
 (function(util){
 	var $ = util.$;
 	var moveNote = null;
 	var startX;
 	var	startY;
 	var maxZIndex = 0;

 	var noteTpl = `
		<i class="u-close"></i>
		<div class="u-editor" contenteditable="true"></div>
		<div class="u-timestamp">
			<span>更新：</span>
			<span class="time"></span>
		</div>
 	`;

 	function Note(options){
 		var note = document.createElement('div');
 		note.className = 'm-note';
 		note.innerHTML = noteTpl;
 		note.style.left = options.left + 'px';
 		note.style.top = options.top + 'px';
 		note.style.zIndex = options.zIndex;
 		document.body.appendChild(note);
 		this.note = note;
 		this.updateTime();
 		this.addEvent();
 	}

 	Note.prototype.updateTime = function(ms){
 		var ts = $('.time', this.note);
 		ms = ms || Date.now();
 		ts.innerHTML = util.formatTime(ms);
 	}

 	Note.prototype.close = function(e){
 		console.log('close note');
 		document.body.removeChild(this.note);	//关闭
 	}

 	Note.prototype.addEvent = function(){
		//便笺的 mousedown 事件
 		var mousedownHandler = function(e){
 			moveNote = this.note;
 			startX = e.clientX - this.note.offsetLeft;
 			startY = e.clientY - this.note.offsetTop;
 			// console.log(startX);
 			// console.log(startY);
 			if(parseInt(this.note.style.zIndex) !== maxZIndex - 1){
 				this.note.style.zIndex = maxZIndex++;
 			}
 		}.bind(this);
 		this.note.addEventListener('mousedown', mousedownHandler);

 		//关闭处理程序
 		closeBtn = $('.u-close', this.note);
 		var closeHandler = function(e){
 			this.close(e);
 			closeBtn.removeEventListener('click', closeHandler);
 			this.note.removeEventListener('mousedown', mousedownHandler);
 		}.bind(this);
 		// $('.u-close', this.note).addEventListener('click', this.close.bind(this));
 		$('.u-close', this.note).addEventListener('click', closeHandler);
 	}


 	document.addEventListener('DOMContentLoaded', function(e){
		//创建按钮事件
 		$('#create').addEventListener('click', function(e){
 			// new Note();
 			new Note({
 				left: Math.round(Math.random() * (window.innerWidth - 220)),
 				top: Math.round(Math.random() * (window.innerHeight - 320)),
 				zIndex: maxZIndex++
 			});
 		});
 		
 		//移动监听
 		function mousemoveHandler(e){
 			// console.log(e);
 			if(!moveNote){
 				return;
 			}
 			moveNote.style.left = e.clientX - startX + 'px';
 			moveNote.style.top = e.clientY - startY + 'px';
 		}

 		function mouseupHandler(e){
 			moveNote = null;
 		}

 		document.addEventListener('mousemove', mousemoveHandler);
 		document.addEventListener('mouseup', mouseupHandler);
 	});

 })(app.util);

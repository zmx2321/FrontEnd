
// div元素增加resize事件(http://www.cnblogs.com/libin-1/p/6018332.html)
// add Jquery resize event for div
	(function($, h, c) {
    var a = $([]),
        e = $.resize = $.extend($.resize, {}),
        i,
        k = "setTimeout",
        j = "resize",
        d = j + "-special-event",
        b = "delay",
        f = "throttleWindow";
    e[b] = 250;
    e[f] = true;
    $.event.special[j] = {
        setup: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.add(l);
            $.data(this, d, {
                w: l.width(),
                h: l.height()
            });
            if (a.length === 1) {
                g();
            }
        },
        teardown: function() {
            if (!e[f] && this[k]) {
                return false;
            }
            var l = $(this);
            a = a.not(l);
            l.removeData(d);
            if (!a.length) {
                clearTimeout(i);
            }
        },
        add: function(l) {
            if (!e[f] && this[k]) {
                return false;
            }
            var n;
            function m(s, o, p) {
                var q = $(this),
                    r = $.data(this, d);
                r.w = o !== c ? o: q.width();
                r.h = p !== c ? p: q.height();
                n.apply(this, arguments);
            }
            if ($.isFunction(l)) {
                n = l;
                return m;
            } else {
                n = l.handler;
                l.handler = m;
            }
        }
    };
    function g() {
        i = h[k](function() {
                a.each(function() {
                    var n = $(this),
                        m = n.width(),
                        l = n.height(),
                        o = $.data(this, d);
                    if (m !== o.w || l !== o.h) {
                        n.trigger(j, [o.w = m, o.h = l]);
                    }
                });
                g();
            },
            e[b]);
    }
})(jQuery, this);


	/*
	 * jQuery.Resize by wuxinxi007
	 * Date: 2011-5-14
//	 */
//	$(function() {
//		//绑定需要拖拽移动或改变大小的元素对象
//		moveOrRsize(document.getElementById('div2'));
//	});


	function moveOrRsize(el) {
		//初始化参数
		var els = el.style,
			//鼠标的 X 和 Y 轴坐标
			x = y = 0;

		//邪恶的食指
		$(el).mousedown(function(e) {

			$("#offsetX").text(e.offsetX);
			$("#offsetWidth").text("offsetWidth/2:"+el.offsetWidth/2);
			
			if(e.offsetX > el.offsetWidth / 2) { //offsetX 火狐不支持
			
			//按下元素后，计算当前鼠标与对象计算后的坐标
			x = e.clientX - el.offsetWidth,
			y = e.clientY - el.offsetHeight;

            $("#clientX").text(e.clientX);
			$("#clientY").text(e.clientY);
          
				//在支持 setCapture 做些东东
				el.setCapture ? (  //关于js语句中的逗作用https://www.zhihu.com/question/27620371
					//捕捉焦点
					el.setCapture(),
					//设置事件
					el.onmousemove = function(ev) {
						domResize(ev || event)
					},
					el.onmouseup = UnbindResize) : (
					//绑定事件
					$(document).bind("mousemove", domResize).bind("mouseup", UnbindResize)
				)

			}else
			{
			
			
		//按下元素后，计算当前鼠标与对象计算后的坐标
			x = e.offsetX,
			y = e.offsetY;
			
			$("#offsetX").text(x);
			$("#offsetY").text(y);
          
				//在支持 setCapture 做些东东
				el.setCapture ? (
					//捕捉焦点
					el.setCapture(),
					//设置事件
					el.onmousemove = function(ev) {
						domMove(ev || event)
					},
					el.onmouseup = UnbindMove) : (
					//绑定事件
					$(document).bind("mousemove", domMove).bind("mouseup", UnbindMove)
				)
			
			}

			//防止默认事件发生
			e.preventDefault()
		});
		
		
		
		//调整事件
		function domResize(e) {

			//宇宙超级无敌运算中...
			els.width = e.clientX - x + 'px',
			els.height = e.clientY - y + 'px'
			
			$("#offsetX").text("els.width:"+els.width);
			$("#offsetY").text("els.height:"+els.height);
		}
		
		
		//移动事件
		function domMove(e) {

			els.left = e.clientX - x + 'px';
			els.top  = e.clientY - y + 'px';
			
			$("#offsetX").text("els.left:"+els.left);
			$("#offsetY").text("els.top:"+els.top);
		}
		
		//停止事件
		function UnbindResize() {
			//在支持 releaseCapture 做些东东
			el.releaseCapture ? (
				//释放焦点
				el.releaseCapture(),
				//移除事件
				el.onmousemove = el.onmouseup = null
			) : (
				//卸载事件
				$(document).unbind("mousemove", domResize).unbind("mouseup", UnbindResize)
			)
		}
		
		//停止事件
		function UnbindMove() {
			//在支持 releaseCapture 做些东东
			el.releaseCapture ? (
				//释放焦点
				el.releaseCapture(),
				//移除事件
				el.onmousemove = el.onmouseup = null
			) : (
				//卸载事件
				$(document).unbind("mousemove", domMove).unbind("mouseup", UnbindMove)
			)
		}
	}
	
	

 
   var bindMoveOrReszie = function(objectID)
   {
   	
   	//绑定需要拖拽改变大小的元素对象
		moveOrRsize(document.getElementById(objectID));
		
		
			//选中和离开效果
	$("#"+objectID).mouseover(function() {
		
		$(this).css("border", "1px solid #ccc");
	});

	$("#"+objectID).mouseout(function() {

		$(this).css("border", "none");
	});

   }
   

	


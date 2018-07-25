(function($) {
	

	window.timeTools = {};
	window.timeTools.minute = 0;
	window.timeTools.second = 0;
	window.timeTools.fengpanminute = 0;
	window.timeTools.fengpansecond = 0;
	window.timeTools.kaipanminute = 0;
	window.timeTools.kaigpansecond = 0;
	timeTools.startReadFengpanTime = function(minute, second) {
		window.timeTools.minute = minute;
		window.timeTools.second = second;
		$("#second .time_board").html(window.timeTools.second);
		$("#minute .time_board").html(window.timeTools.minute);

		clearInterval(window.timeTools.stop_opentime);

		window.timeTools.stop_opentime = setInterval(function() {
			if(window.timeTools.second == 0 && window.timeTools.minute == 0) {
				clearInterval(window.timeTools.stop_opentime);
				$(".lottery_index_body_center").trigger("fengpanTimeEnd");
				return;
			}

			if(window.timeTools.second == 0 && window.timeTools.minute != 0) {
				window.timeTools.second = 60;
			}

			window.timeTools.second--;
			//			$("#second .time_board").html(window.timeTools.second).addClass("ani_read_time");
			$("#second .time_board").html(window.timeTools.second);
			$("#second #second_main").html(window.timeTools.second);

			if(window.timeTools.second == 59) {
				window.timeTools.minute--;
				//				$("#minute .time_board").html(window.timeTools.minute).addClass("ani_read_time");
				$("#minute .time_board").html(window.timeTools.minute);
			}

			if(window.timeTools.minute == 0 && window.timeTools.second == 0) {
				clearInterval(window.timeTools.stop_opentime);
				$(".lottery_index_body_center").trigger("fengpanTimeEnd");
			}
		}, 1000);

	}

	timeTools.startReadFengpanTime_phone = function(minute, second) {
		window.timeTools.minute = minute;
		window.timeTools.second = second;
		$("#fengpan_second").html(window.timeTools.second);
		$("#fengpan_minute").html(window.timeTools.minute);

		clearInterval(window.timeTools.stop_opentime);

		window.timeTools.stop_opentime = setInterval(function() {
			if(window.timeTools.second == 0 && window.timeTools.minute == 0) {
				clearInterval(window.timeTools.stop_opentime);
				$(".header_open_time").trigger("fengpanTimeEnd");
				return;
			}

			if(window.timeTools.second == 0 && window.timeTools.minute != 0) {
				window.timeTools.second = 60;
			}

			window.timeTools.second--;
			$("#fengpan_second").html(window.timeTools.second);

			if(window.timeTools.second == 59) {
				window.timeTools.minute--;
				$("#fengpan_minute").html(window.timeTools.minute);
			}

			if(window.timeTools.minute == 0 && window.timeTools.second == 0) {
				clearInterval(window.timeTools.stop_opentime);
				$(".header_open_time").trigger("fengpanTimeEnd");
			}
		}, 1000);

	}

	timeTools.startKaipanTime = function(minute, second) {
		window.timeTools.kaipanminute = minute;
		window.timeTools.kaigpansecond = second;

		clearInterval(window.timeTools.stop_kaitime);

		window.timeTools.stop_kaitime = setInterval(function() {
			if(window.timeTools.kaigpansecond == 0 && window.timeTools.kaipanminute == 0) {
				clearInterval(window.timeTools.stop_kaitime);
				$(".lottery_index_body_center").trigger("kaipanTimeEnd");
				return;
			}

			if(window.timeTools.kaigpansecond == 0 && window.timeTools.kaipanminute != 0) {
				window.timeTools.kaigpansecond = 60;
			}

			window.timeTools.kaigpansecond--;

			if(window.timeTools.kaigpansecond == 59)
				window.timeTools.kaipanminute--;

			if(window.timeTools.kaipanminute == 0 && window.timeTools.kaigpansecond == 0) {
				clearInterval(window.timeTools.stop_kaitime);
				$(".lottery_index_body_center").trigger("kaipanTimeEnd");
			}
			console.log(timeTools.kaipanminute + ":" + timeTools.kaigpansecond);
		}, 1000);
	}

	timeTools.startKaipanTime_phone = function(minute, second) {
		window.timeTools.kaipanminute = minute;
		window.timeTools.kaigpansecond = second;

		clearInterval(window.timeTools.stop_kaitime);
		$("#fengpan_second").html(0);
		$("#fengpan_minute").html(0);
		window.timeTools.stop_kaitime = setInterval(function() {
			if(window.timeTools.kaigpansecond == 0 && window.timeTools.kaipanminute == 0) {
				clearInterval(window.timeTools.stop_kaitime);
				$(".header_open_time").trigger("kaipanTimeEnd");
				return;
			}

			if(window.timeTools.kaigpansecond == 0 && window.timeTools.kaipanminute != 0) {
				window.timeTools.kaigpansecond = 60;
			}

			window.timeTools.kaigpansecond--;

			if(window.timeTools.kaigpansecond == 59)
				window.timeTools.kaipanminute--;

			if(window.timeTools.kaipanminute == 0 && window.timeTools.kaigpansecond == 0) {
				clearInterval(window.timeTools.stop_kaitime);
				$(".header_open_time").trigger("kaipanTimeEnd");
			}
			console.log(timeTools.kaipanminute + ":" + timeTools.kaigpansecond);
		}, 1000);
	}

	timeTools.startReadOpenTime = function(minute, second) {
		window.timeTools.fengpanminute = minute;
		window.timeTools.fengpansecond = second;

		var vertulSecond = window.timeTools.fengpansecond + "";
		for(var i = 0; i < 2; i++) {
			if(vertulSecond.length < 2) {
				vertulSecond = "0" + vertulSecond;
			}
		}

		$("#fengpan_second").html(vertulSecond);

		var vertulMinutes = window.timeTools.fengpanminute + "";
		for(var i = 0; i < 2; i++) {
			if(vertulMinutes.length < 2) {
				vertulMinutes = "0" + vertulMinutes;
			}
		}

		$("#fengpan_minute").html(vertulMinutes);
		clearInterval(window.timeTools.stop_fengpantime);

		window.timeTools.stop_fengpantime = setInterval(function() {
			if(window.timeTools.fengpanminute == 0 && window.timeTools.fengpansecond == 0) {
				clearInterval(window.timeTools.stop_fengpantime);
				$(".lottery_index_body_center").trigger("openTimeEnd");
				return;
			}

			window.timeTools.fengpansecond--;
			vertulSecond = window.timeTools.fengpansecond + "";
			for(var i = 0; i < 2; i++) {
				if(vertulSecond.length < 2) {
					vertulSecond = "0" + vertulSecond;
				}
			}

			$("#fengpan_second").html(vertulSecond);

			if(window.timeTools.fengpansecond == 59) {
				window.timeTools.fengpanminute--;
				vertulMinutes = window.timeTools.fengpanminute + "";
				for(var i = 0; i < 2; i++) {
					if(vertulMinutes.length < 2) {
						vertulMinutes = "0" + vertulMinutes;
					}
				}
				$("#fengpan_minute").html(vertulMinutes);
			}

			if(window.timeTools.fengpansecond == 0 && window.timeTools.fengpanminute != 0) {
				window.timeTools.fengpansecond = 60;
			}

			if(window.timeTools.fengpanminute == 0 && window.timeTools.fengpansecond == 0) {
				clearInterval(window.timeTools.stop_fengpantime);
				$(".lottery_index_body_center").trigger("openTimeEnd");
			}
		}, 1000);

	}

	timeTools.startReadOpenTime_phone = function(minute, second) {
		window.timeTools.fengpanminute = minute;
		window.timeTools.fengpansecond = second;
		$("#open_second").html(window.timeTools.fengpansecond);
		$("#open_minute").html(window.timeTools.fengpanminute);
		clearInterval(window.timeTools.stop_fengpantime);

		window.timeTools.stop_fengpantime = setInterval(function() {
			if(window.timeTools.fengpanminute == 0 && window.timeTools.fengpansecond == 0) {
				clearInterval(window.timeTools.stop_fengpantime);
				$(".header_open_time").trigger("openTimeEnd");
				return;
			}

			window.timeTools.fengpansecond--;
			$("#open_second").html(window.timeTools.fengpansecond);

			if(window.timeTools.fengpansecond == 59) {
				window.timeTools.fengpanminute--;
				$("#open_minute").html(window.timeTools.fengpanminute);
			}

			if(window.timeTools.fengpansecond == 0 && window.timeTools.fengpanminute != 0) {
				window.timeTools.fengpansecond = 60;
			}

			if(window.timeTools.fengpanminute == 0 && window.timeTools.fengpansecond == 0) {
				clearInterval(window.timeTools.stop_fengpantime);
				$(".header_open_time").trigger("openTimeEnd");
			}
		}, 1000);

	}

	window.windowTools = {};
	window.windowTools.showPhoneWindow = function() {

	}

	window.windowTools.alertTime = 0;

	window.windowTools.alert = function(title, content) {
		window.windowTools.alertTime = 0;

		var dom = '<div class="cus_alert">';
		dom += '<div class="cus_alert_header">';
		dom += title;
		dom += '</div>';
		dom += '<div class="cus_alert_body">';
		dom += content;
		dom += '<div class="cus_alert_body_yes" onclick="cus_mask_click()">知道了</div>'
		dom += '</div></div>';
		dom += '<div class="cus_mask" onclick="cus_mask_click()">';
		dom += '</div>';
		$("body").prepend(dom);
		setTimeout(function() {
			$(".cus_alert").addClass("cus_show");
		}, 100);

		window.windowTools.alertTimeStop = setInterval(function() {
			if(window.windowTools.alertTime == 3) {
				clearInterval(window.windowTools.alertTimeStop);
				window.cus_mask_click();
			}
			window.windowTools.alertTime++;
		}, 1000);
	}
	$("body").on("click", ".cus_mask", function() {
		$(".cus_alert").removeClass("cus_show");
		setTimeout(function() {
			$(".cus_alert").remove();
			$(".cus_mask").remove();
		}, 300);
	});

	window.cus_mask_click = function() {
		$(".cus_alert").removeClass("cus_show");
		setTimeout(function() {
			$(".cus_alert").remove();
			$(".cus_mask").remove();
		}, 300);
	}

	window.windowTools.showPhoneMask = function() {
		$("body").append("<div class='phone_mask'></div>");
	}

	$("body").on("click", ".phone_mask", function() {
		$(".header_hearder_right_menu_list").fadeOut();
		$(this).remove();
	});

	window.windowTools.showWindow = function(url, wid, success_cus) {
		var domStr = '<div class="sys_tips"></div>';
		domStr += '<div class="sys_tips_container">';

		if(wid) {
			domStr += '<div class="sys_tips_container_c" style="width:' + wid + 'px;">';
		} else {
			domStr += '<div class="sys_tips_container_c">';
		}
		domStr += '</div></div>';
		$("body").prepend(domStr);
		$(".sys_tips").show();
		$(".sys_tips_container").show();
		$(".sys_tips_container_c").addClass("ani_sys_tips_show").addClass("sys_tips_show");

		$.ajax({
			type: "get",
			url: url,
			async: true,
			dataType: "html",
			data: {},
			success: function(data) {
				$(".sys_tips_container_c").html(data);
				if(success_cus)
					success_cus();
			}
		});
	}

	window.windowTools.returnWindow = function(url, wid, success_cus) {

		if(wid) {
			$(".sys_tips_container_c").width(wid);
		}
		$(".sys_tips_container_c").removeClass("sys_tips_show").removeClass("ani_sys_tips_show");

		setTimeout(function() {
			$.ajax({
				type: "get",
				url: url,
				async: true,
				dataType: "html",
				data: {},
				success: function(data) {
					$(".sys_tips_container_c").html(data);
					$(".sys_tips_container_c").addClass("ani_sys_tips_show").addClass("sys_tips_show");
					if(success_cus)
						success_cus();
				}
			});
		}, 500);

	}

	window.windowTools.cus_toast = function(str) {
		$("body").append('<div class="cus-toast"><div class="cus-toast-content" style="width:' + ((str.toString().length * 13 + 50) + "px") + ';">' + str + '</div></div>');
		var elem = jQuery(".cus-toast");
		var childElem = jQuery(".cus-toast-content");
		childElem.addClass("ani-fadeIn");
	}

	$("body").on("animationend", ".cus-toast-content", function() {
		$(this).parent().remove();
	});

	$("body").on("webkitAnimationEnd", ".cus-toast-content", function() {
		$(this).parent().remove();
	});

	$("body").on("click", ".sys_tips", function() {
		$(".sys_tips").remove();
		$(".sys_tips_container").remove();
	});

	$("body").on("webkitAnimationEnd", ".sys_tips_container_c", function() {
		$(this).removeClass("ani_sys_tips_show");
	});

	//	$("body").on("webkitAnimationEnd", ".time_board", function() {
	//		$(this).removeClass("ani_read_time");
	//	});
	//
	//	$("body").on("animationend", ".time_board", function() {
	//		$(this).removeClass("ani_read_time");
	//	});

	jQuery("body").on("animationend", ".cus-toast-content", function() {
		jQuery(this).parent().remove();
	});

	window.windowTools.isPC = function() {
		var userAgentInfo = navigator.userAgent;
		var Agents = ["Android", "iPhone",
			"SymbianOS", "Windows Phone",
			"iPad", "iPod"
		];
		var flag = true;
		for(var v = 0; v < Agents.length; v++) {
			if(userAgentInfo.indexOf(Agents[v]) > 0) {
				flag = false;
				break;
			}
		}
		return flag;
	}

	Date.prototype.pattern = function(fmt) {
		var o = {
			"M+": this.getMonth() + 1, //月份         
			"d+": this.getDate(), //日         
			"h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时         
			"H+": this.getHours(), //小时         
			"m+": this.getMinutes(), //分         
			"s+": this.getSeconds(), //秒         
			"q+": Math.floor((this.getMonth() + 3) / 3), //季度         
			"S": this.getMilliseconds() //毫秒         
		};
		var week = {
			"0": "/u65e5",
			"1": "/u4e00",
			"2": "/u4e8c",
			"3": "/u4e09",
			"4": "/u56db",
			"5": "/u4e94",
			"6": "/u516d"
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if(/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
		}
		for(var k in o) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			}
		}
		return fmt;
	}

	window.loading = {};
	window.loading.show = function() {
		var domStr = '';
		domStr += '<div class="loading_mask">';
		domStr += '<div class="loading_content">';
		domStr += '<div class="ball-clip-rotate-multiple">';
		domStr += '<div></div>';
		domStr += '<div></div>';
		domStr += '</div></div></div>';

		$("body").append(domStr);
	}

	window.loading.mask_show = function() {
		var domStr = '';
		domStr += '<div class="loading_mask1">';
		domStr += '</div>';
		$("body").append(domStr);
	}

	window.loading.mask_close = function() {
		$(".loading_mask1").remove();
	}

	window.loading.close = function() {
		$(".loading_mask").remove();
	}

	window.textTools = {};
	window.textTools.selectText = function(o, a, b) {
		//o是当前对象，例如文本域对象
		//a是起始位置，b是终点位置
		var a = parseInt(a, 10),
			b = parseInt(b, 10);
		var l = o.value.length;
		if(l) {
			//如果非数值，则表示从起始位置选择到结束位置
			if(!a) {
				a = 0;
			}
			if(!b) {
				b = l;
			}
			//如果值超过长度，则就是当前对象值的长度
			if(a > l) {
				a = l;
			}
			if(b > l) {
				b = l;
			}
			//如果为负值，则与长度值相加
			if(a < 0) {
				a = l + a;
			}
			if(b < 0) {
				b = l + b;
			}
			if(o.createTextRange) { //IE浏览器
				var range = o.createTextRange();
				range.moveStart("character", -l);
				range.moveEnd("character", -l);
				range.moveStart("character", a);
				range.moveEnd("character", b);
				range.select();
			} else {
				o.setSelectionRange(a, b);
				o.focus();
			}
		}

	}

	window.MathTools = {};
	window.MathTools.C = function(n) {
		return n > 1 ? n * window.MathTools.C(n - 1) : 1;
	}

	window.MathTools.round = function(num) {
		var Num = "";
		for(var i = 0; i < num; i++) {
			Num += Math.floor(Math.random() * 10);
		}

		return Num;
	}
	window.moneyTools = {};
	window.moneyTools.animation = function(obj, num) {
		if(window.timeTools.isFengpan)
			return;
		var domStr = '';
		domStr += '<div class="ani_money_container ani_add_money">+' + num + '</div>';
		obj.parent().prepend(domStr);
	}

	window.moneyTools.animation1 = function(obj, num) {
		if(window.timeTools.isFengpan)
			return;
		var domStr = '';
		domStr += '<div class="ani_money_container1 ani_add_money">' + num + '</div>';
		obj.parent().prepend(domStr);
	}

	window.moneyTools.animation3 = function(obj, num) {
		if(window.timeTools.isFengpan)
			return;
		var domStr = '';
		domStr += '<div class="ani_money_container2 ani_add_money" style="height:10%;">' + num + '</div>';
		obj.parent().prepend(domStr);
	}

	window.moneyTools.animation2 = function(obj) {
		var domStr = '';
		domStr += '<div class="ani_click_container ani_click"></div>';
		obj.prepend(domStr);
	}

	//	$("body").on("click",".ani_click_container",function(e){
	//		e.stopPropagation();
	//	});

	$("body").on("animationend", ".ani_click", function() {
		$(this).remove();
	});

	$("body").on("webkitAnimationEnd", ".ani_click", function() {
		$(this).remove();
	});

	$("body").on("animationend", ".ani_add_money", function() {
		$(this).remove();
	});

	$("body").on("webkitAnimationEnd", ".ani_add_money", function() {
		$(this).remove();
	});

	window.urlTools = {};
	window.urlTools.getParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = window.location.search.substr(1).match(reg); //匹配目标参数
		if(r != null) return unescape(r[2]);
		return null; //返回参数值
	}

	window.phone = {};
	window.phone.addMoney = function(obj, num) {
		if(!num) {
			window.windowTools.alert("温馨提示", "请先选取筹码或填写金额！</br>(常用筹码可在个人中心更改设置)");
			return;
		}

		num = parseFloat(num);

		var moneyCon = obj.find(".addMoney_contain");
		if(moneyCon.length == 0) {
			var domStr = '';
			domStr += '<div class="addMoney_contain">';
			domStr += '<div class="addMoney_money">';
			domStr += num;
			domStr += '</div>';
			domStr += '<div class="addMoney_delete"></div>'
			domStr += '</div>';

			obj.prepend(domStr);
		} else {
			moneyCon.find(".addMoney_money").html(parseFloat(moneyCon.find(".addMoney_money").html()) + num);
		}

		if(!obj.hasClass("selected"))
			obj.addClass("selected");

	}

	$("body").on("tap", ".addMoney_delete", function(e) {
		if($(this).parent().parent().hasClass("lianma_odds")) {
			$(".lianma_odds").removeClass("selected");
			$(".lianma_odds .addMoney_contain").remove();
		} else if($(this).parent().parent().hasClass("lianma_zxbz_odds")) {
			$(".lianma_zxbz_odds").removeClass("selected");
			$(".lianma_zxbz_odds .addMoney_contain").remove();
		} else if($(this).parent().parent().hasClass("lianma_lx_odds")) {
			$(".lianma_lx_odds").removeClass("selected");
			$(".lianma_lx_odds .addMoney_contain").remove();
		} else if($(this).parent().parent().hasClass("lianma_lw_odds")) {
			$(".lianma_lw_odds").removeClass("selected");
			$(".lianma_lw_odds .addMoney_contain").remove();
		} else if($(this).parent().parent().hasClass("lianma_hx_odds")) {
			$(".lianma_hx_odds").removeClass("selected");
			$(".lianma_hx_odds .addMoney_contain").remove();
		} else if($(this).parent().parent().hasClass("lianma_lm_odds")) {
			$(".lianma_lm_odds").removeClass("selected");
			$(".lianma_lm_odds .addMoney_contain").remove();
		} else {
			$(this).parent().parent().removeClass("selected");
			$(this).parent().remove();
		}

		var selMenu = $(".content_center_left_item.selected");
		var type = selMenu.attr("type");

		var selItems = $("#" + type).find(".content_center_right_item_row_cell.selected");
		if(selItems.length > 0)
			selMenu.find(".content_center_left_item_sel").addClass("selected");
		else
			selMenu.find(".content_center_left_item_sel").removeClass("selected");

		var num = $(".content_center_right_item_row_cell.selected:not(.lianma_obj)").length;

		if($(".lianma_odds").eq(0).hasClass("selected"))
			num++;
		$("#order_num").html(num);
		e.stopPropagation();
	});

	window.xiazhu_lock = false;
	window.phone.showSureForm = function(array) {
		if(window.xiazhu_lock) {
			windowTools.alert("错误提示", "下注间隔时间不能太短！");
			return;
		}
		if(window.timeTools.isFengpan) {
			windowTools.alert("错误提示", "封盘期内不可下注！");
			return;
		}

		var dom = '';
		dom += '<div class="sure_form">';
		dom += '<div class="sure_form_content">'
		dom += '<div class="sure_form_title">';
		var totalM = 0;
		var loNum = 0;

		var isLianMa;
		var isLxLw;
		var isNormal;
		var ishk6lm;

		for(var i = 0; i < array.length; i++) {
			var item = array[i];
			if(item.type == "连码") {
				var n = MathTools.C(item.bet.split(",").length) / (MathTools.C(parseInt(item.reflect)) * MathTools.C((item.bet.split(",").length - parseInt(item.reflect))));
				totalM += parseFloat(item.money) * n;
				loNum += n;
				isLianMa = true;
			} else if(item.type == "连肖连尾") {
				var n = MathTools.C(item.bet.split(",").length) / (MathTools.C(parseInt(item.reflect)) * MathTools.C((item.bet.split(",").length - parseInt(item.reflect))));
				totalM += parseFloat(item.money) * n;
				loNum += n;
				isLxLw = true;
			} else if(item.type == "六合彩连码") {
				var n = MathTools.C(item.bet.split(",").length) / (MathTools.C(parseInt(item.reflect)) * MathTools.C((item.bet.split(",").length - parseInt(item.reflect))));
				totalM += parseFloat(item.money) * n;
				loNum += n;
				ishk6lm = true;
			} else {
				totalM += parseFloat(item.money);
				loNum++;
				isNormal = true;
			}
		}
		dom += '下注清单' + '(' + loNum + '注,共' + totalM + '元)';
		dom += '</div>';
		dom += '<div class="sure_form_main">';

		for(var i = 0; i < array.length; i++) {
			var item = array[i];

			dom += '<div class="sure_form_main_item" sequence="' + item.sequence + '" bet="' + item.bet + '" odds="' + item.odds + '" oddsId="' + item.oddsId + '" expect="' + item.expect + '" lottery="' + item.lottery + '" type="' + item.type + '" reflect="' + item.reflect + '">';

			dom += item.sequence + ' 【' + item.bet + '】@' + '<span style="color:red;">' + item.odds + '</span>' + '</br>X';
			dom += '<input type="text" id="" value="' + item.money + '" />';
			dom += '<img src="img/delete.svg" style="width:2rem;-webkit-transform:translate3d(2rem,.3rem,0)" onclick="deleteSureItem(this)"/>';
			dom += '</div>'
		}

		dom += '</div>'

		dom += '<div class="sure_form_btn_group">';

		dom += '<div class="sure_form_btn_group_item sure_no" onclick="cus_showSureForm_click()">';
		dom += '取消';
		dom += '</div>';

		dom += '<div class="sure_form_btn_group_item sure_yes" onclick="phone.sureYes()">';
		dom += '确定';
		dom += '</div>';

		dom += '</div>'

		dom += '</div>';
		dom += '</div>';
		dom += '<div class="cus_mask_1" onclick="cus_showSureForm_click()">';
		dom += '</div>';
		$("body").prepend(dom);

		window.phone.sureYes = function() {
			var newArray_normal = [];
			var newArray_lianma = [];
			var newArray_lxlw = [];
			var newArray_hk6lm = [];

			var newArrayDom = $(".sure_form_main_item");
			for(var i = 0; i < newArrayDom.length; i++) {
				var domItem = newArrayDom.eq(i);
				if(domItem.attr("type") == "连肖连尾") {
					var obj = {};

					obj.sequence = domItem.attr("sequence");
					obj.bet = domItem.attr("bet");
					obj.odds = domItem.attr("odds");
					obj.oddsId = domItem.attr("oddsId");
					obj.expect = domItem.attr("expect");
					obj.lottery = domItem.attr("lottery");
					obj.type = domItem.attr("type");
					obj.reflect = domItem.attr("reflect");
					obj.money = domItem.find("input").val();

					newArray_lxlw.push(obj);
				} else if(domItem.attr("type") == "连码") {
					var obj = {};
					obj.sequence = domItem.attr("sequence");
					obj.bet = domItem.attr("bet");
					obj.odds = domItem.attr("odds");
					obj.oddsId = domItem.attr("oddsId");
					obj.expect = domItem.attr("expect");
					obj.lottery = domItem.attr("lottery");
					obj.type = domItem.attr("type");
					obj.reflect = domItem.attr("reflect");
					obj.money = domItem.find("input").val();

					newArray_lianma.push(obj);
				} else if(domItem.attr("type") == "六合彩连码") {

					var obj = {};
					obj.sequence = domItem.attr("sequence");
					obj.bet = domItem.attr("bet");
					obj.odds = domItem.attr("odds");
					obj.oddsId = domItem.attr("oddsId");
					obj.expect = domItem.attr("expect");
					obj.lottery = domItem.attr("lottery");
					obj.type = "连码";
					obj.reflect = domItem.attr("reflect");
					obj.money = domItem.find("input").val();

					newArray_hk6lm.push(obj);
				} else {
					var obj = {};
					obj.sequence = domItem.attr("sequence");
					obj.bet = domItem.attr("bet");
					obj.odds = domItem.attr("odds");
					obj.oddsId = domItem.attr("oddsId");
					obj.expect = domItem.attr("expect");
					obj.lottery = domItem.attr("lottery");
					obj.type = domItem.attr("type");
					obj.reflect = domItem.attr("reflect");
					obj.money = domItem.find("input").val();

					newArray_normal.push(obj);
				}

			}
			if(isLianMa) {
				window.phonePay_all("lianma", newArray_lianma);
			}

			if(isLxLw) {
				window.phonePay_all("lxlw", newArray_lxlw);
			}

			if(isNormal) {
				window.phonePay_all("", newArray_normal);
			}

			if(ishk6lm) {
				window.phonePay_all("hk6lm", newArray_hk6lm);
			}
		}

		setTimeout(function() {
			$(".sure_form").addClass("show_sure");
		}, 100);
	}

	window.phonePay_all = function(type, array) {
		AjaxUtils.request({
			type: "post",
			url: AjaxUtils.domain + (type == "lianma" ? "web/linkCodeOrder" : (type == "lxlw" ? "web/lxlwOrder" : (type == "hk6lm" ? "web/hk6linkCodeOrder" : "web/order"))),
			async: true,
			dataType: "json",
			data: {
				"array": JSON.stringify(array),
				"token": sessionStorage.getItem("token")
			},
			beforeSend: function() {
				window.xiazhu_lock = true;
				window.loading.mask_show();
				setTimeout(function() {
					if(window.xiazhu_lock) {
						window.loading.show();
					}
				}, 1000);
			},
			success: function(data) {
				windowTools.cus_toast("下单成功！");
				$(".content_center_right_item_row_cell").removeClass("selected");
				$(".lianma_odds").removeClass("selected");
				$(".addMoney_contain").remove();
				$("#order_num").html("0");
				$(".content_center_left_item .content_center_left_item_sel").removeClass("selected");
				window.getUserInfo();
			},
			complete: function() {
				window.xiazhu_lock = false;
				window.loading.mask_close();
				window.loading.close();
				cus_showSureForm_click();
			}
		});
	}

	window.cus_showSureForm_click = function() {
		$(".sure_form").remove();
		$(".cus_mask_1").remove();
	}

	window.phone.showWindow = {};
	window.phone.showWindow.show = function(url, success) {
		var mainClass = 'main2';
		if($(".main2").length > 0)
			mainClass = "main3";

		if($(".main3").length > 0)
			mainClass = "main4";

		if($(".main4").length > 0)
			mainClass = "main5";

		var dom = '';
		dom += '<div class="' + mainClass + '">';
		dom += '</div>';
		$("body").prepend(dom);
		$.ajax({
			type: "get",
			url: url,
			async: true,
			dataType: "html",
			data: {},
			success: function(data) {
				$("." + mainClass).html(data).addClass("show_main");
				if(success)
					success(mainClass);
			}
		});
	}

	window.phone.showWindow.close = function() {
		var mainClass = '';
		if($(".main2").length > 0)
			mainClass = "main2";

		if($(".main3").length > 0)
			mainClass = "main3";

		if($(".main4").length > 0)
			mainClass = "main4";

		if($(".main5").length > 0)
			mainClass = "main5";

		$("." + mainClass).removeClass("show_main");
		setTimeout(function() {
			$("." + mainClass).remove();
		}, 500);
	}

	window.phone.showWindow.all_close = function() {

		$(".main2").removeClass("show_main");
		$(".main3").removeClass("show_main");
		$(".main4").removeClass("show_main");
		setTimeout(function() {
			$(".main2").remove();
			$(".main3").remove();
			$(".main4").remove();
		}, 500);
	}
	window.phone.showRule = {};
	window.phone.showRule.show = function(url, type) {
		$(".header_hearder_right_menu_list").fadeOut();
		$(".phone_mask").remove();

		$.ajax({
			type: "get",
			url: url,
			async: true,
			dataType: "html",
			data: {},
			success: function(data) {
				var dom = '';
				dom += '<div class="rule_form">';
				dom += '<div class="rule_form_content">'
				dom += '<div class="rule_form_title">';
				dom += type + '游戏规则';
				dom += '</div>';
				dom += '<div class="rule_form_main">';

				dom += data;

				dom += '</div>'

				dom += '<div class="rule_form_btn_group" onclick="cus_showRuleForm_click()">';
				dom += '我知道了';
				dom += '</div>'

				dom += '</div>';
				dom += '</div>';
				dom += '<div class="cus_mask_2" onclick="cus_showRuleForm_click()">';
				dom += '</div>';
				$("body").prepend(dom);

				setTimeout(function() {
					$(".rule_form").addClass("show_rule");
				}, 100);
			}
		});
	}

	window.cus_showRuleForm_click = function() {
		$(".cus_mask_2").remove();
		$(".rule_form").remove();
	}

	window.deleteSureItem = function(obj) {
		var p = $(obj).parent();
		p.slideUp("500ms");
		setTimeout(function() {
			p.remove();
			if($(".sure_form_main_item").length == 0) {
				cus_showSureForm_click();
			}
		}, 500);

	}

	$("body").on("tap", ".sys_common_header>.back,.private_content_header>.back", function() {
		window.phone.showWindow.close();
	});
	window.StringTools = {};
	window.StringTools.toFormatMoney = function(num) {
		return('<span style="color:' + (num < 0 ? "red" : "blue") + ';">' + num.toFixed(2) + '</span>');
	}

	window.phone.chouma = {};
	window.phone.chouma.show = function() {
		var domStr = '';
		domStr += '<div class="chouma_mask" onclick="phone.chouma.close()"></div>';
		domStr += '<div class="chouma_content">';
		domStr += '<div class="chouma_content_main">';
		domStr += '</div>';
		domStr += '</div>';

		$("body").prepend(domStr);
		setTimeout(function() {
			$(".chouma_mask").addClass("show");
		}, 100);

		window.phone.chouma.init();
	}

	window.phone.chouma.close = function() {
		$(".chouma_mask").removeClass("show");
		setTimeout(function() {
			$(".chouma_mask").remove();
			$(".chouma_content").remove();
		}, 300);
	}

	window.phone.chouma.more = function() {
		var all_chouma = ["5", "10", "50", "100", "500", "1000", "5000", "10000"];
		var nowChoumaDom = $(".chouma_item");
		for(var i = 0; i < nowChoumaDom.length; i++) {
			var item = nowChoumaDom.eq(i);
			for(var j = 0; j < all_chouma.length; j++) {
				if(item.attr("num") == all_chouma[j]) {
					item.removeClass("cm_hide")
						.removeClass("cm_1")
						.removeClass("cm_2")
						.removeClass("cm_3")
						.removeClass("cm_4")
						.removeClass("cm_5")
						.removeClass("cm_6")
						.removeClass("cm_7")
						.removeClass("cm_8")
						.addClass("cm_" + (j + 1));
				}
			}

			if(i == nowChoumaDom.length - 1) {
				item.remove();
			}

		}

	}

	window.phone.chouma.startInit = function() {
		var money = sessionStorage.getItem("amount");
		if(money) {
			var domStr = '';
			domStr += '<div class="footer_left_chouma_content icon_cm_' + money + '" onclick="clickChouma()">';
			domStr += money == "10000" ? "一萬" : money;
			domStr += '</div>';
			$(".footer_left_chouma").html(domStr);
			$("#amount").val(money);
			return;
		}

		AjaxUtils.request({
			type: "post",
			url: AjaxUtils.domain + "web/getChip",
			async: true,
			dataType: "json",
			data: {
				"token": sessionStorage.getItem("token")
			},
			success: function(data) {

				var all_chouma = ["5", "10", "50", "100", "500", "1000", "5000", "10000"];
				var domStr = '';
				if(data) {
					var chipContent = data.chipContent;
					var chipContentArr = chipContent.split(",");
					domStr += '<div class="footer_left_chouma_content icon_cm_' + chipContentArr[0] + '" onclick="clickChouma()">';
					domStr += chipContentArr[0] == "10000" ? "一萬" : chipContentArr[0];
					domStr += '</div>';
					//					$("#amount").val(chipContentArr[0]);
				} else {
					domStr += '<div class="footer_left_chouma_content icon_cm_5" onclick="clickChouma()">';
					domStr += '5';
					domStr += '</div>';

					//					$("#amount").val(5);
				}
				$(".footer_left_chouma").html(domStr);
			}
		});
	}

	window.phone.chouma.init = function() {
		//		AjaxUtils.request({
		//			type: "post",
		//			url: AjaxUtils.domain + "web/getChip",
		//			async: true,
		//			dataType: "json",
		//			data: {
		//				"token": sessionStorage.getItem("token")
		//			},
		//			success: function(data) {
		//				var all_chouma = ["5", "10", "50", "100", "500", "1000", "5000", "10000"];
		//				if(data) {
		//					var chipContent = data.chipContent;
		//					var chipContentArr = chipContent.split(",");
		//					var domStr = "";
		//					for(var i = 0; i < chipContentArr.length; i++) {
		//						domStr += '<div class="chouma_item icon_cm_' + chipContentArr[i] + ' cm_' + (i + 1) + '" num="' + chipContentArr[i] + '">';
		//						domStr += chipContentArr[i] == "10000" ? "一萬" : chipContentArr[i];
		//						domStr += '</div>';
		//
		//						for(var j = 0; j < all_chouma.length; j++) {
		//							if(all_chouma[j] == chipContentArr[i]) {
		//								all_chouma.splice(j, 1);
		//							}
		//						}
		//
		//					}
		//
		//					for(var i = 0; i < all_chouma.length; i++) {
		//						domStr += '<div class="chouma_item icon_cm_' + all_chouma[i] + ' cm_hide" num="' + all_chouma[i] + '">';
		//						domStr += all_chouma[i] == "10000" ? "一萬" : all_chouma[i];
		//						domStr += '</div>';
		//
		//					}
		//
		//					domStr += '<div class="chouma_item icon_cm_more cm_' + (chipContentArr.length + 1) + '" onclick="phone.chouma.more()">';
		//					domStr += '更多';
		//					domStr += '</div>';
		//
		//					$(".chouma_content_main").html(domStr).width(((chipContentArr.length + 1) * 6) + "rem");
		//				} else {
		var domStr = "";
		domStr += '<div class="chouma_item icon_cm_5 cm_1" num="5">';
		domStr += 5;
		domStr += '</div>';

		domStr += '<div class="chouma_item icon_cm_10 cm_2" num="10">';
		domStr += 10;
		domStr += '</div>';

		domStr += '<div class="chouma_item icon_cm_50 cm_3" num="50">';
		domStr += 50;
		domStr += '</div>';

		domStr += '<div class="chouma_item icon_cm_100 cm_4" num="100">';
		domStr += 100;
		domStr += '</div>';

		var default_chouma = ["500", "1000", "5000", "10000"];
		for(var i = 0; i < default_chouma.length; i++) {
			domStr += '<div class="chouma_item icon_cm_' + default_chouma[i] + ' cm_hide" num="' + default_chouma[i] + '">';
			domStr += default_chouma[i] == "10000" ? "一萬" : default_chouma[i];
			domStr += '</div>';

		}

		domStr += '<div class="chouma_item icon_cm_more cm_5" onclick="phone.chouma.more()">';
		domStr += '更多';
		domStr += '</div>';

		$(".chouma_content_main").html(domStr).width("30rem");
		//				}
		//			}
		//		});
	}

	//	window.isPassive = function() {
	//		var supportsPassiveOption = false;
	//		try {
	//			addEventListener("test", null, Object.defineProperty({}, 'passive', {
	//				get: function() {
	//					supportsPassiveOption = true;
	//				}
	//			}));
	//		} catch(e) {}
	//		return supportsPassiveOption;
	//	}

	window.getFormat = function() {
		var format = "";
		var nTime = new Date();
		format += nTime.getFullYear() + "-";
		format += (nTime.getMonth() + 1) < 10 ? "0" + (nTime.getMonth() + 1) : (nTime.getMonth() + 1);
		format += "-";
		format += nTime.getDate() < 10 ? "0" + (nTime.getDate()) : (nTime.getDate());
		format += "T";
		format += nTime.getHours() < 10 ? "0" + (nTime.getHours()) : (nTime.getHours());
		format += ":";
		format += nTime.getMinutes() < 10 ? "0" + (nTime.getMinutes()) : (nTime.getMinutes());
		format += ":00";
		return format;
	}

	window.windowTools.showDebug = function() {
		$.ajax({
			type: "get",
			url: "sys/debug.html",
			async: true,
			dataType: "html",
			data: {},
			success: function(data) {
				$("#index_common").html(data);
			}
		});
	}

	window.phone.kefuClose = function() {
		$(".kefu_container_mask").remove();
		$(".kefu_container").remove();
	}

	window.openNew = function(url) {
		window.open(url);
	}

	window.phone.kefuShow = function() {
		AjaxUtils.request({
			type: "post",
			url: AjaxUtils.domain + "web/getServiceAddress",
			async: true,
			dataType: "json",
			data: {
				"token": sessionStorage.getItem("token")
			},
			success: function(data) {

				var domStr = '';
				domStr += '<div class="kefu_container_mask" onclick="phone.kefuClose()"></div>';
				domStr += '<div class="kefu_container">';

				domStr += '<div class="kefu_container_zxkf" onclick="window.openNew(\'' + data.service + '\')">在线客服</div>';
				domStr += '<div class="kefu_container_qq" onclick="window.openNew(\'' + data.qq + '\')">QQ客服</div>';
				domStr += '</div>';
				$("body").prepend(domStr);
				setTimeout(function() {
					$(".kefu_container").addClass("show");
				}, 100);
			}
		});
	}

	window.phone.coinClose = function() {
		$(".coin_container_mask").remove();
		$(".coin_container").remove();
	}

	window.phone.coinShow = function() {
		var domStr = '';
		domStr += '<div class="coin_container_mask" onclick="phone.coinClose()"></div>';
		domStr += '<div class="coin_container">';
		domStr += '<div class="coin_container_item coin_1 icon_cm_5" amount="5">5</div>';
		domStr += '<div class="coin_container_item coin_2 icon_cm_10" amount="10">10</div>';
		domStr += '<div class="coin_container_item coin_3 icon_cm_50" amount="50">50</div>';
		domStr += '<div class="coin_container_item coin_4 icon_cm_100" amount="100">100</div>';
		domStr += '<div class="coin_container_item coin_5 icon_cm_500" amount="500">500</div>';
		domStr += '<div class="coin_container_item coin_6 icon_cm_1000" amount="1000">1000</div>';
		domStr += '<div class="coin_container_item coin_7 icon_cm_5000" amount="5000">5000</div>';
		domStr += '<div class="coin_container_item coin_8 icon_cm_10000" amount="10000">一萬</div>';
		domStr += '<div class="coin_container_item coin_9 icon_cm_more">完成</div>';

		domStr += '</div>';
		$("body").prepend(domStr);

		var domStra = '';
		domStra += '<div class="cm_phone_sel_mask"></div>';
		domStra += '<div class="cm_phone_sel"></div>';
		AjaxUtils.request({
			type: "post",
			url: AjaxUtils.domain + "web/getChip",
			async: true,
			dataType: "json",
			data: {
				"token": sessionStorage.getItem("token")
			},
			success: function(data) {
				if(data) {
					var chipContent = data.chipContent;
					var chipContentArr = chipContent.split(",");
					for(var i = 0; i < chipContentArr.length; i++) {

						$(".coin_container_item.icon_cm_" + chipContentArr[i]).addClass("selected").prepend(domStra);
					}
				}
			}
		});

		setTimeout(function() {
			$(".coin_container").addClass("show");
		}, 100);
	}

	$("body").on("tap", ".coin_container_item", function() {
		if(!$(this).hasClass("icon_cm_more")) {
			if($(this).hasClass("selected")) {
				$(this).find(".cm_phone_sel_mask").remove();
				$(this).find(".cm_phone_sel").remove();
				$(this).removeClass("selected");
			} else {
				if($(".coin_container_item.selected").length >= 4) {
					return;
				}

				var domStr = '';
				domStr += '<div class="cm_phone_sel_mask"></div>';
				domStr += '<div class="cm_phone_sel"></div>';
				$(this).addClass("selected").prepend(domStr);
			}
		} else {
			var selcms = $(".coin_container_item.selected");
			var str = '';
			for(var i = 0; i < selcms.length; i++) {
				if(i == 0) {
					str += selcms.eq(i).attr("amount");
				} else {
					str += ',' + selcms.eq(i).attr("amount");
				}
			}
			AjaxUtils.request({
				type: "post",
				url: AjaxUtils.domain + "web/saveChip",
				async: true,
				dataType: "json",
				data: {
					"token": sessionStorage.getItem("token"),
					"chipContent": str
				},
				success: function(data) {
					phone.coinClose();
					phone.chouma.startInit();
					windowTools.cus_toast("设置常用筹码成功！");
				}
			});

		}

	});

	window.tips = {};
	window.tips.uninit = function() {
		window.windowTools.alert("温馨提示", "暂时未开放此功能，敬请期待！");
	}

})(jQuery);
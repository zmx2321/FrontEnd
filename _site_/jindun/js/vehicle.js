//复选框
var checkboxSelect = function(){
	var fanxiBox = $(".sub_service input:checkbox");
	
    fanxiBox.click(function () {
       if(this.checked || this.checked=='checked'){
           fanxiBox.removeAttr("checked");
           $(this).prop("checked", true);
         }
    });
}

//表单验证
var checkForm = function(){
	var usernameReg = /^[\u4E00-\u9FA5A-Za-z]+$/g,	//只能输入中文和英文
		telphoneReg = /^1[358][0-9]{9}$/g,	//11位有效手机号码
		carNumReg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/g,	//车牌号
		vehicleNumReg = /^[A-Za-z0-9]{3,}$/g;	//3位以上英文或数字

	function checkLogin(id, reg){
		function txt(txt){
			var txt = $(id).parent().parent().find('dd:first').text();
    		var txt = txt.substring(0, txt.length-1);

    		return txt;
		}

		id.blur(function(){
	        if(!reg.test($(this).val())){
	        	if($(this).val()==''){
	        		$(this).attr('placeholder', txt() + "不能为空");
	        	}
	        	$(this).css('color', '#f00');
	        	// console.log(txt() + "输入错误，请重新输入");
			} else {
				$(this).css('color', '#333');
			}
	    });

	    id.focus(function(){
			$(this).val("");
			$(this).attr('placeholder', "请输入" + txt());
			$(this).css('color', '#333');
		});
	}

	//车主姓名
	checkLogin($('#username'), usernameReg);

	//手机号码
	checkLogin($('#telphone'), telphoneReg);

	//车牌号码
	checkLogin($('#car_num'), carNumReg);

	//车架号后三位
	checkLogin($('#vehicle_num'), vehicleNumReg);

	subform();  //提交表单
}

//倒计时
var i = 60;
var timer = null;
function countDown() {
    if (i >= 1) {
    	$('#verificationCode').html(i + "秒" + "后重发");
        i--;
    }

    if(i < 1){
    	$('#verificationCode').html("获取验证码");
    	clearInterval(timer);
    }
}

//弹出框
var oppup = function(){
	//确定
	$('button.confirm').click(function(){
		$('.oppup1').fadeOut();
		$('.mask').fadeOut();
	});

	//更改
	$('button.update').click(function(){
		$('.oppup1').fadeOut();
		$('.oppup2').fadeIn();
	});

	//验证码
	$('#verificationCode').one("click", function(){
		timer = setInterval("countDown()", 1000);
	});

	//关闭弹出框
	$('.oppup_tille b').click(function(){
		$('.oppup1').fadeOut();
		$('.oppup2').fadeOut();
		$('.mask').fadeOut();
	});
}

//提交表单
var subform = function(){
	$('#vehicle_btn').click(function(){
		$.ajax({
	        type: "POST",
	        dataType: "json",
	        url: "json/aa.json",
	        data: $('#vehicle_form').serialize(),  //将该表单序列化
	        success: function(data){
	            console.log("data");
	            if (result.resultCode == 200) {
                    alert("success");
                }
	        },
	        error:function(request){
	            alert("异常！");
	        }
	    });
	});
}


$(function(){
	checkboxSelect();  //复选框
	checkForm();  //表单验证
	oppup();  //弹出框
});
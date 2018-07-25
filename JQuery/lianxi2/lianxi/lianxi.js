// 自测题
$(document).ready(function() {
	//input样式
	$('.pro ul').addClass("unstyled");	
	//end inout样式

	var	u_ans = ""; //用户选择的答案
	var	r_ans = ""; //正确答案
	var num_right = 0; //用户答对题的个数
	var	num_pro, //选择题个数
		num_ask, //问答题个数
		checks,  //用户选择项
		prom;    //用户选择对错提示
		
	//提交
	function checkAn(){
		num_pro = $("div.pro").length; 
		num_ask = $("div.ask").length; 

		//选择题（包括单选和多选）
		for(i=1;i<=num_pro;i++){
			checks = $("#pro"+i).find("input:checked");
			if(checks.length>1){
				for(m=0; m<checks.length; m++){
					u_ans += checks.get(m).getAttribute("cls");
				}
			}else{
				u_ans = checks.attr("cls");
			}
			//alert(u_ans);
			r_ans = $("#pro"+i).find(".text-warning");
			prom = $("#pro"+i).find(".res-img")
			if(u_ans == r_ans.text()){
				prom.html("<img src='lianxi/right.gif' width='17' height='16' align='absmiddle'/> 你选对了").addClass("text-success");
				num_right++;
			}else{
				prom.html("<img src='lianxi/wrong.gif' width='17' height='16' align='absmiddle'/> 你选错了").addClass("text-error");
				$("#pro"+i).find(".ans").removeClass("hidden");
			}
			$("#pro"+i).find(".prom").removeClass("hidden");
			u_ans = "";
		}//end for
		//end 选择题
		
		//问答题
		if(num_ask>0){
			for(j=1;j<=num_ask;j++){
				$("#ask"+j).find(".ask-ans").removeClass("hidden");
			}
		}
		//end 问答题
		
		$("#tishi").removeClass("hidden");
		$("#tishi").find(".num_pro").html(num_pro);
		$("#tishi").find(".num_right").html(num_right);
		
		$("input:not(:reset)").attr("disabled","disabled");
		$("hr").css("display","block");
		$("div.pro").css("margin-bottom","8px");
		$("input:button").val("已提交");
		
	}
	
	//重置
	function resetAll(){
		//window.location.reload();
		//选择题
		$(".res-img").html("").removeClass("text-success").removeClass("text-error");
		$("div.ans").addClass("hidden");
		$("div.pro").css("margin-bottom","0px");

		//问答题
		$("div.ask-ans").addClass("hidden");
		//$("textarea").removeAttr("disabled");
		
		//公共
		$("hr").css("display","none");
		$("#tishi").addClass("hidden");
		$("input").removeAttr("disabled");
		$("input:button").val("提交");
		
	}
	
	//提交和重置
	$("input:button").click(function(){
		checkAn();
	});
	$("input:reset").click(function(){
		resetAll();
	});
});
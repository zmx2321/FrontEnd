var check = function(){
    $("input[name='check']").click(function(){
        if($(this).prop("checked")){
            $(this).parent().find('b').addClass('active');
        } else {
            $(this).parent().find('b').removeClass('active');
        }
    });
}

$(function(){
    check();    //匿名评价
});


$(function(){
    // checkbox
    $("input[name='xz']").change(function(){
         if($(this).is(':checked')){
            alert("勾选");
         }else{
            alert("不勾选");
         }
    });
});

$(function(){
	//全选
	$('#CheckAll').click(function(){
		$('[name=items]:checkbox').attr('checked', true);
	});

	//全不选
	$('#CheckNo').click(function(){
		$('[name=items]:checkbox').attr('checked', false);
	});

	//反选
	$('#CheckRev').click(function(){
		$('[name=items]:checkbox').each(function(){
			$(this).attr("checked", !$(this).attr("checked"));
		});
	});

	//提交
	$('#send').click(function(){
		var str = "你选中的是:" + "\r\n";
		$('[name=items]:checkbox:checked').each(function(){
			str += $(this).val() + "\r\n";
		});

		alert(str);
	});

	$('#CheckAll0').click(function(){
		$('[name=items]:checkbox').attr('checked', this.checked);
	});

	$('[name=items]:checkbox').click(function(){
		var flag = true;
		$('[name=items]:checkbox').each(function(){
			if(!this.checked){
				flag = false;
			}
		});

		$('#CheckAll0').attr('checked', flag);
	});
});











// $(this).parent().parent().find('b').addClass('active').parent().parent().parent().parent().siblings().find('b').removeClass('active');
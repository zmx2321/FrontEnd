/**
 * @fileoverview 
 * author zmx2321@163.com
 * data 2018/6/8
 */

//indexUtil
var indexUtil = {
	//显示地址模态框
	showAddress: function(){
		util.show();  //显示模态框
        $('#addressModal').fadeIn();  //显示地址
	},

	//隐藏地址模态框
	hideAddress: function(){
		util.hide();  //显示模态框
        $('#addressModal').fadeOut();  //隐藏地址
	},
	
    //获取地址
    getAddress: function(wrap){
        wrap.each(function() {
            var url = "json/area.json";
            var areaJson;
            var temp_html;
            var oProvince = $(this).find(".province");
            var oCity = $(this).find(".city");
            var oDistrict = $(this).find(".district");
            //初始化省
            var province = function() {
                $.each(areaJson, function(i, province) {
                    temp_html += "<option value='" + province.p + "'>" + province.p + "</option>";
                });
                oProvince.html(temp_html);
                city();
            };
            //赋值市
            var city = function() {
                temp_html = "";
                var n = oProvince.get(0).selectedIndex;
                $.each(areaJson[n].c, function(i, city) {
                    temp_html += "<option value='" + city.ct + "'>" + city.ct + "</option>";
                });
                oCity.html(temp_html);
                district();
            };
            //赋值县
            var district = function() {
                temp_html = "";
                var m = oProvince.get(0).selectedIndex;
                var n = oCity.get(0).selectedIndex;
                if (typeof (areaJson[m].c[n].d) == "undefined") {
                    oDistrict.css("display", "none");
                } else {
                    oDistrict.css("display", "inline");
                    $.each(areaJson[m].c[n].d, function(i, district) {
                        temp_html += "<option value='" + district.dt + "'>" + district.dt + "</option>";
                    });
                    oDistrict.html(temp_html);
                };
            };
            //选择省改变市
            oProvince.change(function() {
                city();
            });
            //选择市改变县
            oCity.change(function() {
                district();
                
            });
            //获取json数据
            $.getJSON(url, function(data) {
                areaJson = data;
                province();
            });
        });
    }
}

//获取地址
var sel_address = function(){
	$('.local_btn').click(function(){
		indexUtil.showAddress();
	});
    
    $('.home_btn').click(function(){
		indexUtil.showAddress();
	});

    indexUtil.getAddress($(".adc_s"));  //获取地址

    //隐藏
    $('.adrsmod_btn').click(function(){
        indexUtil.hideAddress();
    });

    $('#Modal').click(function(){
        indexUtil.hideAddress();
    });
}

//关闭
var closeActlit = function(){
    $('.activity_show').each(function(){
        $(this).find('.actlit_close').click(function(){
            $(this).parent().remove();
        });
    });
}

//load
$(function(){
	sel_address();  //获取地址
    closeActlit();  //关闭
});
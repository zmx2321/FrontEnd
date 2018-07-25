$(function() {
    $(".selectList").each(function() {
        var url = "area.json";
        var areaJson;
        var temp_html;
        var oProvince = $(this).find(".province");
        var oCity = $(this).find(".city");
        var oDistrict = $(this).find(".district");
        //初始化省
        var province = function() {
            $.each(areaJson, function(i, province) {
                temp_html += "<option value='" + province.p + "'>" + province.p + "</option>";
                console.log(temp_html);
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
            }
            ;
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
});
/**
 * @author zmx2321
 * @return
 */
function getProvinceBuy() {
    var province = eval(proStr);
    
    var newStr = new Array();
    for (var i = 0, psize = province.length; i < psize; i++) {
        province[i].NAME;
        var city = eval(province[i].ITEMS);
        newStr.push(`
            <li class="pro${i}" onclick="getCityBuy(${i})">
                <div class="main_wrap">
                    <dl>
                        <dd>${province[i].NAME}</dd>
                        <dd>${city.length}</dd>
                    </dl>
                </div>
            </li>
        `);
    }
    $('.buslit_li_address').find('.first').html(newStr);
}

function getCityBuy(val) {
    $('.pro' + val).addClass("active").siblings().removeClass("active");

    var province = eval(proStr);
    var city = eval(province[val].ITEMS);
    var newStr = new Array();

    for (var i = 0, csize = city.length; i < csize; i++) {
        var area = eval(city[i].ITEMS);

        newStr.push(
            "<li class='city" + i + " ' onclick='getAreaBuy(" + i + "," + val + ")'>" +
                "<div class='main_wrap'>" +
                    "<dl>" +
                        "<dd>" + city[i].NAME + "</dd>" +
                        "<dd>" + area.length + "</dd>" +
                    "</dl>" + 
                "</div>" +
            "</li>"
        );
    }
    $('.buslit_li_address').find('.second').html(newStr);
}

function getAreaBuy(val, val1) {
    $('.city' + val).addClass("active").siblings().removeClass("active");

    var province = eval(proStr);
    var city = eval(province[val1].ITEMS);
    var area = eval(city[val].ITEMS);
    var newStr = new Array();

    for (var i = 0, asize = area.length; i < asize; i++) {
        area[i].NAME;
        newStr.push(
            "<li class='area" + i + " ' onclick='getallArea(" + val1 + "," + val + "," + i + ")'>" +
                "<div class='main_wrap'>" +
                    "<dl>" +
                        "<dd>" + area[i].NAME + "</dd>" +
                    "</dl>" + 
                "</div>" +
            "</li>"
        );
    }
    $('.buslit_li_address').find('.third').html(newStr);

    if (asize == 0){
        var allarea = city[val].NAME;

        $(".address").text(allarea);

        $('.mask').fadeOut();
        $('.mask_cont').fadeOut();
    }
}

function getallArea(val, val1, val2) {
    $('.area' + val2).addClass("active").siblings().removeClass("active");

    var province = eval(proStr);
    var city = eval(province[val].ITEMS);
    var area = eval(city[val1].ITEMS);
    var allarea = area[val2].NAME;

    console.log(allarea);

    $(".address").text(allarea);

    $('.mask').fadeOut();
    $('.mask_cont').fadeOut();
}
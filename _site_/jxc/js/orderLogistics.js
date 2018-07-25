$(function(){
    //mock
    var thisApi = {
        //物流状态
        odlogts_state: {
            dev: "mock/odlogts_state.json",
            product: "",
        },
        //物流状态详细信息
        odlogts_body: {
            dev: "mock/odlogts_body.json",
            product: "",
        },
        //猜你喜欢
        favorite: {
            dev: "mock/favorite.json",
            product: "",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    // console.log(bMock.getFace(""));
});

var odrlitAjax = function() {
    //物流状态
    $.ajax({
        url: bMock.getFace("odlogts_state"),
        type:"get",
        dataType:"json",
        dataType:"json",
        success: function(data, status){
            var odlogts_state = data;
            var str = '';

            str += `
                <div class="odlogts_wrap">
                    <div class="odlogts_state_pic">
                        <img src="${odlogts_state.img}" />
                        <span>${odlogts_state.num}件商品</span>
                    </div>
                    <div class="odlogts_state_txt">
                        <ul>
                            <li>
                                <dl>
                                    <dd><h1>物流状态：</h1></dd>
                                    <dd><h1 class="green">${odlogts_state.orderstatu}</h1></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dd><h2>承运公司：</h2></dd>
                                    <dd><h2>${odlogts_state.company}</h2></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dd><h2>运单编号：</h2></dd>
                                    <dd><h2>${odlogts_state.waybillnumber}</h2></dd>
                                </dl>
                            </li>
                            <li>
                                <dl>
                                    <dd><h2>物流电话：</h2></dd>
                                    <dd><h2>${odlogts_state.phone}</h2></dd>
                                </dl>
                            </li>
                        </ul>
                    </div>
                </div>
            `;

            $('.odlogts_state').html(str);
        },
        error: function(){
            console.log("false");
        }
    });

    //物流状态详细信息
    $.ajax({
        url: bMock.getFace("odlogts_body"),
        type:"get",
        dataType:"json",
        dataType:"json",
        success: function(data, status){
            var odlogts_body = data.data;
            var str = '';
            console.log(odlogts_body);

            for (var i = 0; i < odlogts_body.length; i++) {
                str += `
                    <li class="${odlogts_body[i].clsN}">
                        <dl>
                            <dd>
                                ${odlogts_body[i].txt}
                            </dd>
                            <dd>
                                ${odlogts_body[i].time}
                            </dd>
                        </dl>
                    </li>
                `;
            }
            
            $('.odlogts_mcont').html(str);
        },
        error: function(){
            console.log("false");
        }
    });

    //猜你喜欢
    $.ajax({
        url: bMock.getFace("favorite"),
        type:"get",
        dataType:"json",
        dataType:"json",
        success: function(data, status){
            var favorite = data.data;
            var str = '';

            for (var i = 0; i < favorite.length; i++) {
                str += `
                    <li>
                        <a href="${favorite[i].url}">
                            <div class="prochar_cont_pic">
                                <img src="${favorite[i].imgs}">
                            </div>
                            <div class="prochar_cont_txt">
                                <ul>
                                    <li>
                                        <h1>${favorite[i].title}</h1>
                                    </li>
                                    <li>
                                        <dd>
                                            <h2>${favorite[i].imglab[0]}</h2>
                                        </dd>
                                        <dd>
                                            <h2>${favorite[i].imglab[1]}</h2>
                                        </dd>
                                    </li>
                                    <li class="prochar_pritxt">
                                        <dd>
                                            <h1 class="price">¥${favorite[i].price}</h1>
                                        </dd>
                                        <dd>
                                            <h1 class="lastprice">¥${favorite[i].lastPrice}</h1>
                                        </dd>
                                        <dd>
                                            <h4>${favorite[i].surplusDay}</h4>
                                        </dd>
                                        <dd>
                                            <button>${favorite[i].sale}</button>
                                        </dd>
                                    </li>
                                </ul>
                            </div>
                        </a>
                    </li>
                `;
            }

            $('.favorite').html(str);
        },
        error: function(){
            console.log("false");
        }
    });
}


$(function(){
    odrlitAjax();
});
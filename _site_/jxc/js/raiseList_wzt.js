$(function(){
    //mock
    var thisApi = {
        //最新主题
        raslit_wzt_zxzt: {
            dev: "mock/raslit_wzt_zxzt.json",
            product: "",
        },

        //田园课堂
        raslit_wzt_tykt: {
            dev: "mock/raslit_wzt_tykt.json",
            product: "",
        },

        //国学书画
        raslit_wzt_gxsh: {
            dev: "mock/raslit_wzt_gxsh.json",
            product: "",
        },

        //禅学瑜伽
        raslit_wzt_cxyj: {
            dev: "mock/raslit_wzt_cxyj.json",
            product: "",
        }
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    // console.log(bMock.getFace("raslit_wzt_zxzt"));
});




//最新主题
var raslit_wzt_zxzt = function(){
    $.ajax({
        url: bMock.getFace("raslit_wzt_zxzt"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            var zxzt_im = function(){
                var zxzt = data.data;
                var str = '';

                for(var i=0; i<zxzt.length; i++){
                    str += `
                        <li>
                            <a href="${zxzt[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${zxzt[i]["img"]}">
                                        <span class="tit_tab">${zxzt[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${zxzt[i]["title"]}</li>
                                            <li>${zxzt[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${zxzt[i]["content"]}</p>
                                        </div>
                                        <div class="poyctcnt_lab_bar">
                                            <div class="polabbar_result"></div>
                                        </div>
                                        <ul class="poyctcnt_lab">
                                            <li>目标59人</li>
                                            <li>已参加59人</li>
                                            <li>剩余0天</li>
                                        </ul>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    `;
                }
                $('.raslit_zxzt').html(str);
            }

            zxzt_im();

            $('.zxzt').click(function(){
                zxzt_im();
            });
        },
        error: function () {
            console.log("false");
        }
    });
}

//田园课堂
var raslit_wzt_tykt = function(){
    $.ajax({
        url: bMock.getFace("raslit_wzt_tykt"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            $('.tykt').click(function(){
                var tykt = data.data;
                var str = '';

                for(var i=0; i<tykt.length; i++){
                    str += `
                        <li>
                            <a href="${tykt[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${tykt[i]["img"]}">
                                        <span class="tit_tab">${tykt[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${tykt[i]["title"]}</li>
                                            <li>${tykt[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${tykt[i]["content"]}</p>
                                        </div>
                                        <div class="poyctcnt_lab_bar">
                                            <div class="polabbar_result"></div>
                                        </div>
                                        <ul class="poyctcnt_lab">
                                            <li>目标59人</li>
                                            <li>已参加59人</li>
                                            <li>剩余0天</li>
                                        </ul>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    `;
                }
                $('.raslit_tykt').html(str);
            });
        },
        error: function () {
            console.log("false");
        }
    });
}

//国学书画
var raslit_wzt_gxsh = function(){
    $.ajax({
        url: bMock.getFace("raslit_wzt_gxsh"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            $('.gxsh').click(function(){
                var gxsh = data.data;
                var str = '';

                for(var i=0; i<gxsh.length; i++){
                    str += `
                        <li>
                            <a href="${gxsh[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${gxsh[i]["img"]}">
                                        <span class="tit_tab">${gxsh[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${gxsh[i]["title"]}</li>
                                            <li>${gxsh[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${gxsh[i]["content"]}</p>
                                        </div>
                                        <div class="poyctcnt_lab_bar">
                                            <div class="polabbar_result"></div>
                                        </div>
                                        <ul class="poyctcnt_lab">
                                            <li>目标59人</li>
                                            <li>已参加59人</li>
                                            <li>剩余0天</li>
                                        </ul>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    `;
                }
                $('.raslit_gxsh').html(str);
            });
        },
        error: function () {
            console.log("false");
        }
    });
}

//禅学瑜伽
var raslit_wzt_cxyj = function(){
    $.ajax({
        url: bMock.getFace("raslit_wzt_cxyj"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            $('.cxyj').click(function(){
                var cxyj = data.data;
                var str = '';

                for(var i=0; i<cxyj.length; i++){
                    str += `
                        <li>
                            <a href="${cxyj[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${cxyj[i]["img"]}">
                                        <span class="tit_tab">${cxyj[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${cxyj[i]["title"]}</li>
                                            <li>${cxyj[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${cxyj[i]["content"]}</p>
                                        </div>
                                        <div class="poyctcnt_lab_bar">
                                            <div class="polabbar_result"></div>
                                        </div>
                                        <ul class="poyctcnt_lab">
                                            <li>目标59人</li>
                                            <li>已参加59人</li>
                                            <li>剩余0天</li>
                                        </ul>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    `;
                }
                $('.raslit_cxyj').html(str);
            });
        },
        error: function () {
            console.log("false");
        }
    });
}


//页面交互
var tip = function(){
    //选项卡1
    $('ul.raslit_btn li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('article.raslit_cot section').eq($(this).index()).show().siblings().hide();
    }); 
}


$(function(){
    tip();  //页面交互
    raslit_wzt_zxzt();    //最新主题
    raslit_wzt_tykt();    //田园课堂
    raslit_wzt_gxsh();    //国学书画
    raslit_wzt_cxyj();    //禅学瑜伽
});
$(function(){
    //mock
    var thisApi = {
        //最新主题
        raslit_zdz_zxzt: {
            dev: "mock/raslit_zdz_zxzt.json",
            product: "",
        },

        //私家茶园
        raslit_zdz_sjhy: {
            dev: "mock/raslit_zdz_sjhy.json",
            product: "",
        },

        //花木认种
        raslit_zdz_hmrz: {
            dev: "mock/raslit_zdz_hmrz.json",
            product: "",
        },

        //土畜认养
        raslit_zdz_txry: {
            dev: "mock/raslit_zdz_txry.json",
            product: "",
        }
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    // console.log(bMock.getFace("raslit_zdz_zxzt"));
});


//最新主题
var raslit_zdz_zxzt = function(){
    $.ajax({
        url: bMock.getFace("raslit_zdz_zxzt"),
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
                                            <li>目标￥20000</li>
                                            <li>已筹￥40000</li>
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

//私家茶园
var raslit_zdz_sjhy = function(){
    $.ajax({
        url: bMock.getFace("raslit_zdz_sjhy"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            $('.sjhy').click(function(){
                var sjhy = data.data;
                var str = '';

                for(var i=0; i<sjhy.length; i++){
                    str += `
                        <li>
                            <a href="${sjhy[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${sjhy[i]["img"]}">
                                        <span class="tit_tab">${sjhy[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${sjhy[i]["title"]}</li>
                                            <li>${sjhy[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${sjhy[i]["content"]}</p>
                                        </div>
                                        <div class="poyctcnt_lab_bar">
                                            <div class="polabbar_result"></div>
                                        </div>
                                        <ul class="poyctcnt_lab">
                                            <li>目标￥20000</li>
                                            <li>已筹￥40000</li>
                                            <li>剩余0天</li>
                                        </ul>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    `;
                }
                $('.raslit_sjhy').html(str);
            });
        },
        error: function () {
            console.log("false");
        }
    });
}

//花木认种
var raslit_zdz_hmrz = function(){
    $.ajax({
        url: bMock.getFace("raslit_zdz_hmrz"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            $('.hmrz').click(function(){
                var hmrz = data.data;
                var str = '';

                for(var i=0; i<hmrz.length; i++){
                    str += `
                        <li>
                            <a href="${hmrz[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${hmrz[i]["img"]}">
                                        <span class="tit_tab">${hmrz[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${hmrz[i]["title"]}</li>
                                            <li>${hmrz[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${hmrz[i]["content"]}</p>
                                        </div>
                                        <div class="poyctcnt_lab_bar">
                                            <div class="polabbar_result"></div>
                                        </div>
                                        <ul class="poyctcnt_lab">
                                            <li>目标￥20000</li>
                                            <li>已筹￥40000</li>
                                            <li>剩余0天</li>
                                        </ul>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    `;
                }
                $('.raslit_hmrz').html(str);
            });
        },
        error: function () {
            console.log("false");
        }
    });
}

//土畜认养
var raslit_zdz_txry = function(){
    $.ajax({
        url: bMock.getFace("raslit_zdz_txry"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            $('.txry').click(function(){
                var txry = data.data;
                var str = '';

                for(var i=0; i<txry.length; i++){
                    str += `
                        <li>
                            <a href="${txry[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${txry[i]["img"]}">
                                        <span class="tit_tab">${txry[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${txry[i]["title"]}</li>
                                            <li>${txry[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${txry[i]["content"]}</p>
                                        </div>
                                        <div class="poyctcnt_lab_bar">
                                            <div class="polabbar_result"></div>
                                        </div>
                                        <ul class="poyctcnt_lab">
                                            <li>目标￥20000</li>
                                            <li>已筹￥40000</li>
                                            <li>剩余0天</li>
                                        </ul>
                                    </dd>
                                </dl>
                            </a>
                        </li>
                    `;
                }
                $('.raslit_hmrz').html(str);
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
    raslit_zdz_zxzt();    //最新主题
    raslit_zdz_sjhy();    //私家茶园
    raslit_zdz_hmrz();    //花木认种
    raslit_zdz_txry();    //土畜认养
});
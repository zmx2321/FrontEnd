$(function(){
    //mock
    var thisApi = {
        //最新主题
        raslit_dcm_zxzt: {
            dev: "mock/raslit_dcm_zxzt.json",
            product: "",
        },

        //荣誉村民
        raslit_dcm_rycm: {
            dev: "mock/raslit_dcm_rycm.json",
            product: "",
        },

        //私家别苑
        raslit_dcm_sjby: {
            dev: "mock/raslit_dcm_sjby.json",
            product: "",
        },

        //共建村产
        raslit_dcm_gjcc: {
            dev: "mock/raslit_dcm_gjcc.json",
            product: "",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    // console.log(bMock.getFace("raslit_dcm_gjcc"));
});


//最新主题
var raslit_dcm_zxzt = function(){
    $.ajax({
        url: bMock.getFace("raslit_dcm_zxzt"),
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

//荣誉村民
var raslit_dcm_rycm = function(){
    $.ajax({
        url: bMock.getFace("raslit_dcm_rycm"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            $('.rycm').click(function(){
                var rycm = data.data;
                var str = '';

                for(var i=0; i<rycm.length; i++){
                    str += `
                        <li>
                            <a href="${rycm[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${rycm[i]["img"]}">
                                        <span class="tit_tab">${rycm[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${rycm[i]["title"]}</li>
                                            <li>${rycm[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${rycm[i]["content"]}</p>
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
                $('.raslit_rycm').html(str);
            });
        },
        error: function () {
            console.log("false");
        }
    });
}

//私家别苑
var raslit_dcm_sjby = function(){
    $.ajax({
        url: bMock.getFace("raslit_dcm_sjby"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            $('.sjby').click(function(){
                var sjby = data.data;
                var str = '';

                for(var i=0; i<sjby.length; i++){
                    str += `
                        <li>
                            <a href="${sjby[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${sjby[i]["img"]}">
                                        <span class="tit_tab">${sjby[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${sjby[i]["title"]}</li>
                                            <li>${sjby[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${sjby[i]["content"]}</p>
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
                $('.raslit_sjby').html(str);
            });
        },
        error: function () {
            console.log("false");
        }
    });
}

//共建村产
var raslit_dcm_gjcc = function(){
    $.ajax({
        url: bMock.getFace("raslit_dcm_gjcc"),
        type:"get",
        dataType:"json",
        async:true,
        success:function(data,status){
            $('.gjcc').click(function(){
                var gjcc = data.data;
                var str = '';

                for(var i=0; i<gjcc.length; i++){
                    str += `
                        <li>
                            <a href="${gjcc[i]["url"]}">
                                <dl>
                                    <dt class="raslit_pic">
                                        <img src="${gjcc[i]["img"]}">
                                        <span class="tit_tab">${gjcc[i]["sign"]}</span>
                                    </dt>
                                    <dd class="raslit_txt">
                                        <ul class="raslit_txt_nam">
                                            <li>${gjcc[i]["title"]}</li>
                                            <li>${gjcc[i]["state"]}</li>
                                        </ul>
                                        <div class="raslit_txt_p">
                                            <p>${gjcc[i]["content"]}</p>
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
                $('.raslit_gjcc').html(str);
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
    raslit_dcm_zxzt();    //最新主题
    raslit_dcm_rycm();    //荣誉村民
    raslit_dcm_sjby();    //私家别苑
    raslit_dcm_gjcc();    //共建村产
});
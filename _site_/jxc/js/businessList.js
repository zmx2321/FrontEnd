$(function(){
    //mock
    var thisApi = {
        //页面标签信息
        tsms: {
            dev: "mock/tsms.json",
            product: "",
        },
        mlxc: {
            dev: "mock/mlxc.json",
            product: "",
        },
        jqly: {
            dev: "mock/jqly.json",
            product: "",
        },
        stnc: {
            dev: "mock/jqly.json",
            product: "",
        },
    };
    bMock.setFace(thisApi);
    bMock.setEnv("dev");
    console.log(bMock.getFace("tsms"));
});

//加载特色民宿
var tsms = function(){
    $('.tsms').click(function(){
        $('.buslist').text("特色民宿");
        $.ajax({
            url: bMock.getFace("tsms"),
            type:"get",
            dataType:"json",
            success: function(data,status){
                var str = '';
                var tsms = data.data;
                console.log(tsms);
                
                for(var i=0; i<tsms.length; i++){
                    str += `
                        <li>
                            <a href="businessDetail.html">
                                <div class="fowcot_wrap">
                                    <div class="fowcot_pic">
                                        <img src="${tsms[i]["imgs"]}">
                                    </div>
                                    <div class="fowcot_txt fowbus_txt">
                                        <ul>
                                            <li>
                                                <dl>
                                                    <dd>
                                                        <h1>${tsms[i]["title"]}</h1>
                                                    </dd>
                                                </dl>
                                            </li>
                                            <ol>
                                                <li>
                                                    <h3>${tsms[i]["lab"][0]}</h3>
                                                </li>
                                                <li>
                                                    <h3>${tsms[i]["lab"][1]}</h3>
                                                </li>
                                            </ol>
                                            <ol>
                                                <li>
                                                    <h2>${tsms[i]["list"][0]}</h2>
                                                </li>
                                                <li>
                                                    <h2>${tsms[i]["list"][1]}</h2>
                                                </li>
                                                <li>
                                                    <h2>${tsms[i]["list"][2]}</h2>
                                                </li>
                                            </ol>
                                            <li>
                                                <dl>
                                                    <dd>
                                                        <h4>${tsms[i]["price"]}</h4>
                                                    </dd>
                                                    <dd><span>${tsms[i]["address"][0]}</span>${tsms[i]["address"][1]}</dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </a>
                        </li>
                    `;
                }
                $('.buslit_cot ul').html(str);
            },
            error: function(){
                console.log("false");
            }        
        });
    });
}

//加载美丽乡村
var mlxc = function(){
    $('.mlxc').click(function(){
        $('.buslist').text("美丽乡村");
        $.ajax({
            url: bMock.getFace("mlxc"),
            type:"get",
            dataType:"json",
            success: function(data,status){
                var str = '';
                var mlxc = data.data;
                console.log(mlxc);
                
                for(var i=0; i<mlxc.length; i++){
                    str += `
                        <li>
                            <a href="businessDetail.html">
                                <div class="fowcot_wrap">
                                    <div class="fowcot_pic">
                                        <img src="${mlxc[i]["imgs"]}">
                                    </div>
                                    <div class="fowcot_txt fowbus_txt">
                                        <ul>
                                            <li>
                                                <dl>
                                                    <dd>
                                                        <h1>${mlxc[i]["title"]}</h1>
                                                    </dd>
                                                </dl>
                                            </li>
                                            <ol>
                                                <li>
                                                    <h3>${mlxc[i]["lab"][0]}</h3>
                                                </li>
                                                <li>
                                                    <h3>${mlxc[i]["lab"][1]}</h3>
                                                </li>
                                            </ol>
                                            <ol>
                                                <li>
                                                    <h2>${mlxc[i]["list"][0]}</h2>
                                                </li>
                                                <li>
                                                    <h2>${mlxc[i]["list"][1]}</h2>
                                                </li>
                                                <li>
                                                    <h2>${mlxc[i]["list"][2]}</h2>
                                                </li>
                                            </ol>
                                            <li>
                                                <dl>
                                                    <dd><span>${mlxc[i]["address"][0]}</span>${mlxc[i]["address"][1]}</dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </a>
                        </li>
                    `;
                }
                $('.buslit_cot ul').html(str);
            },
            error: function(){
                console.log("false");
            }        
        });
    });
}

//加载景区乐园
var jqly = function(){
    $('.jqly').click(function(){
        $('.buslist').text("景区乐园");
        $.ajax({
            url: bMock.getFace("jqly"),
            type:"get",
            dataType:"json",
            success: function(data,status){
                var str = '';
                var jqly = data.data;
                console.log(jqly);
                
                for(var i=0; i<jqly.length; i++){
                    str += `
                        <li>
                            <a href="businessDetail.html">
                                <div class="fowcot_wrap">
                                    <div class="fowcot_pic">
                                        <img src="${jqly[i]["imgs"]}">
                                    </div>
                                    <div class="fowcot_txt fowbus_txt">
                                        <ul>
                                            <li>
                                                <dl>
                                                    <dd>
                                                        <h1>${jqly[i]["title"]}</h1>
                                                    </dd>
                                                </dl>
                                            </li>
                                            <ol>
                                                <li>
                                                    <h3>${jqly[i]["lab"][0]}</h3>
                                                </li>
                                                <li>
                                                    <h3>${jqly[i]["lab"][1]}</h3>
                                                </li>
                                            </ol>
                                            <ol>
                                                <li>
                                                    <h2>${jqly[i]["list"][0]}</h2>
                                                </li>
                                                <li>
                                                    <h2>${jqly[i]["list"][1]}</h2>
                                                </li>
                                                <li>
                                                    <h2>${jqly[i]["list"][2]}</h2>
                                                </li>
                                            </ol>
                                            <li>
                                                <dl>
                                                    <dd>
                                                        <h4>${jqly[i]["price"]}</h4>
                                                    </dd>
                                                    <dd><span>${jqly[i]["address"][0]}</span>${jqly[i]["address"][1]}</dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </a>
                        </li>
                    `;
                }
                $('.buslit_cot ul').html(str);
            },
            error: function(){
                console.log("false");
            }        
        });
    });
}


//加载生态农场
var stnc = function(){
    $('.stnc').click(function(){
        $('.buslist').text("生态农场");
        $.ajax({
            url: bMock.getFace("stnc"),
            type:"get",
            dataType:"json",
            success: function(data,status){
                var str = '';
                var stnc = data.data;
                console.log(stnc);
                
                for(var i=0; i<stnc.length; i++){
                    str += `
                        <li>
                            <a href="businessDetail.html">
                                <div class="fowcot_wrap">
                                    <div class="fowcot_pic">
                                        <img src="${stnc[i]["imgs"]}">
                                    </div>
                                    <div class="fowcot_txt fowbus_txt">
                                        <ul>
                                            <li>
                                                <dl>
                                                    <dd>
                                                        <h1>${stnc[i]["title"]}</h1>
                                                    </dd>
                                                </dl>
                                            </li>
                                            <ol>
                                                <li>
                                                    <h3>${stnc[i]["lab"][0]}</h3>
                                                </li>
                                                <li>
                                                    <h3>${stnc[i]["lab"][1]}</h3>
                                                </li>
                                            </ol>
                                            <ol>
                                                <li>
                                                    <h2>${stnc[i]["list"][0]}</h2>
                                                </li>
                                                <li>
                                                    <h2>${stnc[i]["list"][1]}</h2>
                                                </li>
                                                <li>
                                                    <h2>${stnc[i]["list"][2]}</h2>
                                                </li>
                                            </ol>
                                            <li>
                                                <dl>
                                                    <dd><span>${stnc[i]["address"][0]}</span>${stnc[i]["address"][1]}</dd>
                                                </dl>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="clear"></div>
                                </div>
                            </a>
                        </li>
                    `;
                }
                $('.buslit_cot ul').html(str);
            },
            error: function(){
                console.log("false");
            }        
        });
    });
}
//页面交互
var tip = function(){
    //选项卡
    $('.buslit_top li').click(function(){
        $('.mask').fadeIn();
        $('.mask_cont').fadeIn();
        $('.mask_cont div.buslit_liwrap').eq($(this).index()).show().siblings().hide();
    }); 

    $('.mask').click(function(){
        $('.mask').fadeOut();
        $('.mask_cont').fadeOut();
    });

    //类型
    $('.buslit_li_type ul li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.mask').fadeOut();
        $('.mask_cont').fadeOut();
    });

    //排序
    $('.buslit_li_sort ul li').click(function(){
        $(this).addClass('active').siblings().removeClass('active');
        $('.mask').fadeOut();
        $('.mask_cont').fadeOut();
    });

    //筛选
    $('.buslit_li_screen_cot li').toggle(
        function(){
            $(this).addClass('active');
            $('.reset').click(function(){
                $('.buslit_li_screen_cot li').removeClass('active');
            });
            $('.complete').click(function(){
                $('.mask').fadeOut();
                $('.mask_cont').fadeOut();
            });
        },
        function(){
            $(this).removeClass('active');
        }
    );

    $('.search_box input').focus();
}

//选择地址
var selectAddress = function(){
    $('.address').click(function(){
        getProvinceBuy();
    });
}

//浏览器滚动条位置
var setnavscroll = function(){
    $(window).scroll(function(){
        var window_top = $(window).scrollTop();
        var div_top = $('.navbar').offset().top;

        if (window_top > div_top) {
            $('.poyctyt_nav').addClass('poyctyt_nav_fix');
            $('.navbar').height($('.poyctyt_nav').height());
            // $('.poyctyt_nav ul li.active').addClass('xzgd');
        } else {
            $('.poyctyt_nav').removeClass('poyctyt_nav_fix');
            $('.navbar').height(0);
            // $('.poyctyt_nav ul li.active').removeClass('xzgd');
        }
    });
}

$(function(){
    tip();  //页面交互
    selectAddress();    //选择地址
    tsms();
    mlxc();
    jqly();
    stnc();
    setnavscroll();
});
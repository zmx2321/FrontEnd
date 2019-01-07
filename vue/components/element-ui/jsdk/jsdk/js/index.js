//公共工具方法
util = {
    /**
     * [setnavscroll 浏览器滚动条位置]
     * @param  {[type]} navbar [nav上填充高度]
     * @param  {[type]} nav    [nav内容]
     * @param  {[type]} navfix [nav上添加的class]
     * @return {[type]}        0
     */
    setnavscroll: (navbar, nav, navfix) => {
        var window_top = $(window).scrollTop();
        var div_top = navbar.offset().top;

        if (window_top > div_top) {
            nav.addClass(navfix);
            navbar.height(nav.height());
        } else {
            nav.removeClass(navfix);
            navbar.height(0);
        }
    },

    /**
     * modal
     */
    //showLoding
    showLoding: () => {
        $('.m-modal').show();
        $('.loading').show();
    },
    //hideLoding
    hideLoding: () => {
        $('.m-modal').hide();
        $('.loading').hide();
    },
};

//页面工具方法
const tip = () =>{
	//nav
    $('.list_menu li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    //自动触发点击事件
    $('#tab1').trigger("click");
};

//nav置顶
const setnavscroll = () => {
    util.setnavscroll($('.navbar'), $('.list_menu'), 'list_menu_fix');
};

//ajax
const handleData = {
    url: "http://dc-api.9m3j.cn",
    // url: "http://api8084.ximuok.com",
    // url: "http://10.10.10.238:8090",

    tab: () => {
        //点击t1
        $('#tab1').click(() => {
            util.showLoding();  //加载loading

            let param = {
                type: 0
            };

            $.ajax({
                type:"POST",
                url: handleData.url + "/item/find",
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(param),
                dataType:"json",
                success: res => {
                    console.log(res);

                    util.hideLoding();

                    let str = "";
                    let data = res.data;

                    for (let i=0; i<data.length; i++){
                        console.log(data[i]);

                        str += `
                            <a href="#">
                                <div class="wrap">
                                    <div class="icon_wrap f-pr f-oh">
                                        <div class="icon">
                                            <img src="${data[i].logoUrl}" alt="logoUrl">
                                        </div>
                                    </div>
                                    <div class="text_wrap f-pr f-oh">
                                        <div class="text">
                                            <ul>
                                                <li>
                                                    <span class="t1 f-toe">${data[i].title}</span>
                                                </li>
                                                <li>
                                                    <span class="t2 f-toe">${data[i].desc}</span>
                                                </li>
                                                <li>
                                                    <span class="t2">申请人数<b>337419</b>人</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="arrow">
                                            <img src="images/icon_rightarrow_gray.png" alt="arrow">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        `;
                    }

                    $('.container').html(str);
                },
                err: res => {
                    console.log(res);
                }
            });
        });

        //点击t2
        $('#tab2').click(() => {
            util.showLoding();  //加载loading

            let param = {
                type: 1
            };

            $.ajax({
                type:"POST",
                url: handleData.url + "/item/find",
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(param),
                dataType:"json",
                success: (res) => {
                    util.hideLoding();

                    let str = "";
                    let data = res.data;

                    for (let i=0; i<data.length; i++){
                        console.log(data[i]);

                        str += `
                            <a href="#">
                                <div class="wrap">
                                    <div class="icon_wrap f-pr f-oh">
                                        <div class="icon">
                                            <img src="${data[i].logoUrl}" alt="logoUrl">
                                        </div>
                                    </div>
                                    <div class="text_wrap f-pr f-oh">
                                        <div class="text">
                                            <ul>
                                                <li>
                                                    <span class="t1 f-toe">${data[i].title}</span>
                                                </li>
                                                <li>
                                                    <span class="t2 f-toe">${data[i].desc}</span>
                                                </li>
                                                <li>
                                                    <span class="t2">申请人数<b>337419</b>人</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="arrow">
                                            <img src="images/icon_rightarrow_gray.png" alt="arrow">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        `;
                    }

                    $('.container').html(str);
                },
                err: res => {
                    console.log(res);
                }
            });
        });

        //点击t3
        $('#tab3').click(() => {
            util.showLoding();  //加载loading

            let param = {
                type: 2
            };

            $.ajax({
                type:"POST",
                url: handleData.url + "/item/find",
                contentType: 'application/json; charset=UTF-8',
                data: JSON.stringify(param),
                dataType:"json",
                success: (res) => {
                    util.hideLoding();

                    let str = "";
                    let data = res.data;

                    for (let i=0; i<data.length; i++){
                        console.log(data[i]);

                        str += `
                            <a href="#">
                                <div class="wrap">
                                    <div class="icon_wrap f-pr f-oh">
                                        <div class="icon">
                                            <img src="${data[i].logoUrl}" alt="logoUrl">
                                        </div>
                                    </div>
                                    <div class="text_wrap f-pr f-oh">
                                        <div class="text">
                                            <ul>
                                                <li>
                                                    <span class="t1 f-toe">${data[i].title}</span>
                                                </li>
                                                <li>
                                                    <span class="t2 f-toe">${data[i].desc}</span>
                                                </li>
                                                <li>
                                                    <span class="t2">申请人数<b>337419</b>人</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="arrow">
                                            <img src="images/icon_rightarrow_gray.png" alt="arrow">
                                        </div>
                                    </div>
                                </div>
                            </a>
                        `;
                    }

                    $('.container').html(str);
                },
                err: res => {
                    console.log(res);
                }
            });
        });
    }
};

//滚动条滚动的时候加载
$(window).scroll(function(){
    setnavscroll();  //nav置顶
});

//选项卡数据加载
const tab = ()=> {
    // alert();
};

$(function(){
    // handleData.login();  //登录
    setnavscroll();  //浏览器滚动条位置
    handleData.tab();  //选项卡数据加载
    tip();  //页面工具方法
});
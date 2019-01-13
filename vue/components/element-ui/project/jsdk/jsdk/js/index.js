// 公共工具方法
util = {
    flag: true,  // 分页开关

    scrolltop: () => {
        var speed=200;//滑动的速度
        $('body,html').animate({ scrollTop: 0 }, speed);
        setnavscroll(); //导航栏
        return false;
    },

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

    /**
     * reset
     */
    reset: () => {
        util.scrolltop();
        $('.tip').fadeOut();
        $('.container').html("");
    }
};

// ajax
const handleData = {
    url: "http://dc-api.9m3j.cn",
    // url: "http://api8084.ximuok.com",
    // url: "http://10.10.10.238:8090",

    loadData: (type, pageNum) => {
        util.showLoding();  //加载loading

        let param = {
            type: type,
            pageSize: 10,  //每页条数
            pageNum: pageNum,  //当前页码
        };

        $.ajax({
            type:"POST",
            url: handleData.url + "/item/find",
            contentType: 'application/json;charset=UTF-8',
            data: JSON.stringify(param),
            dataType:"json",
            success: res => {
                let pages = res.data.pages,  //总页码
                    pageNum = res.data.pageNum;  //当前页码

                //如果当前页码大于总页码
                if (pageNum >= pages+1) {
                    $('.tip').fadeIn();

                    util.flag = false;
                }

                util.hideLoding();

                let str = "";
                let data = res.data.list;

                console.log(res.data.list);

                for (let i=0; i<data.length; i++){
                    // console.log(data[i]);

                    str += `
                        <a href="${data[i].targetUrl}">
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

                $('.container').append(str);
            },
            err: res => {
                console.log(res);
            }
        });
    },
};

// 页面工具方法
const tip = () =>{
	//nav
    $('.list_menu li').click(function () {
        $(this).addClass('active').siblings().removeClass('active');
    });

    // 自动触发点击事件
    $('#tab2').trigger("click");
};

// 选项卡数据加载
const getData = (_$, type) => {
    _$.click(() => {
        util.reset();
        let num = 1;
        util.flag = true;

        handleData.loadData(type);

        // 滚动条事件
        $(window).scroll(function(){
            console.log(util.flag);

            if (util.flag) {
                if($(document).scrollTop() + $(window).height() > $(document).height() - 30){
                    setTimeout(function(){
                        console.log(num);
                        handleData.loadData(type, num+=1);
                    }, 500);
                }
            }
        });
    });
};

// 选项卡
const tab = () => {
    getData($('#tab1'), 0);  // 快速微贷
    getData($('#tab2'), 1);  // 热门极速贷
    getData($('#tab3'), 2);  // 大额贷款
};

// nav置顶
const setnavscroll = () => {
    util.setnavscroll($('.navbar'), $('.list_menu'), 'list_menu_fix');
};

// 滚动条滚动的时候加载
$(window).scroll(function(){
    setnavscroll();  //nav置顶
});

// dom加载完时执行
$(function(){
    setnavscroll();  // 浏览器滚动条位置
    tab();  // 选项卡数据加载
});

// dom加载完之后执行
window.onload = () => {
    tip();  // 页面工具方法
};
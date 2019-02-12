/***
 *  @fileoverview
 *  @author zmx2321
 *  @date 2019/1/11
 * */

// 公共工具方法
util = {
    // url: "http://10.10.10.238:8089/",
    url: "http://hh55.ge75g.cn/",

    // 改变根元素font-size
    rootFont: () => {
        let c_width = document.documentElement.clientWidth;
        $('html').css('fontSize', c_width / 7.5 + "px");
    },

    /**
     * @description  弹框
     * @param _$  被点击的元素
     * @param message  提示内容
     */
    laytip: (_$, message) => {
        _$.on('click', () => {
            layer.tips(message, _$, {
                tips: [1, '#009688'],   // 方向，颜色
                tipsMore: true  // 是否允许多个
            });
        });
    }
}

// load data
let loadData = {
    // ios数据加载
    ios: () => {
        $.ajax({
            url: util.url + "version/findVersionByType",
            type:"POST",
            dataType:"json",
            data: "{osType: 'ios'}",
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "uri-path": "/version/findVersionByType"
            },
            success: res => {
                // console.log(res.data);

                let url = res.data.url;

                javascrtpt:window.location.href = url;
            }
        });
    },

    // android数据加载
    android: () => {
        let url = util.url + "download/pdf";

        javascrtpt:window.location.href = url;
    }
}

// swiper
let swiper_setp = () => {
    let swiper_setp = new Swiper('.setp_container', {
        navigation: {
            nextEl: '.step_next',
            prevEl: '.step_prev',
        },
    });

    swiper_setp.slideTo(0, 1000, false);
}

// 按钮事件
let btnEvent = {
    // ios按钮事件
    ios: () => {
        $(".iosbtn").click(() => {
            // loadData.ios();  // ios数据加载
            $('.m-modal').fadeIn(300);
            $('.ios_box').slideDown(500);
        });
    },
    // android按钮事件
    android: () => {
        // util.laytip($('.andrbtn '), "紧张开发中,即将上线");  // 执行lay弹框

        // android按钮事件
        $(".andrbtn").click(() => {
            loadData.android();  // android数据加载
        });
    },
}

// 关闭弹窗
let close = {
    ios_box: () => {
        $('.ios_box .close').click(() => {
            $('.ios_box').slideUp(300);
            $('.m-modal').fadeOut(500);
        });
    }
}

// 点击按钮
let pressBtn = () => {
    // 点击按钮
    btnEvent.ios();  // 点击ios按钮
    btnEvent.android();  // 点击android按钮

    // 关闭弹窗
    close.ios_box();  // 关闭ios弹窗
}

// 窗口改变时执行
$(window).resize(function() {
    util.rootFont();  // 改变根元素font-size
});

// dom加载完执行
window.onload = () => {
    util.rootFont();  // 改变根元素font-size
    swiper_setp();  // swiper
};

// dom加载时执行
$(() => {
    pressBtn();  // 点击按钮
});
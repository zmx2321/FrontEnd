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
        // let url = "http://app.ge75g.cn/app/app-release.zip";
        // let url = "http://10.10.10.238:8089/downloadText";
        let url = util.url + "downloadText?url=http://app.ge75g.cn/app/app-release.zip";

        javascrtpt:window.location.href = url;
    }
}

// 按钮事件
let btnEvent = {
    // ios按钮事件
    ios: () => {
        $(".iosbtn").click(() => {
            loadData.ios();  // ios数据加载
        });
    },
    // android按钮事件
    android: () => {
        // util.laytip($('.andrbtn '), "紧张开发中,即将上线");  // 执行lay弹框

        // android按钮事件
        $(".andrbtn").click(() => {
            loadData.android();  // android数据加载
        });
    }
}

// 点击按钮
let pressBtn = () => {
    btnEvent.ios();  // 点击ios按钮
    btnEvent.android();  // 点击android按钮
}

// 窗口改变时执行
$(window).resize(function() {
    util.rootFont();  // 改变根元素font-size
});

// dom加载完执行
window.onload = () => {
    util.rootFont();  // 改变根元素font-size
};

// dom加载时执行
$(() => {
    pressBtn();  // 点击按钮
});
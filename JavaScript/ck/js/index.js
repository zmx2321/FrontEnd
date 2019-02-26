let util = {
    // 改变根元素font-size
    rootFont: () => {
        document.documentElement.style.fontSize = document.documentElement.clientWidth / 7.5 + "px";
    },
    /**
     * 获取URL参数
     */
    getPath(url){
        let reg = /^(https?:)\/\/([^\/]+)(\/[^\?]*)?(\?[^#]*)?(#.*)?$/;
        let arr = url.match(reg);

        var postocol = arr[1];
        var host = arr[2];
        var pathname = arr[3];
        var search = arr[4];
        var hash = arr[5];
        var obj = {
            arr: arr,
            postocol: postocol,
            host: host,
            pathname: pathname,
            search: search,
            hash: hash
        }

        return obj;
    },
}

// 视频
let ckvideo = () => {
    // 获取当前地址参数
    let videoUrl = util.getPath(document.URL).search.slice(3);

    // let str = "http://movie.ks.js.cn/flv/other/1_0.mp4"  // 齐天大圣
    // let str = "http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4"  // 齐天大圣
    // let str = "https://acfun.iqiyi-kuyun.com/20181128/ICVnA64J/index.m3u8"  // 直播
    let str = `${videoUrl}`;

    let videoObject = {
        container: '.video',//“#”代表容器的ID，“.”或“”代表容器的class
        variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
        autoplay:true,//自动播放
        video: str //视频地址
    };

    new ckplayer(videoObject);

    // console.log(videoObject.video);
}


// dom执行
window.onload = () => {
    util.rootFont();  // 改变根元素font
    ckvideo();  // 视频
}

window.addEventListener("resize",function(){
    util.rootFont();  // 改变根元素font
    // ckvideo();  // 视频
}, false);








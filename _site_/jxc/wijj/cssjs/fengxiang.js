/*
	中联全景 苏扬网络科技有限公司荣誉出品  功能定制： QQ:2529737999 电话：18066137916 联系人：邢工
*/
//通知JS下一个场景是什么名字
function nextScene2JS(sceneid) {}
//智能html5选择
function selecthtml5usage() {
	var userAgent = navigator.userAgent.toLowerCase();
	if(userAgent.indexOf("android") >= 0) {
		if( userAgent.indexOf("qq") >= 0 ) {
			return "auto+css3d";
		} else {
			return "prefer";
		}
	} else if( userAgent.indexOf("firefox")>=0 ) {
		return "prefer";
	} else {
		return "auto";
	}
}
//获取网址后缀的函数
function getQueryString(key) {
	var returnValue = ""; 
	var sURL = window.document.URL;
	if (sURL.indexOf("?") > 0) {
		var arrayParams = sURL.split("?");
		var arrayURLParams = arrayParams[1].split("&");
		for (var i = 0; i < arrayURLParams.length; i++) {
			var sParam =  arrayURLParams[i].split("=");
			if ((sParam[0] ==key) && (sParam[1] != "")){ returnValue=sParam[1]; }
		}
	}
	return returnValue;
}
function isWechat() {
	if((navigator.userAgent.toLowerCase()).indexOf("micromessenger") >= 0) {
		return true;
	} else {
		return false;
	}
}
//社交分享
function share(home, scene, spot, thumb, txt, fov, hla, vla) {
	home = home.toString().toLowerCase();
	scene = scene.toString().toLowerCase();
	var t = encodeURI(document.title);
	var begin = "";
	var u = window.location.href;
	if(u.indexOf("begin")>0){u=u.split("?begin"); u=u[0];} else {u+=begin;}var uthumb = u;
	if(u.lastIndexOf("/") > 0) { uthumb = u.substring(0, u.lastIndexOf("/")); }
	thumb = thumb.toString().replace(/%SWFPATH%/, uthumb);	
	var appkey = encodeURI("");
	var pic = encodeURI(thumb);
	var site = encodeURI("");
	var summary = encodeURI(txt);
	var desc = "";
	var url=null;
	switch(home) {
		case "tencent":
			url = "http://v.t.qq.com/share/share.php?title="+t+"&url="+u+"&appkey="+appkey+"&site="+site+"&pic="+pic;
			break;
		case "weibo":
			url = "http://service.weibo.com/share/share.php?style=simple&searchPic=false&type=button&language=zh_cn&title="+t+"&url="+u+"&pic="+pic;
			break;
		case "qzone":
			url="http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?title="+t+"&site="+site+"&desc="+desc+"&summary="+summary+"&pics="+pic+"&url="+u;
			break;
		case "douban":
			url="http://www.douban.com/share/service?bm=&image="+pic+"&href="+u+"&updated=&name="+t+"&text="+summary;
			break;
	}
	var alink=document.createElement("a");
	alink.href = url;
	alink.innerHTML = "SHARE";
	alink.target="_blank"
	alink.style.display = "none";
	document.body.appendChild(alink);
	alink.click();
}
/**
 定义播放器加载（初始化）时要传递的参数，flashvars是一个（对象）变量，
 该变量主要为PC端的flashplayer所使用。但部分参数也为移动端H5所使用。
 该变量所有属性的功能及作用请查看本手册中单独的有关该变量的说明（建议了解以下相关内容里有相关链接）。
 特别说明：f属性仅供pc端使用，如果是多段视频可以用f:'1.flv|2.flv'这样的形式。
 */
var flashvars = {
  f:'http://movie.ks.js.cn/flv/other/1_0.mp4',
  p: 0,
  e: 1,
  i: 'http://www.ckplayer.com/static/images/cqdw.jpg'
};

/**
	该变量是一个数组形式。定义了移动端（H5）播放时使用的视频地址，数组结构说明如下：
	var video=['视频地址->MIME类型','视频地址->MIME类型','视频地址->MIME类型']; 
 */
var video=['http://img.ksbbs.com/asset/Mon_1703/05cacb4e02f9d9e.mp4->video/mp4'];  // 我的梦
// var video = ['video/lx.mp4->video/mp4'];  // 领鲜云站
// var video = ['http://movie.ks.js.cn/flv/other/1_0.mp4->video/mp4'];  // 齐天大圣

/**
 CKobject是用来调用播放器的函数。里面包含了若干（为了便于理解，我们暂且称其为）子函数。
 embed是其中的一个函数，该函数的作用是在自动判断平台类型（PC端还是移动端）后调用不同类型的
 播放器（flashplayer还是h5的video），该函数准确的格式说明如下：

	CKobject.embed('ckplayer.swf地址[必需]','视频所在容器的ID[必需]','播放器的ID[必需]','宽度[必需，支持具体值以及百分比]','高度[必需，支持具体值以及百分比]]',
	平台优先选项[false=优先使用flashplayer，true=优先使用h5的video],初始化参数[必需],移动端所使用的地址数组[必需],其它配置[非必需，主要针对flashplayer的配置]);
 */
// 只有当调用视频播放器时设置e=0或4时会有效果
// CKobject.embed('ckplayer/ckplayer.swf','a1','ckplayer_a1','600','400',false,flashvars,video);

// 只调用flash播放器
var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
CKobject.embedSWF('ckplayer/ckplayer.swf','a1','ckplayer_a1','600','400',flashvars,params); 








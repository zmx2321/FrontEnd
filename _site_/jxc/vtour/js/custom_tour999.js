var krpanoplugin = function(){
    //从当前插件对象中保存“这个"指针"
	var local = this;
 
    // Krpano和插件接口对象
    var krpano = null;
    var plugin = null;
 
    //registerplugin -插件的启动点（需要）
    ///krpanointerface = Krpano接口对象
    //pluginpath =完全合格的插件名称（例如“插件[姓名]”）
    //pluginobject = XML插件对象本身
    local.registerplugin = function(krpanointerface, pluginpath, pluginobject)
    {
        //得到Krpano的接口和插件对象
        krpano = krpanointerface;
        plugin = pluginobject;

        //获得当前场景名称
        var aa = krpano.get("scene[get(xml.scene)].title"); // value
        console.log(aa);

    // var note = document.createElement('div');
    //     note.className = 'aa';
    //     note.id = "bb";

    //     note.style.cssText = "width:100%;height:100%;"+
    //         "display:flex;color:white;background:rgba(10,50,100,0.5);"+
    //         "align-items:center;justify-content:center;text-align:center;";
    //     text.innerHTML = "HTML5<br>TEST PLUGIN<br>click me";

    //         var noteTpl = `
    //             123123
    //         `;

    //     note.innerHTML = noteTpl;



        //可选地添加一些图形内容：
        //寄存器the size of the content
        plugin.registercontentsize(300,200);
 
        //使用100%宽度/高度来自动缩放插件大小
        var title = document.createElement("div");
        title.className = 'title';
        title.id = 'title';
        var titleTpl = `
            <ul>
                <li class="titlep">${aa}</li>
                <li class="titbtn" onclick="location.href='orderState.html'">点击进入</li>
            </ul>
        `;
        title.innerHTML = titleTpl;
 
        //插件“雪碧”变量是插件的内部HTML元素
        plugin.sprite.appendChild(title);




 
        //打印
        krpano.trace(1, "hello from plugin[" + plugin.name + "]");
        krpano.trace(1, "12123132");

        // var a = krpano.get(scene[get(xml.scene)].title);
        // console.log(krpanointerface);
 
        //添加插件操作（属性需要小写）！
        plugin.initial = initial_plugin;
    }
 
    //unloadplugin -插件退出点（可选）
    //将被称为来自Krpano插件时将被删除
    //插件中添加的所有东西都应该删除
    local.unloadplugin = function()
    {
        plugin = null;
        krpano = null;
    }

    //执行插件操作
    function initial_plugin(){
           
        // krpano.call("showlog()");
        // console.log(krpano);
        // console.log("load");
    }
}

window.onload = function() {
    //调用全景
	embedpano({swf:"tour.swf", xml:"tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true,consolelog:true});

    var krpano = document.getElementById("krpanoSWFObject");  
    // var aa = krpano.get("hotspot[nadirlogo]"); // value
    // console.log(aa);
}
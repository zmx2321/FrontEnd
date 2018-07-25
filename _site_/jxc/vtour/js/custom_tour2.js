var krpanoplugin = function(){
    //从当前插件对象中保存“这个"指针"
	var local = this;
 
    // Krpano和插件接口对象
    var krpano = null;
    var plugin = null;
 
    //自定义xml属性的值
    var xml_value = 100.0;
 
    //registerplugin -插件的启动点（需要）
    ///krpanointerface = Krpano接口对象
    //pluginpath =完全合格的插件名称（例如“插件[姓名]”）
    //pluginobject = XML插件对象本身
    local.registerplugin = function(krpanointerface, pluginpath, pluginobject)
    {
        //得到Krpano的接口和插件对象
        krpano = krpanointerface;
        plugin = pluginobject;
 
        //先打招呼
        krpano.trace(1, "hello from plugin111[" + plugin.name + "]");

        console.log(plugin.name);
 
         //添加插件属性
        plugin.registerattribute("mode", "normal");
        plugin.registerattribute("value", xml_value, value_setter, value_getter);
 
        //添加插件操作（属性需要小写）！
        plugin.click = action_click;
 
        //可选地添加一些图形内容：
        //寄存器the size of the content
        plugin.registercontentsize(200,200);
 
        //使用100%宽度/高度来自动缩放插件大小
        var text = document.createElement("div");
        text.style.cssText = "width:100%;height:100%;"+
            "display:flex;color:white;background:rgba(10,50,100,0.5);"+
            "align-items:center;justify-content:center;text-align:center;";
        text.innerHTML = "HTML5<br>TEST PLUGIN<br>click me";
 
        //插件“雪碧”变量是插件的内部HTML元素
        plugin.sprite.appendChild(text);
    }
 
    //unloadplugin -插件退出点（可选）
    //将被称为来自Krpano插件时将被删除
    //插件中添加的所有东西都应该删除
    local.unloadplugin = function()
    {
        plugin = null;
        krpano = null;
    }
 
     //宽度，高度=插件的新大小
    //当没有定义，那么只有Krpano插件HTML元素将大小
    local.onresize = function(width,height)
    {
        //在本例中未使用插件内容会自动调整大小，因为宽度= 100%，高度= 100% CSS样式
        return false;
    }
 
    function value_setter(newvalue)
    {
        if (newvalue != xml_value)
        {
            krpano.trace(1, "'value' will be changed from " + xml_value + " to " + newvalue);
            xml_value = newvalue;
        }
    }
 
    function value_getter()
    {
        return xml_value;
    }
 
    //点击事件
    function action_click() {
        // 跟踪给定的动作参数
        krpano.trace(1, "dosomething() was called with " + arguments.length + " arguments:");
        for (var i=0; i < arguments.length; i++)
            krpano.trace(1, "arguments[" + i + "]=" + arguments[i]);
 
        // 微量的一些信息
        krpano.trace(1, "mode=" + plugin.mode);
        krpano.trace(1, "lookat=" + krpano.view.hlookat + " / " + krpano.view.vlookat);
 
        plugin.accuracy = 1;    // 禁用网格拟合以获得更平滑的大小变化
        krpano.call("tween(width|height, 500|100)", plugin);
        krpano.call("lookto(0,0,150); wait(1.0); lookto(90,0,90);");
        krpano.call("tween(width|height, 200|200)", plugin);
        console.log(plugin);
    }
}

window.onload = function() {
	embedpano({swf:"tour.swf", xml:"tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true,consolelog:true});
}
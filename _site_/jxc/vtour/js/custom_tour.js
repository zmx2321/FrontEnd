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

        // add a from xml callable functions:
        plugin.initial = initial_plugin;
        plugin.set_url = set_url;
        plugin.agree = agree;
        plugin.cancel_agree = cancel_agree;

        plugin.aa = aa;

        // //
        // plugin.addViewNum = addViewNum;
        // plugin.add_agree = add_agree;
        // plugin.cancel_agree = cancel_agree;
        // plugin.getViewAndAgreeWithAddView = getViewAndAgreeWithAddView;
        // plugin.getViewAndAgree = getViewAndAgree;

        // plugin.registerattribute("onloadnumok", "");
        // //

        //获得当前场景名称
        var text = krpano.get("scene[get(xml.scene)].title"); // value
        krpano.call("set_title(" + text + ")");
        console.log(text);

        //nav
        var nav = document.createElement("div");
        nav.className = 'nav';
        nav.id = 'nav';
        var navTpl = `
            <ul>
                <li class="sq active">返回市区</li>
                <li class="xq">返回县区</li>
                <li class="jq">返回景区</li>
                <li class="xc">返回乡村</li>
            </ul>
        `;
        nav.innerHTML = navTpl;
        document.body.appendChild(nav);

        //side
        var side = document.createElement("side");
        side.className = 'side';
        side.id = 'side';
        var sideTpl = `
            123123
        `;
        side.innerHTML = sideTpl;
        document.body.appendChild(side);
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
        var text = krpano.get("scene[get(xml.scene)].title"); // value
        krpano.call("set_title(" + text + ")");
        var navclick = function(){
            $('.sq').click(function(){
                $(this).addClass('active').nextAll().removeClass('active');
                // console.log(text);
                krpano.call("loadscene(scene_1,null,MERGE,BLEND(0.5))");
                console.log("市区");
            });
            $('.xq').click(function(){
                $(this).addClass('active');
                $(this).prevAll().addClass('active');
                $(this).nextAll().removeClass('active');
                console.log("县区");

            });
            $('.jq').click(function(){
                $(this).addClass('active');
                $(this).prevAll().addClass('active');
                $(this).nextAll().removeClass('active');
                console.log("景区");
            });
            $('.xc').click(function(){
                $(this).addClass('active');
                $(this).prevAll().addClass('active');
                $(this).nextAll().removeClass('active');
                console.log("乡村");
            });
        };

        navclick();


        // krpano.call("showlog()");
    }

    function set_url(text) {
        var text = krpano.get("scene[get(xml.scene)].title"); // value
        krpano.call("set_title(" + text + ")");
        alert(text);
        // local.openurl('http://www.baidu.com',_self);
    }

    function agree(){
        krpano.call("set(layer[agree].url,'images/agree2.png');set(layer[agree].onclick,'plugin[tip].cancel_agree();');");
    }

    function cancel_agree() {
        krpano.call("set(layer[agree].url,'images/agree1.png');set(layer[agree].onclick,'plugin[tip].agree();')");
    }

    function aa(){
        alert("123");
    }

}

window.onload = function() {
    //调用全景
	embedpano({swf:"tour.swf", xml:"tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true,consolelog:true});
}

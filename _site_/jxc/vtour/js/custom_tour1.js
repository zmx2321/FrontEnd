var krpanoplugin = function () {

    var local = this;
    // save the 'this' pointer from the current plugin object

    var krpano = null;
    // the krpano and plugin interface objects
    var plugin = null;

    var plugincanvas = null;
    // optionally - a canvas object for graphic content
    var plugincanvascontext = null;



    // registerplugin - startup point for the plugin (required)
    // - krpanointerface = krpano interface object
    // - pluginpath = string with the krpano path of the plugin (e.g. "plugin[pluginname]")
    // - pluginobject = the plugin object itself (the same as: pluginobject = krpano.get(pluginpath) )
    local.registerplugin = function (krpanointerface, pluginpath, pluginobject) {
        krpano = krpanointerface;
        plugin = pluginobject;

        // add a from xml callable functions:
        plugin.initial_plugin = initial_plugin;

        plugin.addViewNum = addViewNum;
        plugin.add_agree = add_agree;
        plugin.cancel_agree = cancel_agree;
        plugin.getViewAndAgreeWithAddView = getViewAndAgreeWithAddView;
        plugin.getViewAndAgree = getViewAndAgree;

        plugin.registerattribute("onloadnumok", "");

    }

    // unloadplugin - end point for the plugin (optionally)
    // - will be called from krpano when the plugin will be removed
    // - everything that was added by the plugin (objects,intervals,...) should be removed here
    local.unloadplugin = function () {
        plugin = null;
        krpano = null;
    }


    var baseURL = "http://viewandagree.azurewebsites.net/api/ViewAndAgreeModels/";

    var site_url;
    var password;


    function initial_plugin(uid) {
        site_url = window.location.href.split("?")[0];
        
        password = uid;
        if (hasAgreeCookie()) {
            krpano.call("set(layer[agree_num].url,'agree2.png');set(layer[agree_num].onclick,'plugin[va].cancel_agree();')");
        }
        getViewAndAgreeWithAddView();
    }

    function setAgreeView(text) {
        krpano.call("set_agree_view(" + text + ")");
    }

    function setAgree(text) {
        krpano.call("set_agree(" + text + ")");
        setAgreeCookie();
        krpano.call("set(layer[agree_num].url,'agree2.png');set(layer[agree_num].onclick,'plugin[va].cancel_agree();')");
    }

    function cancelAgree(text) {
        krpano.call("set_agree(" + text + ")");
        removeAgreeCookie();
        krpano.call("set(layer[agree_num].url,'agree1.png');set(layer[agree_num].onclick,'plugin[va].add_agree();')");
    }

    function setView(text) {
        krpano.call("set_view(" + text + ")");
    }

    function addCookie(objName, objValue, objHours) {//添加cookie 
        var str = objName + "=" + escape(objValue);
        if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失 
            var date = new Date();
            var ms = objHours * 3600 * 1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
    }

    function hasAgreeCookie() {
        var strCookie = document.cookie;
        //将多cookie切割为多个名/值对 
        var arrCookie = strCookie.split("; ");
        var userId;
        //遍历cookie数组，处理每个cookie对 
        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            //找到名称为userId的cookie，并返回它的值 
            if ("hasAgree" == arr[0]) {
                return true;
            }
        }
        return false;
    }

    function removeAgreeCookie()//删除cookie
    {

        function getCookie(name)//取cookies函数        
        {
            var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
            if (arr != null) return unescape(arr[2]); return null;
        }

        name = "hasAgree";
        var exp = new Date();
        exp.setTime(exp.getTime() - 1);
        var cval = getCookie(name);
        if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }


    function setAgreeCookie() {
        addCookie("hasAgree", 1, 24 * 30);
    }

    function getViewAndAgree() {
        var url = baseURL + "GetViewAndAgree";
        doGet(url, setAgreeView);
    }

    function getViewAndAgreeWithAddView() {
        var url = baseURL + "GetViewAndAgreeWithAddView";
        doGet(url, setAgreeView);
    }

    function addViewNum() {
        var url = baseURL + "AddViewNum";
        doPost(url, setView);
    }

    function add_agree() {
        if (!hasAgreeCookie()) {
            krpano.call("set(layer[agree_num].onclick,'')");
            var url = baseURL + "addAgreeNum";
            doPost(url, setAgree);
        }
    }

    function cancel_agree() {
        if (hasAgreeCookie()) {
            krpano.call("set(layer[agree_num].onclick,'')");
            var url = baseURL + "CancelAgreeNum";
            doPost(url, cancelAgree);
        }
    }

    function doGet(url, setFun) {

        url = url + "?url=" + site_url + "&password=" + password;
        var xmlHttp;
        if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }

        xmlHttp.open("GET", url);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.send();
        xmlHttp.onreadystatechange = function () {
            if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
                var text = xmlHttp.responseText;
                if (text.indexOf("passworderror") >= 0) {
                    alert("浏览点赞插件中的密码设置错误，请加入群156364025找管理人员免费获取密码")
                }
                else {
                    text = text.replace(/"/g, "");
                    if (setFun) {
                        setFun(text);
                    }
                }

            } else {

            }
        }
    }

    function doPost(url, setFun) {

        url = url + "?url=" + site_url + "&password=" + password;
        var xmlHttp;
        if (window.ActiveXObject) {
            xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
        } else if (window.XMLHttpRequest) {
            xmlHttp = new XMLHttpRequest();
        }

        xmlHttp.open("POST", url);
        xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlHttp.send();
        xmlHttp.onreadystatechange = function () {
            if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
                var text = xmlHttp.responseText;
                if (text.indexOf("passworderror") >= 0) {
                    alert("浏览点赞插件中的密码设置错误，请加入群551278936找管理人员免费获取密码")
                }
                else {
                    text = text.replace(/"/g, "");
                    if (setFun) {
                        setFun(text);
                    }
                }

            } else {


            }
        }
    }
};

// var krpanoplugin = function(){
// 	var local = this;   // save the 'this' pointer from the current plugin object
 
//     var krpano = null;  // the krpano and plugin interface objects

//     var plugin = null;
 
//     var xml_value = 100.0;   // the value for a custom xml attribute
 
//     // registerplugin - startup point for the plugin (required)
//     // - krpanointerface = krpano interface object
//     // - pluginpath = the fully qualified plugin name (e.g. "plugin[name]")
//     // - pluginobject = the xml plugin object itself
//     local.registerplugin = function(krpanointerface, pluginpath, pluginobject)
//     {
//         // get the krpano interface and the plugin object
//         krpano = krpanointerface;
//         plugin = pluginobject;
 
//         // first - say hello
//         krpano.trace(1, "hello from plugin111[" + plugin.name + "]");

//         console.log(pluginobject);
 
//         // add plugin attributes
//         plugin.registerattribute("mode", "normal");
//         plugin.registerattribute("value", xml_value, value_setter, value_getter);
 
//         // add plugin action (the attribute needs to be lowercase!)
//         plugin.dosomething = action_dosomething;
 
//         // optionally - add some graphical content:
 
//         // register the size of the content
//         plugin.registercontentsize(200,200);
 
//         // use 100% width/height for automatic scaling with the plugin size
//         var text = document.createElement("div");
//         text.style.cssText = "width:100%;height:100%;"+
//             "display:flex;color:white;background:rgba(10,50,100,0.5);"+
//             "align-items:center;justify-content:center;text-align:center;";
//         text.innerHTML = "HTML5<br>TEST PLUGIN<br>click me";
 
//         // the plugin 'sprite' variable is the internal html element of the plugin
//         plugin.sprite.appendChild(text);
//     }
 
//     // unloadplugin - exit point for the plugin (optionally)
//     // - will be called from krpano when the plugin will be removed
//     // - everything that was added by the plugin should be removed here
//     local.unloadplugin = function()
//     {
//         plugin = null;
//         krpano = null;
//     }
 
//     // onresize (optionally)
//     // - width,height = the new size for the plugin
//     // - when not defined then only the krpano plugin html element will be sized
//     local.onresize = function(width,height)
//     {
//         // not used in this example
//         // the plugin content will resize automatically because
//         // of the width=100%, height=100% CSS style
//         return false;
//     }
 
//     function value_setter(newvalue)
//     {
//         if (newvalue != xml_value)
//         {
//             krpano.trace(1, "'value' will be changed from " + xml_value + " to " + newvalue);
//             xml_value = newvalue;
//         }
//     }
 
//     function value_getter()
//     {
//         return xml_value;
//     }
 
//     function action_dosomething()
//     {
//         // trace the given action arguments
//         krpano.trace(1, "dosomething() was called with " + arguments.length + " arguments:");
//         for (var i=0; i < arguments.length; i++)
//             krpano.trace(1, "arguments[" + i + "]=" + arguments[i]);
 
//         // trace some infos
//         krpano.trace(1, "mode=" + plugin.mode);
//         krpano.trace(1, "lookat=" + krpano.view.hlookat + " / " + krpano.view.vlookat);
 
//         // call krpano actions
//         plugin.accuracy = 1;    // disable grid fitting for smoother size changes
//         krpano.call("tween(width|height, 500|100)", plugin);
//         krpano.call("lookto(0,0,150); wait(1.0); lookto(90,0,90);");
//         krpano.call("tween(width|height, 200|200)", plugin);
//     }




    // var local = this;
    // // save the 'this' pointer from the current plugin object

    // var krpano = null;
    // // the krpano and plugin interface objects
    // // 
    // var plugin = null;

    // var plugincanvas = null;
    // // optionally - a canvas object for graphic content

    // var plugincanvascontext = null;

    // // registerplugin - startup point for the plugin (required)
    // // - krpanointerface = krpano interface object
    // // - pluginpath = string with the krpano path of the plugin (e.g. "plugin[pluginname]")
    // // - pluginobject = the plugin object itself (the same as: pluginobject = krpano.get(pluginpath) )
    // local.registerplugin = function (krpanointerface, pluginpath, pluginobject) {
    //     krpano = krpanointerface;
    //     plugin = pluginobject;

    //     // add a from xml callable functions:
    //     plugin.initial_plugin = initial_plugin;

    //     plugin.addViewNum = addViewNum;
    //     plugin.add_agree = add_agree;
    //     plugin.cancel_agree = cancel_agree;
    //     plugin.getViewAndAgreeWithAddView = getViewAndAgreeWithAddView;
    //     plugin.getViewAndAgree = getViewAndAgree;

    //     plugin.registerattribute("onloadnumok", "");

    // }

    // // unloadplugin - end point for the plugin (optionally)
    // // - will be called from krpano when the plugin will be removed
    // // - everything that was added by the plugin (objects,intervals,...) should be removed here
    // local.unloadplugin = function () {
    //     plugin = null;
    //     krpano = null;
    // }


    // var baseURL = "http://viewandagree.azurewebsites.net/api/ViewAndAgreeModels/";

    // var site_url;
    // var password;


    // function initial_plugin(uid) {
    //     site_url = window.location.href.split("?")[0];
        
    //     password = uid;
    //     if (hasAgreeCookie()) {
    //         krpano.call("set(layer[agree_num].url,'agree2.png');set(layer[agree_num].onclick,'plugin[va].cancel_agree();')");
    //     }
    //     getViewAndAgreeWithAddView();
    // }

    // function setAgreeView(text) {
    //     krpano.call("set_agree_view("+ "123" + text + ")");
    // }

    // function setAgree(text) {
    //     krpano.call("set_agree("+ "123" + text + ")");
    //     setAgreeCookie();
    //     krpano.call("set(layer[agree_num].url,'agree2.png');set(layer[agree_num].onclick,'plugin[va].cancel_agree();')");
    // }

    // function cancelAgree(text) {
    //     krpano.call("set_agree(" + text + ")");
    //     removeAgreeCookie();
    //     krpano.call("set(layer[agree_num].url,'agree1.png');set(layer[agree_num].onclick,'plugin[va].add_agree();')");
    // }

    // function setView(text) {
    //     krpano.call("set_view(" + text + ")");
    // }

    // function addCookie(objName, objValue, objHours) {//添加cookie 
    //     var str = objName + "=" + escape(objValue);
    //     if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失 
    //         var date = new Date();
    //         var ms = objHours * 3600 * 1000;
    //         date.setTime(date.getTime() + ms);
    //         str += "; expires=" + date.toGMTString();
    //     }
    //     document.cookie = str;
    // }

    // function hasAgreeCookie() {
    //     var strCookie = document.cookie;
    //     //将多cookie切割为多个名/值对 
    //     var arrCookie = strCookie.split("; ");
    //     var userId;
    //     //遍历cookie数组，处理每个cookie对 
    //     for (var i = 0; i < arrCookie.length; i++) {
    //         var arr = arrCookie[i].split("=");
    //         //找到名称为userId的cookie，并返回它的值 
    //         if ("hasAgree" == arr[0]) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    // function removeAgreeCookie()//删除cookie
    // {

    //     function getCookie(name)//取cookies函数        
    //     {
    //         var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    //         if (arr != null) return unescape(arr[2]); return null;
    //     }

    //     name = "hasAgree";
    //     var exp = new Date();
    //     exp.setTime(exp.getTime() - 1);
    //     var cval = getCookie(name);
    //     if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    // }


    // function setAgreeCookie() {
    //     addCookie("hasAgree", 1, 24 * 30);
    // }

    // function getViewAndAgree() {
    //     var url = baseURL + "GetViewAndAgree";
    //     doGet(url, setAgreeView);
    // }

    // function getViewAndAgreeWithAddView() {
    //     var url = baseURL + "GetViewAndAgreeWithAddView";
    //     doGet(url, setAgreeView);
    // }

    // function addViewNum() {
    //     var url = baseURL + "AddViewNum";
    //     doPost(url, setView);
    // }

    // function add_agree() {
    //     if (!hasAgreeCookie()) {
    //         krpano.call("set(layer[agree_num].onclick,'')");
    //         var url = baseURL + "addAgreeNum";
    //         doPost(url, setAgree);
    //     }
    // }

    // function cancel_agree() {
    //     if (hasAgreeCookie()) {
    //         krpano.call("set(layer[agree_num].onclick,'')");
    //         var url = baseURL + "CancelAgreeNum";
    //         doPost(url, cancelAgree);
    //     }
    // }

    // function doGet(url, setFun) {

    //     url = url + "?url=" + site_url + "&password=" + password;
    //     var xmlHttp;
    //     if (window.ActiveXObject) {
    //         xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    //     } else if (window.XMLHttpRequest) {
    //         xmlHttp = new XMLHttpRequest();
    //     }

    //     xmlHttp.open("GET", url);
    //     xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //     xmlHttp.send();
    //     xmlHttp.onreadystatechange = function () {
    //         if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
    //             var text = xmlHttp.responseText;
    //             if (text.indexOf("passworderror") >= 0) {
    //                 alert("浏览点赞插件中的密码设置错误，请加入群156364025找管理人员免费获取密码")
    //             }
    //             else {
    //                 text = text.replace(/"/g, "");
    //                 if (setFun) {
    //                     setFun(text);
    //                 }
    //             }

    //         } else {

    //         }
    //     }
    // }

    // function doPost(url, setFun) {

    //     url = url + "?url=" + site_url + "&password=" + password;
    //     var xmlHttp;
    //     if (window.ActiveXObject) {
    //         xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    //     } else if (window.XMLHttpRequest) {
    //         xmlHttp = new XMLHttpRequest();
    //     }

    //     xmlHttp.open("POST", url);
    //     xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //     xmlHttp.send();
    //     xmlHttp.onreadystatechange = function () {
    //         if ((xmlHttp.readyState == 4) && (xmlHttp.status == 200)) {
    //             var text = xmlHttp.responseText;
    //             if (text.indexOf("passworderror") >= 0) {
    //                 alert("浏览点赞插件中的密码设置错误，请加入群551278936找管理人员免费获取密码")
    //             }
    //             else {
    //                 text = text.replace(/"/g, "");
    //                 if (setFun) {
    //                     setFun(text);
    //                 }
    //             }

    //         } else {


    //         }
    //     }
    // }
}

window.onload = function(){
	embedpano({swf:"tour.swf", xml:"tour.xml", target:"pano", html5:"auto", mobilescale:1.0, passQueryParameters:true,consolelog:true});
}
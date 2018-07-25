(function(){
    var Router = function(){
        /*
            this.routes['/'] = function(){}    
            this.routes['/html'] = function(){}
        */ 
        this.routes = {};//用来保存路由
        this.curUrl = ''; //获取当前的hash
    }
    Router.prototype.init = function(){ //监听路由变化
        //call,apply
        window.addEventListener( 'hashchange', this.reloadPage.bind(this) );
    }
    Router.prototype.reloadPage = function(){
        this.curUrl = location.hash.substring(1) || '/';
        this.routes[this.curUrl]();       
    }
    Router.prototype.map = function( key, callback ){ //保存路由对应的函数
        this.routes[key] = callback;
        // console.log( this.routes );
    } 
    window.Router = Router;
})();

var oRouter = new Router();
oRouter.init();
oRouter.map( '/', function(){
    var oSidebar = document.querySelector("sidebar");
    oSidebar.innerHTML = 'ghostwu提供html,css,javascript从0基础到精通系列课程，只要会开关机，就能学会';
});
oRouter.map('/html', function(){
    var oSidebar = document.querySelector("sidebar");
    oSidebar.innerHTML = 'ghostwu提供html5从入门到精通的课程';
});
oRouter.map('/css', function(){
    var oSidebar = document.querySelector("sidebar");
    oSidebar.innerHTML = 'ghostwu提供从入门到玩转css3课程';
});
oRouter.map('/javascript', function(){
    var oSidebar = document.querySelector("sidebar");
    oSidebar.innerHTML = "ghostwu提供从0基础到精通javascript系列课程";
});
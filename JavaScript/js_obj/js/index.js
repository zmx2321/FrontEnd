var o = {
    a:"abc",
    b:{
        c:function(param){
            alert(this.a);     //这里的this指向的不是o而是b，所以this是没有a属性的，这里应该弹出undefined
            alert(param);
        }
    },
    d:function(){
        this.b.c.call(this,'dddd');//这样就行了,就可以改变this的指向为d的this
    }
};

o.d();
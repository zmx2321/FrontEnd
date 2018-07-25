window.onload = function(){
    //当hash发生变化的时候， 会产生一个事件 onhashchange
    window.onhashchange = function(){
        console.log( '你的hash改变了' );
        //location对象是 javascript内置的(自带的)
        console.log( location );
    }
}
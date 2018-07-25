window.onload = function (){
    var button = document.getElementById('button');
    var onOff = 0;
    
    button.onclick = function (){
        toggle(
            [function (){
                alert(1);    
            },
            function (){
                alert(2);    
            },
            function (){
                alert(3);    
            },
            function (){
                alert(4);    
            }
            ]
        );    
    }
    
    
    function toggle( fns ){
        /*
            接收一个数组形式的函数集合
            或者使用arguments形式接收参数
            根据onOff的索引调用对应的函数
            onOff自增
            onOff取余当前数组的长度（函数的个数）
            onOff等于当前数组的长度onOff归0
        */
        fns[onOff]();
        onOff++;
        onOff%=fns.length;
    }
    
        
}
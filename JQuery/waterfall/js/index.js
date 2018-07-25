/*
    FengWaterFall.beta3.js
    完美实现了瀑布流效果。jquery的each方法循环数组。但是被迫用了全局变量。
*/

$(function(){

    var Obj = $("#waterfall"),
        Ul = Obj.children('ul'),
        Li = Ul.children('li');
    waterfall();
    $(window).resize(function(event) {
        waterfall();
    });
    debugger;
    function waterfall(){
        var WinW = $(window).width();
        var Blank = 20,                     // 每个图片之间的间隔留白
            LiW = 200+Blank,                // 一个图片距离上一个图片的宽度距离
            LiCol = parseInt(WinW/LiW),     // 计算在当前窗口下，有几列
            UlW = LiCol*LiW-Blank;          // 根据有几列，设定总的宽度（减掉最后一个留白）
        Ul.width(UlW);

        var AllLi = [];                     // 建立一个空数组变量
        Li.each(function(index, e){
            var T = $(this);
            if (index<LiCol) {                      // 第一行的处理
                AllLi[index] = T.outerHeight();     // 给数组添加内容，为当前元素的高度值
                T.css({
                    top: 0,
                    left: LiW*index+'px'
                });
            } else{
                var MinH = Math.min.apply(null,AllLi);      // 找到数组中，最小的那个值（也就是留白最大的）

                // 通过each 循环数组的方式，找到索引
                $.each(AllLi,function(index,value){
                    if (value == MinH) {
                        MinI = index;       // 因为 var 局部变量不能被用到下面去，所以用了全局变量
                    };
                });

                var ThisH = T.outerHeight()+Blank;          // 自身的高度加上留白

                AllLi[MinI] = parseInt(MinH+ThisH);         // 将被占位的数组重新赋值

                T.css({
                    top: MinH+Blank+'px',
                    left: LiW*MinI+'px'
                });
            };
        });

        // console.log(AllLi)
    }
})
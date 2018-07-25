window.onload = function(){
    var oBtn = document.querySelector("input");
    var oDiv = document.querySelector("div");
    //33->max  5->num
    function buildNum( max, num ){
        var arr = [];
        for( var i = 0; i < max; i++ ){
            arr.push( i + 1 );
        }
        var target = []; //从1-33这33个数字中 随机选出5个数
        for( var i = 0; i < num; i++ ){
            target.push( arr.splice( Math.floor( Math.random() * arr.length ), 1 ) );
        }
        return target;
    }
    oBtn.onclick = function(){
        var num = buildNum( 33, 5 );
        oDiv.innerHTML = num;
        location.hash = num;
    }
    window.onhashchange = function(){
        oDiv.innerHTML = location.hash.substring(1);
    }
}
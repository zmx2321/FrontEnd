        var arr = [];
        var myArr = [38,66];
        var btn = document.getElementById('btn');
        var n_box = document.getElementById('n_box');
        var timer = null;
        var t = 0;
        for(var i = 1; i <= 249; i++){
            arr.push(i);
        }
        function addZero(n) {
            if(n < 10) {
                n = '0000' + n;
            }else if(n<100) {
                n = '000' + n;
            }else{
                n = '00' + n;
            }
            return n;
        }
        function randomNum(){
            var num = parseInt(Math.random()*99999+1,10);
            return num;
        }
        function start(){
            timer = setInterval(function(){
                var n = randomNum();
                n_box.innerHTML = n;
            },42);
        }
        function stop(){
            var n;
            var arrs = arr.length;
            stopTimer(timer)
            for(var i = 0; i <= arrs; i++){
                var r = parseInt(Math.random()*arrs - 1, 10);
                if(arr[r] === myArr[0] && arr[r]===myArr[1]) {
                    r = parseInt(Math.random()*arrs - 1, 10);
                }
                n = arr[r];
            }
            var showNum = addZero(n);
            n_box.innerHTML = showNum;
            arr.remove(showNum);
        }
        function stopTimer(timer){
            clearInterval(timer);
            timer = null;
        }
        Array.prototype.indexOf = function(val) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
            }
            return -1;
        }
        Array.prototype.remove = function(val) {
            var index = this.indexOf(val);
            if (index > -1) {
                this.splice(index, 1);
            }
        }

        btn.addEventListener('click',function(){
            btn.innerHTML == '开始' ? (btn.innerHTML = '停止') : (btn.innerHTML = '开始');
            if(btn.innerHTML === '停止'){
                start();
            }else{
                t += 1;
                if( t !== 3 && t !== 5){
                    stop();
                }
                if( t === 3){
                    stopTimer(timer);
                    var num = addZero(myArr[0]);
                    n_box.innerHTML = num;
                    arr.remove(myArr[0]);
                }
                if( t === 5){
                    stopTimer(timer);
                    var num = addZero(myArr[1]);
                    n_box.innerHTML = num;
                    arr.remove(myArr[1]);
                }
            }
        })
        document.onkeydown = function (e) {
            var ev = window.event || e;
            var code = ev.keyCode || ev.which;
            if (code == 116) {
                ev.keyCode ? ev.keyCode = 0 : ev.which = 0;
                cancelBubble = true;
                return false;
            }
        }
var input = document.getElementById('input');
var lis = document.getElementsByName('num');
var a = '';
var b = '';
var x = '0';
input.num = 0;
//自定义input的num属性为0
for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function() {
        //input.value='';
        input.value = parseInt(x * 10) + parseInt(this.innerHTML);
        //输入框显示=10x +按键输入数字
        x = input.value;
        //把输入框的value给x
    }
}
var clear = document.getElementById('C');
clear.onclick = function() {
    input.value = '0';
    //按键‘C’时让输入框value为0
    x = '0';
    //让x=0
}
var retreat = document.getElementById('←')
retreat.onclick = function() {
    if (input.value.length > 1) {
        input.value = input.value.slice(0, -1);
    }//当input.value的长度大于1时，按后退键时截取input.value的第一位到倒数第一位
    else {
        input.value = '0';
        x = '0'
    }
    //否则input.value=0
}
var plus = document.getElementById('+');
plus.onclick = function() {
    //加法计算
    a = input.value;
    //把input.value给a存起来，相当于输入运算符前面的数
    //input.value='';
    input.num = 1;
    //把input.num=1记为加法的条件判断
    x = '0';
}
var minus = document.getElementById('-');
minus.onclick = function() {
    a = input.value;
    //把input.value给a存起来
    //input.value='';
    input.num = 2;
    //把input.num=2记为减法的条件判断
    x = '0';
}
var times = document.getElementById('*');
times.onclick = function() {
    a = input.value;
    //input.value='';
    input.num = 3;
    //把input.num=3记为乘法的条件判断
    x = '0';
}
var divide = document.getElementById('/');
divide.onclick = function() {
    a = input.value;
    //input.value='';
    input.num = 4;
    //把input.num=4记为除法的条件判断
    x = '0';
}
var equal = document.getElementById('=')
equal.onclick = function() {
    b = input.value;
    //把按运算键之后的input.value给b，相当于输入运算符后面的数
    if (input.num === 1) {
        input.value = parseInt(a) + parseInt(b);
    } else if (input.num == 2) {
        input.value = a - b
    } else if (input.num == 3) {
        input.value = a * b
    } else {
        input.value = a / b
    }
    //根据input.num的值判断加减乘除运算
    x = '0';
}

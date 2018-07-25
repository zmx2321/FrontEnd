// part1
/*var obj = {};
Object.defineProperty(obj,'hello',{
    set:function(val){
        document.getElementById('bb').innerHTML = val;
        document.getElementById('aa').value = val;
    }
});
document.getElementById('aa').onkeyup = function(e){
    obj.hello = e.target.value;
};
obj.hello = "";*/


// part2
var obj={};
var bind=[];
//触发obj对象set和get方法的时候，趁机来输出或修改bind数组的内容
Object.defineProperty(obj,'s',{
  set:function(val){
    bind['s']=val;
  },
  get:function(){
    return bind['s'];
  }
})
var demo=document.querySelector('#demo');
var display=document.querySelector('#display');
//#demo的value值与bind['s']绑定，#display的innerHTML也与bind['s']绑定。
demo.onkeyup=function(){
  obj['s']=demo.value;//触发了obj的set方法，等于#demo的value值赋值给bind['s']。
  display.innerHTML=bind['s'];
}
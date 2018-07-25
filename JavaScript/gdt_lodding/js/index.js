var div1=document.getElementById("main");
var div2=document.getElementById("jindu");
var div3=document.getElementById("text");
var num=0;
var timer=setInterval(function(){
  if(num==99){
    clearInterval(timer);
        }
  num+=1;
  div3.innerHTML=num+"%";
  progress(num);
},30);

function progress(cent){
  var allwidth=parseInt(div1.style.width);
  div2.style.clip='rect(0px,'+cent/100*allwidth+'px'+',40px,0px)';
}
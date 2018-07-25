var str = "fdsvvsdhjkncsjkuij ncx";
var str2 = prompt("请输入内容");
var num = 0;

console.log(str.length, str[0]);
for(var i=0; i<str.length; i++){
  if(str[i]==str2){
    num++;
  }
}
document.getElementById('box').innerHTML = str2 + "出现了" + num + "次";
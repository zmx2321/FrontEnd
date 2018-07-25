//翻页
function pages(a,b,c,d,e){
if(!e)e=''
if(a<=c)return '';
var Pc=Math.ceil(a/c);
var Ps=b-4>2?b-4:2
var Pe=b+4>=Pc?Pc-1:b+4
Pcl='style="color:#FFF;background:#2484E0"'
str=''
for(var i=Ps;i<=Pe;i++){
isp=i==b?Pcl:''
str+='<a '+isp+' href='+d+i+e+'>'+i+'</a>'
}
pup=b-1<1?'':'<a href='+d+(b-1)+e+'>上一页</a>'
pnt=b+1>Pc?'':'<a href='+d+(b+1)+e+'>下一页</a>'
isp=b==1?Pcl:''
p1='<a '+isp+' href='+d+'1'+e+'>1</a>'
isp=b==Pc?Pcl:''
px='<a '+isp+' href='+d+Pc+e+'>'+Pc+'</a>'
pmin=Ps>2?'...':''
pmax=Pe<Pc-1?'...':''
return '<div cmt_page>'+pup+p1+pmin+str+pmax+px+pnt+'</div>';
}

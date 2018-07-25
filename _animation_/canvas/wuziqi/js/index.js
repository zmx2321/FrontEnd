var canvas = document.querySelector('#canvas');  //文档对象模型
var cxt = canvas.getContext('2d');  //获取绘制路径
cxt.strockStyle = 'red';
cxt.moveTo(30, 30);
cxt.lineTo(30, 450);
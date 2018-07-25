// create  wrap element
var wrap = document.createElement('div');
//get body inner html
var body = document.getElementsByTagName('body')[0];
var bodyChildHtml = body.innerHTML;
wrap.innerHTML = bodyChildHtml;
//reset body child node
body.innerHTML = '123';
body.appendChild(wrap);
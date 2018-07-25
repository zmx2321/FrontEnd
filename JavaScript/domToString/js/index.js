 function parseDom(arg) {

　　 var objE = document.createElement("div");

　　 objE.innerHTML = arg;

　　 return objE.childNodes;

};

var obj1=parseDom('<div id="div_1" class="div1">Hello World!</div>');

var obj2=parseDom('<div id="div_1" class="div1">Hello World!</div><span>多个也没关系</span>');

console.log(obj1);

console.log(obj2)
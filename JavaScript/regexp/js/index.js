window.onload = function(){
  regexpBase();
  console.log("--");
  regexpMatch();
  console.log("--");
  regexpReplace();
  console.log("--");
  execReplace();
  var str = 'aaa 12 cc 55';
  var aa = str.match(/\d+/g);
  console.log(aa);
}

var regexpBase = function(){
  console.log(/./.test("123")); 
  console.log(/1234/.test("123"));
  console.log(/[0-9]/.test("123"));
  console.log(/[^0-9]/.test("123"));
  console.log(/\d/.test("123"));
  console.log(/\W/.test("123"));
  console.log(/\d*/.test("123"));  //数字出现0次或任意次
  console.log(/\d+/.test("123"));  //数字至少出现1次
  console.log(/https?:/.test("httpss"));  //s出现0-1次
  console.log(/^1\d{10}$/.test("12345678901"));  //起始数字为1，有11个数字，以数字结尾
  console.log(/thi(c|n)k/.test("think"));
  console.log(/^(.+)@(163|126|188)\.com$/.test("aa@163.com"));  //以1到任意字符为开头，@163或126或188，并以.com为结尾
  console.log(/\d/.test("123"));
  /*var reg = new RegExp("\\d");
  console.log(reg.test("123"));*/
}

var regexpMatch = function(){
  /*
    ()为捕获
    1、http,s出现1次或者多次
    2、转义，//
    3、[^\/]+表示非/的字符出现1到任意次
    4、[^\?]*表示非？的字符出现0到任意次
    5、(\/[^\?]*)?表示(\非？的字符)出现0-1次
    6、[^#]*表示非#的字符出现0到任意次
    7、(\?[^#]*)?表示(\?[^#]*)字符出现0-1次
    8、.*表示任意字符出现0到任意次
   */
  var str = 'http://blog.163.com/album?id=1#comment';
  var reg = /^(https?:)\/\/([^\/]+)(\/[^\?]*)?(\?[^#]*)?(#.*)?$/;
  var arr = str.match(reg);
  var postocol = arr[1];
  var host = arr[2];
  var pathname = arr[3];
  var search = arr[4];
  var hash = arr[5];
  var obj = {
    arr: arr, 
    postocol: postocol, 
    host: host, 
    pathname: pathname, 
    search: search, 
    hash: hash
  }
  console.log(obj);
}

var regexpReplace = function(){
  var str = 'The price of tomato is 5';
  var reg = /(\d+)/;  //+表示出现1到任意次
  console.log(str.replace(reg, '$1.00'));

  var str = 'The price of tomato is 5, The price of apple is 10';
  var reg = /(\d+)/g; //作用在全局
  console.log(str.replace(reg, '$1.00'));

  var html = '<label>网址:</label><input placeholder="以http://起始">';
  console.log(html);
  html = html.replace(/[<>]/g, function(m0){
    switch(m0){
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
    }
  });
  console.log(html);
}

var execReplace = function(){
  var reg = /(.)(\d+)/g;  //()为捕获，(.) 捕获任意非回车的字符，(\d+)捕获一个或多个数字，g表示作用在全局
  var scores = 'Tom $88, Nicholas ￥100, jack £38.';
  var result;
  while(result = reg.exec(scores)){
    console.log(result);
    console.log(reg.lastIndex);
    reg.lastIndex += 10;
  }
}
window.onload = function(){
  //三目运算符
  5 > 2 ? console.log("5大于2") : console.log("5小于2");

  //逗号运算符（返回最右侧表达式的值）
  var a, b, c, d;
  a = (b=5, c=2, d=3);
  console.log(a);

  //void(强行指定表达式不会返回值)
  var a, b, c, d;
  a = void(b=5, c=2, d=3);
  console.log(a);

  //typeof
  console.log(typeof "aa");

  //instanceof(判断是否为某类型的实例)
  var a = [1, 2];
  console.log(a instanceof Array);
  console.log(a instanceof Object);
  console.log(a instanceof Number);
}
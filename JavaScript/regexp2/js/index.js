function show(){
  alert();
}

function c_string(){
  console.log("----------------------c_string--------------------------");
  var str = "hello";
  console.log(str.length);
  console.log("charAt:  " + str.charAt(1));
  console.log("toUpperCase:  " + str.toUpperCase());
  console.log("indexOf:  " + str.indexOf("l"));
  console.log("indexOf:  " + str.indexOf("l", 3));
  console.log("substring:  " + str.substring("2"));
  console.log("substring:  " + str.substring(2, 4));
  console.log("slice:  " + str.slice(2));
  console.log("slice:  " + str.slice(2, 4));
  console.log("slice:  " + str.slice(1, -1));
  console.log("replace:  " + str.replace("hel", "ooo"));
  console.log("split:  " + str.split(""));
  console.log("split:  " + str.split("", 3));
  console.log("match:  " + str.match("ll"));
  console.log("match:  " + str.match("ll8"));
  console.log("search:  " + str.search("e"));
  console.log("search:  " + str.search("e2"));
  console.log("--------------------c_string---------------------------");
}



function regexp(){
  console.log("-----------------------regexp-------------------------");
  var str = "this is a regexp test";

  //创建正则的两种方法
  // var reg = /regexp/;
  var reg = new RegExp("regexp");
  //常用
  console.log("常用");
  console.log("exec:   " + reg.exec(str)[0]);
  console.log("test:   " + reg.test(str));
  //通配符
  console.log("通配符(大写为反)");
  var reg = /./;
  console.log("/./(是否为空):   " + reg.test(str));

  var phone = 123456789;
  var reg = /\d/;
  var reg2 = /\D/;
  console.log("/\\d/(数字):   " + reg.test(phone));
  console.log("/\\D/(非数字):   " + reg2.test(phone));

  var reg = /\s/;
  console.log("/\\s/(是否有空白字符):   " + reg.test(str));

  var reg = /\w/;
  console.log("/\\w/(是否有字母、数字、下划线):   " + reg.test(str));

  var reg = /\bt/;
  var reg2 = /t\b/;
  console.log("/\\bt/(是否以t开头):   " + reg.test(str));
  console.log("/t\\b/(是否以t结尾):   " + reg2.test(str));
  console.log("-----------------------regexp-------------------------");

  console.log("通配符2");

  var str1 = "hello";
  var reg = /[ec]/;
  var reg2 = /[^hello]/;
  console.log("[ec](字符串中是否包含c或者e):   " + reg.test(str1));
  console.log("[^hello](字符串中是否包含非h非e非l非l非o的字符):   " + reg2.test(str1));

  var reg = /[0-9]/;
  var reg1 = /[a-z]/;
  var reg2 = /[A-Z]/;
  console.log("/[0-9]/(是否包含0-9中的数字):   " + reg.test(str));
  console.log("/[a-z]/(是否包含小写字母):   " + reg1.test(str));
  console.log("/[A-Z]/(是否包含大写写字母):   " + reg2.test(str));

  var reg = /(red|blue|green)/;
  console.log("/(red|blue|green)/(是否包含red或blue或green):   " + reg.test(str));

  console.log("通配符3");
  var reg = /i+/;
  console.log("/i+/(i出现至少一次):   " + reg.test(str));

  var reg = /i*/;
  console.log("/i*/(i包含零个或多个):   " + reg.test(str));

  var reg = /i?/;
  console.log("/i?/(i包含零个或一个):   " + reg.test(str));

  var reg = /i{2}/;
  console.log("/i{2}/(是否包含连续2个i):   " + reg.test(str));

  var reg = /i{2,}/;
  console.log("/i{2,}/(是否包含至少2个连续的i):   " + reg.test(str));

  var reg = /i{2,5}/;
  console.log("/i{2,5}/(是否包含至少2-5个连续的i):   " + reg.test(str));

  var reg = /^t/;
  console.log("/^t/(是否以t开头):   " + reg.test(str));

  var reg = /t$/;
  console.log("/^t/(是否以t结尾):   " + reg.test(str));

  console.log("修饰符")

  var reg = /T/;
  var reg2 = /T/i;
  console.log("/T/(是否有大写T):   " + reg.test(str));
  console.log("/T/i(是否存在t，对大小写不敏感):   " + reg2.test(str));

  var reg = /t/;
  var reg2 = /t/g;
  console.log("/t/(是否存在t):   " + reg.test(str));
  console.log("/t/g(全局查找从左往右，第1个t):   " + reg2.test(str));
  console.log("/t/g(全局查找从左往右，第2个t):   " + reg2.test(str));
  console.log("/t/g(全局查找从左往右，第3个t):   " + reg2.test(str));
  console.log("/t/g(全局查找从左往右，第4个t不存在):   " + reg2.test(str));

  var str2 = "aaa\nbbb";
  var reg = /^b/;
  var reg = /^b/m;
  console.log("/^b/(是否以b开头):   " + reg.test(str));
  console.log("/^b/m(换行后是否以b开头):   " + reg2.test(str));

  var reg = /^[0-9a-zA-Z_-]+@[0-9a-zA-Z_-]+\.(com|cn|org)$/;
  console.log(reg.test("123@sina.com"));
}

c_string();
regexp();
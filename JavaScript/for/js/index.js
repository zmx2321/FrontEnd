window.onload = function() {
  var count = 0;  //计数器初始化为0
  for(var i=0; i<10; i++){  //当i<10的时候循环
    for(var j=0; j<10; j++){  //当i<10的时候i循环，并且每次i循环的时候，并且j<10的时候j循环,计数器+1
      count ++;
    }
  }

  /*
  
  i=1,  j=1,  count=1
        j=2,  count=2
        ·
        ·
        ·
        j=9,  count=9

  i=2,  j=1, count=10

  ·
  ·
  ·
  i=9,  j=9,  count=100

   */
  
  console.log(count); //100

/*  var large = 10;
  //设置行数
  for (var i = 0; i < large; i++){
    p = i * 2 + 1;

    for (var d = 0; d < large - i; d++){
      //注意，这里一定要使用全角中文空格，否则会出现直角三角形，而不是得等腰三角形（百度字面不支持中文空格，回去自己改下）
      document.write(" ");
    }

    for (var e = 0; e < i * 2 + 1; e++){
        document.write("＊");
    }

    document.write("<br/>");
  }*/
}

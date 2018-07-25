//第一种字面量的方式

 var arr1 = [10];

 //alert(arr1.length);

//创建对象的方式
 
 var arr2 = new Array(10);

   //alert(arr2.length);



//区  别：  创建的对象的方式能声明空间,字面量的方式不能。且字面量的方式不能调用原形的构造函数
//共同点：  都是申明数组具有数组的通用方法。


//检测方式  因为用typeof 检测Array返回的都是object类型。因此要用到instanceof
 
 if (arr2 instanceof Array) {
     
    //alert('yes');

 }


//冒泡排序
  
  var arr3 = [1,4,8,3,9,0];

  for (var i = 0; i < arr3.length; i++) {

  	  for (var j = 0; j < arr3.length-i-1; j++) {
  	      if (arr3[j]>arr3[j+1]) {
                var num = arr3[j];
                arr3[j]=arr3[j+1];
                arr3[j+1]=num;
  	      }
  	      console.log(arr3);
  	  }
  	 
  }

  console.log(arr3);

  
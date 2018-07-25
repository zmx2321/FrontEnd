/**
 * with 语句可以方便地用来引用某个特定对象中已有的属性，
 * 不能用来给对象添加属性。
 * 要给对象创建新的属性，必须明确地引用该对象。 
 */

function Lakers() {  
   this.name = "kobe bryant";  
   this.age = "28";  
   this.gender = "boy";  
}

var people=new Lakers(); 

with(people){  
   var str = "姓名: " + name + "<br>";  
   str += "年龄：" + age + "<br>";  
   str += "性别：" + gender;  
   document.write(str);  
}  
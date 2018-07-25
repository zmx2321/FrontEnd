/**
 * 本人家里养了一只鸡，一只鸭。当主人向他们发出‘叫’的命令时。鸭子会嘎嘎的叫，而鸡会咯咯的叫。
 */

//非多态
var makeSound = function(animal) {
    if(animal instanceof Duck) {
        console.log('嘎嘎嘎');
    } else if (animal instanceof Chicken) {
        console.log('咯咯咯');
    }
}
var Duck = function(){}
var Chicken = function(){};
makeSound(new Chicken());
makeSound(new Duck());

//多态
var makeSound = function(animal) {
    animal.sound();
}

var Duck = function(){}
Duck.prototype.sound = function() {
    console.log('嘎嘎嘎')
}
var Chiken = function() {};
Chiken.prototype.sound = function() {
    console.log('咯咯咯')
}

makeSound(new Chiken());
makeSound(new Duck());



/*Object.extend=function(destination,source){  
    for(property in source){  
        destination[property]=source[property];  
    }  
    return destination;  
}  
//定义一个抽象基类base,无构造函数  
function base(){};  
  
base.prototype={  
    initialize:function(){  
        this.oninit();//调用了一个虚方法  
    }  
}  
function SubClassA(){  
    //构造函数  
}  
SubClassA.prototype=Object.extend({  
    propInSubClassA:"propInSubClassA",  
    oninit:function(){  
        alert(this.propInSubClassA);  
    }  
},base.prototype);  
  
function SubClassB(){  
    //构造函数  
}  
SubClassB.prototype=Object.extend({  
    propInSubClassB:"propInSubClassB",  
    oninit:function(){  
        alert(this.propInSubClassB);  
    }  
},base.prototype);  
  
var objA=new SubClassA();  
objA.initialize();//输出"propInSubClassA"  
  
var objB=new SubClassB();  
objB.initialize();//输出"propInSubClassB" */
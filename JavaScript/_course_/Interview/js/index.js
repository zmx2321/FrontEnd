/**
 * @description js面试题汇总
 * @author zmx2321
 */

/**
 * 1、美团的一道面试题
 * 
 * 解析：
 * 
	fn() 前面没有引导对象，是函数调用模式, this是全局对象,输出 10

	arguments[ 0 ]()，arguments是一个伪数组对象, 这里调用相当于通过数组的索引来调用.

	这里引导对象即宿主就是 arguments对象。

	所以，执行时，this 就是指 arguments,由于传了两个参数，所以 输出为 arguments.length 就是 2
 * 
 */
var length = 10;
function fn() {
    console.log( this.length ); // 10
}
var obj = {
    length: 5,
    method: function ( fn ) {
        fn();   // 10 前面没有引导对象，是函数调用模式
        arguments[ 0 ](); // 2
        // arguments是一个伪数组对象, 这里调用相当于通过数组的索引来调用.
        // 这里 this 就是 指的这个伪数组， 所以 this.length 为 2
    }
};
obj.method( fn, 1 );    // 打印 10 和 2
//obj.method( fn, 1， 2， 3 );    // 打印 10 和 4
//


/**
 *
 *  预解析，简化后的代码，以及答案
 *  
    // function getName(){ alert(5); } 执行到下面被覆盖了，直接删除
    function Foo() {
        getName = function () { alert(1); };
        return this;
    }
    Foo.getName = function () { alert(2); };
    Foo.prototype.getName = function () { alert(3); };
    var getName = function () { alert(4); };

    Foo.getName();  // ------- 输出 2 -------
    getName();      // ------- 输出 4 -------
    Foo().getName();    // ------- 输出 1 -------
    getName();  // ------- 输出 1 -------
    new Foo.getName();     // ------- 输出 2 -------
    new Foo().getName();    // ------- 输出 3 -------
    var p = new new Foo().getName();     // ------- 输出 3 -------

 * 
 */
function Foo(){
    getName = function(){ alert(1); };
    return this;
}
Foo.getName = function(){ alert(2); };
Foo.prototype.getName = function(){ alert(3); };
var getName = function(){ alert(4); };
function getName(){ alert(5); }

Foo.getName();  // alert ??
getName();  // alert ??
Foo().getName(); // alert ??
getName(); // alert ??
new Foo.getName(); // alert ??
new Foo().getName(); // alert ??
new new Foo().getName(); // alert ??
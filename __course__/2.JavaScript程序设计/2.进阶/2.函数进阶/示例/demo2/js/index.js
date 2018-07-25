/*

思考题：对象方法中定义的子函数，子函数执行时this指向哪里？老师参与
三个问题：
以下代码中打印的this是个什么对象？
这段代码能否实现使myNumber.value加1的功能？
在不放弃helper函数的前提下，有哪些修改方法可以实现正确的功能？

var myNumber = {
  value: 1,
  add: function(i){
    var helper = function(i){
        console.log(this);
          this.value += i;
    }
    helper(i);
  }
}
myNumber.add(1);

 */

/*

helper中的this指向Window全局变量。
不能。因为this.value是NaN，不是myNumber.value
四种方法：

 */

//方法一：把helper调整为方法函数，这样helper就可以正确引用myNumber为this了。
var myNumber = {
                value:1,
                helper:function(i) {
                        console.log(this);
                        this.value +=i;
                },
                add: function(i) {
                    this.helper(i);
                }            
            }
 
//方法二：使用闭包
var myNumber = {
            value: 1,
            add: function(i){
                var thisnew = this;
                // 构建闭包
                var helper = function(i){
                    console.log(thisnew);
                    thisnew.value += i;
                }
               helper(i);
             }
        }
 
//方法三：使用方法调用模式，因为方法调用模式可以使this指向调用者
var myNumber = {
        value: 1,
        add: function(i){
            var helper = function(i){
                console.log(this);
                this.value += i;
            }
            // 新建一个o对象等于myNumber,将helper方法赋值给该对象，
            // 然后使用方法调用模式，这样可以让helper中的this指向调用者o,即myNumber
            var o = myNumber;
            o.fn = helper;
            o.fn(i);
        }
    }
 
//方法四：使用apply（call）调用模式，将当前helper方法借用给myNumber对象使用
var myNumber = {
        value: 1,
        add: function(i){
            var helper = function(i){
                console.log(this);
                this.value += i;
            }
            // myNumber对象借用helper方法，helper中的this将指向myNumber对象
            //helper.apply(myNumber,[i]); //apply方法
            helper.call(myNumber,i);  //call方法
        }
    }
 
        myNumber.add(1);
        console.log(myNumber.value);
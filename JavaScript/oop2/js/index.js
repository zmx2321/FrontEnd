var A = function(){
  this.value = 'a';
  this.showValue = function(){
    console.log(this.value);
  }
}

var a = new A();
a.showValue();

var B = function(){
  this.value = 'b';
};

B.prototype = new A();

var b = new B();
b.showValue();
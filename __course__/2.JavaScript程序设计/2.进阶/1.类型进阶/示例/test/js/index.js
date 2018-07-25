/*

比如如下代码
var obj1 = {a:1};
var obj2 = obj1;
obj2.a = 2; // 此时obj1.a ===
修改对象obj2同时会改变obj1，那么如果我们需要克隆出一个独立但属性、方法完全一样的对象，该如何实现？

*/

//数组的拷贝方法
function copyArray(arr) {
    return arr.slice(0);
    //return arr.contact();
}
 
//对象-浅拷贝
function copyObj(obj) {
    var newObj = {}
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            newObj[key] = obj[key];
        }
    }
    return newObj;
}
 
/* 由于js对象都是存地址，
 * 所以如果对象的某个属性值也是对象，那么拷贝出来的对象与原对象的该条属性指向的就是同一个地址。
 * 因此需要使用深复制的方法，递归复制到新对象
 * 知乎上的讨论  https://www.zhihu.com/question/23031215
 */
 
/* 偷懒的深拷贝
 * 无法复制函数
 * 原型链没了，对象就是object，所属的类没了
 */
var b = JSON.parse(JSON.stringify(a))


/*

对于对象而言，要用for循环遍历出所有的属性 进行复制。但考虑到for 循环会遍历到原型上的属性，一般而言会通过hasOwnProperty过滤原型l链上继承的属性。具体代码如下
var obj = {a:1};
var obj1 = {};
    for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
        obj1[key] = obj[key]
    }
}

 */
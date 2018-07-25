/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

var addTwoNumbers = function(l1, l2) {
    var sum=l1.val+l2.val;  
    var next1=l1.next;  
    var next2=l2.next;  
    var l3 = new ListNode(sum%10);//初始化l3  
    var node=l3;//更新node的同时更新l3  
    sum = Math.floor(sum/10);//进位，如果有的话  
    while(next1 || next2 || sum!==0){  
        //next1或者next2为空时补充为0  
        //当两个都为空且没有进位的时候的时候停止，有进位的话还需要补充一个进位  
        sum += (next1?next1.val:0)+(next2?next2.val:0);  
        node.next = new ListNode(sum%10);  
        node = node.next;  
        next1 = next1?next1.next:null;  
        next2 = next2?next2.next:null;  
        sum = Math.floor(sum/10);  
    }  
    return l3; 
};

console.log();
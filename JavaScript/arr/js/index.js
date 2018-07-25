// function clickThis(){
//     var str = "bs a si ytrebil";
//     var liberty = str.split('').reverse().join('')
//     console.log(liberty);
// }
// clickThis();


    /* 
    *   1：arrayObject.reverse() 
    *      注意： 该方法会改变原来的数组，而不会创建新的数组。 
    *   2：arrayObject.join() 
    *      注意：join() 方法用于把数组中的所有元素放入一个字符串。 
    *      元素是通过指定的分隔符进行分隔的。 
    *      指定分隔符方法join("#");其中#可以是任意 
    *   3：stringObject.split(a,b)这是它的语法 
    *      方法：用于把一个字符串分割成字符串数组. 
    *      a是必须的决定个从a这分割 
    *      b不是必须的，可选。该参数可指定返回的数组的最大长度 。如果设置了该参数，返回的子串不会多于这个参数指定的数组。如果没有设置该参数，整个字符串都会被分割，不考虑它的长度。 
    *      注意：返回的数组中不包括a本身； 
    *      提示和注释： 
    *      注释：如果把空字符串 ("") 用作 a，那么 stringObject 中的每个字符之间都会被分割。 
    *      注释：String.split() 执行的操作与 Array.join 执行的操作是相反的。    
    * 
    * 
    */  
    var str = "a,b,c,d,e,f,g";//声明一个字符串  
    str  = str.split(',').reverse();//用split函数拆分成数组对象，再用reverse函数将数组倒序排列  
    console.log(str);
    console.log(str.length+":"+typeof(str));  
    console.log(typeof(str.join)+":"+str.join('#')+":"+str.join('#').length);   
    var s = str.reverse().join("#");  
    console.log(typeof(s)+":"+s);  
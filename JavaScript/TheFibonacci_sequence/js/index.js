// 斐波那契数列实现

// //递归
// function fb(n){
//     if(n==1||n==2){
//         return 1;
//     }
//     return fb(n-1)+fb(n-2);
// }

// var res = fb(10);
// console.log(res);	//55

//非递归
// function fb(n){
//     var a,b,res;
//     a = b = 1;
//     for(var i=3;i<=n;i++){
//         res = a + b;
//         a = b;
//         b = res;
//     }
//     return res;
// }

// var aa = fb(10);
// console.log(aa);


function fb(n){  
    var res = [1,1];  
    if(n == 1 || n == 2){  
        return 1;  
    }        
    for(var i=2;i<n;i++){  
        res[i] = res[i-1] + res[i-2];  
    }  
    return res[n-1];  
}  

var aa = fb(10); 
console.log(aa); //55  

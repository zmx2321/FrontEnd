function foo(n){  
  var a=[],state=0;  
  for(var i=2;i<n;i++){  
    var sqrt_i = Math.sqrt(i);  
    if(i%sqrt_i===0){  
      continue;  
    }  
    for(var j=2;j<sqrt_i;j++){  
      if(i%j===0){  
        state=1;  
        break;  
      }else{  
        state=0;  
      }  
    }  
   if(state===0){  
     a.push(i);  
   }  
  }  
  console.log(a);  
}  

foo(100)
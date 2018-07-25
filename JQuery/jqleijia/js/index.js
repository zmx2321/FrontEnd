$(function(){  
    var chkItem = $('input[name=chkItem]');  
    chkItem.click(function(){  
        $('#sumid').html(sum());              
        });  
    });  
      
      
      
    /**  
    *@功能 计算总和  
    *@param null  
    *@return int      
    **/  
    function sum(){  
        var valueArr= $('input[name=chkItem]');    
        var sumValue=0;    
        valueArr.each(function(index, element) {  
            if($(this).is(":checked")){  
                if(isNaN(valueArr[index].value)||valueArr[index].value==null||valueArr[index].value==""){    
                   sumValue +=0;    
                }else{    
                   sumValue +=parseFloat(valueArr[index].value);//强制转换为数字    
                }  
                  
                }  
        });  
                  
        if(sumValue>0){    
            sumValue = parseInt(sumValue);    
        }    
        else{    
           sumValue = 0;    
        }    
        return sumValue;  
    }  
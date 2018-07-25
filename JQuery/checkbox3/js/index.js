$(document).ready(function(){    
    $("#btn").click(function(){    
        var str = "";    
        $("input[type='checkbox']").each(function(){    
            if($(this).is(":checked"))    
            {    
                str = $(this).val();   
            }    else{
                 str = "no";
            }
            str = str.toString();
            document.write(str.split(",",2));
            console.log(typeof str);
        });                    
    });    
});    

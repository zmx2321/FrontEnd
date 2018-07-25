    $(function(){
         $("#btnSubmit").click(function(){
            var val=$('input:radio[name="sex"]:checked').val();
            if(val==null){
                alert("什么也没选中!");
                return false;
            }
            else{
                alert(val);
            }
            var list= $('input:radio[name="list"]:checked').val();
            if(list==null){
                alert("请选中一个!");
                return false;
            }
            else{
                alert(list);
            }           
         });
     });

    function displayit(n)
    {
        for(i=0;i<4;i++){
            if(i==n){
                var id='menu_list'+n;
                if(document.getElementById(id).style.display=='none'){
                    document.getElementById(id).style.display='';
                    document.getElementById("plug-wrap").style.display='block';
                }else{
                    document.getElementById(id).style.display='none';
                    document.getElementById("plug-wrap").style.display='none';
                }
            }else{
                if($('#menu_list'+i)){
                    $('#menu_list'+i).css('display','none');
                }
            }
        }
    }
    function closeall()
    {
        var count = document.getElementById("top_menu").getElementsByTagName("ul").length;
        for(i=0;i<count;i++){
            document.getElementById("top_menu").getElementsByTagName("ul").item(i).style.display='none';
        }
        document.getElementById("plug-wrap").style.display='none';
    }
	
	setTimeout("document.getElementById('loading').style.display='none'",600);
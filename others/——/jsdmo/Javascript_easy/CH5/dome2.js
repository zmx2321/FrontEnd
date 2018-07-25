//最外层UL
      var box;

       window.onload = function(){
       	//获取ID
          box = document.getElementById('box');
        //获取第一层LI
           var liArr = box.children;  

             for (var i = 0; i < liArr.length; i++) {

             	  liArr[i].onclick = function(){
                       
                       //this 代表当前触发事件的对象。
                       var  node = this.getElementsByTagName('ul')[0];

                       if (node.style.display != 'block') {//第一次获取的其实是个kong

                          node.style.display='block';
     
                       }else{
                          
                          node.style.display='none';

                       }

             	  }
             	
             }

       }

      
      function getList(obj){

      	var nodeList = new Array();
           
          var reslt =  obj.childNodes;
           
           for (var i = 0; i < reslt.length; i++) {

           	   if (reslt[i].nodeType==1) {
                 
                 nodeList.push(reslt[i]);

           	   }
           	
           }
  

      	return nodeList;
      }

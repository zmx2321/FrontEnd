(function(){
  var theArray=new Array();

  theArray[0]="小梅是sb";
  theArray[1]="老刘是sb";
  theArray[2]="白菜是sb";

  function ranFun(){
   return parseInt(Math.random()*3);
  }

  document.write(theArray[ranFun()]);

  console.log(parseInt(Math.random()*3) + 1);
})();
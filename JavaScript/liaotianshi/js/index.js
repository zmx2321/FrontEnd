window.onload = function(){
  // nxncalo();  //99乘法表（o）
  nxncal();
}

//99乘法表（o）
var nxncalo = function(){
  for(var i=0; i<=9; i++){
    for(var j=1; j<=i; j++){
      console.log(i + "*" + j + "=" + i*j);
    }
  }
}

//99乘法表
var nxncal = function(){
  var oTab = document.getElementById("tab");
  var str = "";

  str += "<ul>";
    for(var i=1; i<=9; i++){
      var val = "c1";

      switch(i%3){
        case 0:
          val = "c1";
          break;
        case 1:
          val = "c2";
          break;
        default:
          val = "c3";
      }

      str += "<li class='"+ val +"'><dl>";
        
      for(var j=1; j<=i; j++){
        str += "<dd><span>";
          str += " "+ i +" * "+ j +" = "+ (i*j) +" ";
        str += "</span></dd>";
      }
      
      str += "</dl></li>";
    }

  str += "</ul>";

  oTab.innerHTML = str;
}
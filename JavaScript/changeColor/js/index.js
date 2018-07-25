 window.onload = function(){
  var odiv = document.getElementById('list');
  var olis = odiv.getElementsByTagName('li');

  for(var i=0; i< olis.length; i++){
    var oli = olis[i];
    i%2 === 0 ? (oli.className = 'c1', oli.listit = 'c1') : (oli.className = 'c2' , oli.listit = 'c2');

    //因为每个li都是对象数据类型，我们可以给每个li增加一个自定义属性
    //oli.listit = "listname";

    oli.onmouseover = function(){
      this.className = 'c3';
    }

    oli.onmouseout = function(){
      var oldValue = this.listit;
      this.className = oldValue;
    }
    /*switch(i%3){
      case 0:
            oli.className = 'c1';
            break;
      case 1:
            oli.className = 'c2';
            break;
      default:6
            oli.className = 'c3';    
    }*/
  }
}
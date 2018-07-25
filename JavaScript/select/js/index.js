/*var sel_click = function(btn, cont1, con2){
  btn.onclick = function(){
    for(var i=0; i<cont1.length; i++){
      if(cont1.options[i].selected == true){
        var option = document.createElement("option");
        option.text = cont1.options[i].text;
        option.value = cont1.options[i].value;
        con2.add(option);
        cont1.removeChild(cont1.options[i]);
      }
    }
  }
}

var select = function(){
  var select_left = document.querySelector('#select_left'),
      select_right = document.querySelector('#select_right');

  var to_left = document.querySelector('#to_left'), 
      to_right = document.querySelector('#to_right');

  sel_click(to_left, select_right, select_left);

  sel_click(to_right, select_left, select_right);
}

window.onload = function(){
  select();
}*/

//名字空间模块
var app = {
  util: {}
};

//工具方法模块
app.util = {
  $: function(selector, node){
    return (node || document).querySelector(selector);
  }
};

//应用代码，立即执行函数
(function(util){
  var $ = util.$;

  function sel_click(btn, cont1, con2){
    btn.onclick = function(){
      for(var i=0; i<cont1.length; i++){
        if(cont1.options[i].selected == true){
          var option = document.createElement("option");
          option.text = cont1.options[i].text;
          option.value = cont1.options[i].value;
          con2.add(option);
          cont1.removeChild(cont1.options[i]);
        }
      }
    }
  }

  sel_click($('#to_left'), $('#select_right'), $('#select_left'));

  sel_click($('#to_right'), $('#select_left'), $('#select_right'));
})(app.util);
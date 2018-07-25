/**
 * 表格插件
 * 自动生成表格
 * 数据渲染
 *
 * 插件==>变量保护
 * 插件需要暴露一个接口（变量或者函数）
 */

!function (global, factory) {
  global.Table = factory();  //执行
}(window, function(){
  // alert();
  // return "132";  //返回Table
  return function(json){
    // console.log(json);
    var tableNode = json.el,  //保存table父级节点
        newTable = document.createElement("table");  //创建table节点
    newTable.id = "zmxTable";
    newTable.width = "100%";
    newTable.style = "table-layout:fixed;text-align:center";
    tableNode.appendChild(newTable);

    var headtr = document.createElement("tr");
    headtr.className = "tr-head";
    headtr.style = "border:solid 1px #efefef";
    newTable.appendChild(headtr);  //放表头

    var head = json.head;
    head.map(function(el){  //map数组遍历方法
      var th = document.createElement("th");
      th.innerText = el;  //把变量的元素内容放入th中
      headtr.appendChild(th);
    });

    var col = json.col,
        data = json.data;
    if(col.length != head.length){
      throw "col and head must yiyang";
      // console.err("123");
    }

    data.map(function(el){
      var tr = document.createElement("tr");
      newTable.appendChild(tr);

      console.log(el);

      col.map(function(key){
        var td = document.createElement("td");
        td.innerText = el[key];
        tr.appendChild(td);
      });
    });
  }
});
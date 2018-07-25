     /* 
obj代表节点对象

第一步 查找节点,认识节点。

    obj.childNodes 返回直接后代   包括 文本节点   空在document中也属于文本节点;
  
    obj.children 返回直接后代 不包括文本节点;
   
    obj.hasChildNodes()  返回该节点是否有子节点(包括文本节点);

    obj.nodeName 返回节点名称;
    
    obj.nodeType 获取所需结点的类型;

    obj.nodeValue 设置或获取结点的值;
    
    document.getElementById()通过ID值寻找指定的节点 返回指定的一个;

    obj.getElementByTagName()通过标签名称寻找节点;
    
    obj.innerText只能写文本  obj.innerHTML能写HTML代码

    操作 样式  node.style

    子父关系
    childNodes 获取作为指定对象直接后代的 HTML 元素和 TextNode 对象的集合。 
    children 获取作为对象直接后代的 DHTML 对象的集合。 


    parentNode 获取文档层次中的父对象。
    parentElement 获取对象层次中的父对象。

    firstChild/lastChild 返回元素的首个子节点/最后一个子节点

    兄弟关系
    nextSibling/previousSibling 返回元素之后的节点/之前紧随的节 


    obj代表节点对象
         
第二步 Dom O级操作。
    1.改变节点内容 obj.innerHTML
    2.改变样式     obj.style.color = 'red';....
    3.改变属性     
        -改变name值  obj.className = 'dome';....
        -绑定事件    obj.onclick = function(){};....
         等等。。。     
     */






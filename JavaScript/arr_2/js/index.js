//初始化一个二维数组存储城市列表项 
var cities = [["安庆", "合肥", "桐城"], ["石家庄", "保定", "唐山"], ["郑州", "洛阳", "开封"]];
//选中某个省份时候，调用添加城市的方法 
function provinceChanged(sel) {
    //alert("select的长度"+sel.options.length); 
    //sel其实就是select对象 
    //遍历options集合，查找选中的选项 
    for (var x = 0; x < sel.options.length; x++) {
        var opt = sel.options[x];
        if (opt.selected) {
            //给被选择的城市的select 添加option 
            addCityToSelect(x)
        }
    }
}
//添加选中省份下的城市项到city的select中 
function addCityToSelect(x) {
    //从二维数组中找出对应的城市 
    var city = cities[x - 1];
    var citySelect = document.getElementById("select_city");
    /*==================删除节点中已经存在的元素=============== 
在第二次或第n次调用方法的时候城市select对象中已经添加了之前添加的节点，所以有清空。 
思路1：select对象的removeChild(),所以通过循环遍历可以删除字节点。 
思路2：直接设置select.options.length=1可以实现相同效果。 
*/
    //设置城市的select对象下的options长度为1 
    citySelect.options.length = 1;
    //设置options集合的长度，删除 
    //citySelect.options.length=1; 
    for (var x = 0; x < city.length; x++) {
        //创建元素节点对象 
        var optionName = document.createElement("option");
        //给option设置显示内容 
        optionName.innerHTML = city[x];
        //将创建的option添加到select 
        citySelect.appendChild(optionName);
        /* 
在这个地方将某一个省份下面的所有城市添加到citySelect对象下面以后 
当第二次选择第二个省份的时候，第二个省份的下面的所有城市有会被追加到 
citySelect节点下面。这样的效果就错了。所以要求在每次添加之前，要 
对citySelect节点下面的内容进行清空。接着看： 
==================删除节点中已经存在的元素=============== 
*/
    }
}
